import { DEFAULT_GUARD_POLICY } from "./constants.js";
import { BaseGuardEngine } from "./engine.js";
import { createValidateTransactionAction } from "./actions/validateTransaction.js";
import { createVerifyX402Action } from "./actions/verifyX402.js";
import { createGetPolicyAction } from "./actions/getPolicy.js";
import { createPromptSafetyEvaluator } from "./evaluators/promptSafety.js";
import { createGuardPolicyProvider } from "./providers/guardPolicy.js";
export * from "./types.js";
export * from "./constants.js";
export * from "./engine.js";
/**
 * Wraps any EVM wallet provider (viem WalletClient, ethers Signer, or Eliza wallet provider)
 * to intercept and inspect transactions before they are signed or broadcast.
 */
export function createGuardedWallet(wallet, engine, options) {
    return new Proxy(wallet, {
        get(target, prop, receiver) {
            const original = target[prop];
            if (typeof original !== "function")
                return Reflect.get(target, prop, receiver);
            if (prop === "sendTransaction" || prop === "send" || prop === "execute") {
                return async (...args) => {
                    const txParam = args[0] || {};
                    const to = txParam.to || "";
                    const value = txParam.value ? txParam.value.toString() : "0";
                    const data = txParam.data || "0x";
                    const verdict = engine.evaluateTransaction({ to, value, data });
                    if (!verdict.allowed) {
                        if (options?.onBlock)
                            options.onBlock(verdict);
                        throw new Error(`[BaseGuard FIREWALL BLOCKED]: ${verdict.code} - ${verdict.reason}`);
                    }
                    return original.apply(target, args);
                };
            }
            if (prop === "request") {
                return async (args) => {
                    if (args?.method === "eth_sendTransaction" && args.params?.[0]) {
                        const txParam = args.params[0];
                        const to = txParam.to || "";
                        const value = txParam.value ? txParam.value.toString() : "0";
                        const data = txParam.data || "0x";
                        const verdict = engine.evaluateTransaction({ to, value, data });
                        if (!verdict.allowed) {
                            if (options?.onBlock)
                                options.onBlock(verdict);
                            throw new Error(`[BaseGuard FIREWALL BLOCKED]: ${verdict.code} - ${verdict.reason}`);
                        }
                    }
                    return original.apply(target, [args]);
                };
            }
            return original.bind(target);
        },
    });
}
/**
 * Creates an ElizaOS BaseGuard plugin instance with customizable policies.
 */
export function createBaseGuardPlugin(customPolicy) {
    const policy = {
        ...DEFAULT_GUARD_POLICY,
        ...customPolicy,
    };
    const engine = new BaseGuardEngine(policy);
    return {
        name: "base-guard",
        description: "Fail-closed onchain security firewall, spend ceilings, prompt injection defense, and x402 verification for ElizaOS agents on Base",
        engine,
        guardWallet: (wallet) => createGuardedWallet(wallet, engine),
        actions: [
            createValidateTransactionAction(engine),
            createVerifyX402Action(engine),
            createGetPolicyAction(engine),
        ],
        evaluators: [
            createPromptSafetyEvaluator(engine),
        ],
        providers: [
            createGuardPolicyProvider(engine),
        ],
    };
}
export const baseGuardPlugin = createBaseGuardPlugin();
export default baseGuardPlugin;
//# sourceMappingURL=index.js.map