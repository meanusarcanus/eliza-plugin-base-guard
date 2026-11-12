import { BaseGuardEngine } from "./engine.js";
import { GuardPolicy, Plugin, SecurityVerdict } from "./types.js";
export * from "./types.js";
export * from "./constants.js";
export * from "./engine.js";
/**
 * Wraps any EVM wallet provider (viem WalletClient, ethers Signer, or Eliza wallet provider)
 * to intercept and inspect transactions before they are signed or broadcast.
 */
export declare function createGuardedWallet<T extends Record<string, any>>(wallet: T, engine: BaseGuardEngine, options?: {
    onBlock?: (verdict: SecurityVerdict) => void;
}): T;
export interface BaseGuardPluginInstance extends Plugin {
    engine: BaseGuardEngine;
    guardWallet: <T extends Record<string, any>>(wallet: T) => T;
}
/**
 * Creates an ElizaOS BaseGuard plugin instance with customizable policies.
 */
export declare function createBaseGuardPlugin(customPolicy?: Partial<GuardPolicy>): BaseGuardPluginInstance;
export declare const baseGuardPlugin: BaseGuardPluginInstance;
export default baseGuardPlugin;
//# sourceMappingURL=index.d.ts.map