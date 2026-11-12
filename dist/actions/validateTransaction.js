import { TransactionInputSchema } from "../types.js";
export function createValidateTransactionAction(engine) {
    return {
        name: "VALIDATE_TRANSACTION",
        description: "Evaluates an onchain EVM/Base transaction before signing or dispatching. Checks spend caps, unlimited approvals, recipient blocklists, and prompt injection.",
        similes: [
            "CHECK_TRANSACTION_SAFETY",
            "AUDIT_CALLED_TRANSACTION",
            "INSPECT_TRANSFER",
            "VERIFY_ONCHAIN_ACTION",
        ],
        examples: [
            [
                {
                    name: "{{user1}}",
                    content: { text: "Transfer 0.01 ETH to 0x742d35Cc6634C0532925a3b844Bc454e4438f44e" },
                },
                {
                    name: "{{agentName}}",
                    content: {
                        text: "Running pre-flight security evaluation on the planned transfer...",
                        action: "VALIDATE_TRANSACTION",
                    },
                },
            ],
        ],
        validate: async (_runtime, message, _state) => {
            const text = message.content?.text || "";
            const hasTxParams = Boolean(message.content?.to || message.content?.value || message.content?.data);
            const hasTxKeywords = /(?:transfer|send|approve|pay|swap|0x[a-fA-F0-9]{40})/i.test(text);
            return hasTxParams || hasTxKeywords;
        },
        handler: async (_runtime, message, _state, options, callback) => {
            const payload = {
                to: (options?.to || message.content?.to || ""),
                value: (options?.value || message.content?.value || "0"),
                data: (options?.data || message.content?.data || "0x"),
                userPrompt: message.content?.text || "",
                reasoningTrace: (options?.reasoning || ""),
            };
            const parseResult = TransactionInputSchema.safeParse(payload);
            if (!parseResult.success) {
                const errorText = `[BaseGuard BLOCKED]: Invalid transaction parameters: ${parseResult.error.message}`;
                if (callback)
                    await callback({ text: errorText });
                return { success: false, allowed: false, text: errorText, error: errorText };
            }
            const verdict = engine.evaluateTransaction(parseResult.data);
            const outputText = verdict.allowed
                ? `[BaseGuard APPROVED]: ${verdict.reason}`
                : `[BaseGuard BLOCKED]: Code: ${verdict.code} | Risk: ${verdict.riskScore}/100 | ${verdict.reason}`;
            if (callback) {
                await callback({
                    text: outputText,
                });
            }
            return {
                success: verdict.allowed,
                text: outputText,
                ...verdict,
            };
        },
    };
}
//# sourceMappingURL=validateTransaction.js.map