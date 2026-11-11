export function createGetPolicyAction(engine) {
    return {
        name: "GET_SECURITY_POLICY",
        description: "Returns the active onchain spending limits, token caps, and safety rules for the agent.",
        similes: ["CHECK_LIMITS", "GET_SPEND_CEILINGS", "VIEW_SECURITY_RULES"],
        examples: [
            [
                {
                    user: "{{user1}}",
                    content: { text: "What are your spending limits on Base?" },
                },
                {
                    user: "{{agentName}}",
                    content: { text: "Checking active security policy boundaries...", action: "GET_SECURITY_POLICY" },
                },
            ],
        ],
        validate: async (_runtime, _message, _state) => true,
        handler: async (_runtime, _message, _state, _options, callback) => {
            const policy = engine.getPolicy();
            const text = `Current Onchain Security Policy:\n` +
                `• Max Native / Tx: ${policy.maxNativePerTx} ETH\n` +
                `• Max Native / 24h: ${policy.maxNativeDaily} ETH\n` +
                `• Max USDC / Tx: ${policy.maxUsdcPerTx} USDC\n` +
                `• Max USDC / 24h: ${policy.maxUsdcDaily} USDC\n` +
                `• Max x402 Payment: ${policy.maxPaymentPerX402} USDC\n` +
                `• Strict Injection Defense: ${policy.strictMode ? "ENABLED" : "DISABLED"}`;
            if (callback)
                await callback({ text, policy });
            return policy;
        },
    };
}
//# sourceMappingURL=getPolicy.js.map