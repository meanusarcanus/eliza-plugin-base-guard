import { X402ChallengeSchema } from "../types.js";
export function createVerifyX402Action(engine) {
    return {
        name: "VERIFY_X402_PAYMENT",
        description: "Validates an HTTP 402 Payment Required challenge for Base USDC micropayments against spend caps and expiration deadlines.",
        similes: ["VALIDATE_X402_CHALLENGE", "CHECK_HTTP_402_PAYMENT", "VERIFY_MICROPAYMENT"],
        examples: [
            [
                {
                    name: "{{user1}}",
                    content: { text: "Verify x402 payment challenge of 0.50 USDC to 0x742d35Cc6634C0532925a3b844Bc454e4438f44e" },
                },
                {
                    name: "{{agentName}}",
                    content: { text: "Validating x402 challenge against active payment ceilings...", action: "VERIFY_X402_PAYMENT" },
                },
            ],
        ],
        validate: async (_runtime, message, _state) => {
            const text = message.content?.text || "";
            const hasX402Params = Boolean(message.content?.merchant || message.content?.amountUsdc || message.content?.resourceUri);
            const hasX402Keywords = /(?:x402|402|micropayment|payment required)/i.test(text);
            return hasX402Params || hasX402Keywords;
        },
        handler: async (_runtime, message, _state, options, callback) => {
            const payload = {
                merchant: (options?.merchant || message.content?.merchant || ""),
                amountUsdc: (options?.amountUsdc || message.content?.amountUsdc || "0"),
                resourceUri: (options?.resourceUri || message.content?.resourceUri || ""),
                nonce: (options?.nonce || message.content?.nonce || ""),
                deadline: Number(options?.deadline || message.content?.deadline || 0),
                tokenAddress: (options?.tokenAddress || message.content?.tokenAddress),
            };
            const parseResult = X402ChallengeSchema.safeParse(payload);
            if (!parseResult.success) {
                const errorText = `[BaseGuard x402 REJECTED]: Invalid challenge schema: ${parseResult.error.message}`;
                if (callback)
                    await callback({ text: errorText });
                return { success: false, allowed: false, text: errorText, error: errorText };
            }
            const verdict = engine.evaluateX402(parseResult.data);
            const text = verdict.allowed
                ? `[BaseGuard x402 APPROVED]: ${verdict.reason}`
                : `[BaseGuard x402 BLOCKED]: ${verdict.reason}`;
            if (callback)
                await callback({ text });
            return {
                success: verdict.allowed,
                text,
                ...verdict,
            };
        },
    };
}
//# sourceMappingURL=verifyX402.js.map