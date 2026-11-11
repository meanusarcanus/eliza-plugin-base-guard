import { z } from "zod";
export const TransactionInputSchema = z.object({
    to: z.string(),
    value: z.string().optional().default("0"),
    data: z.string().optional().default("0x"),
    userPrompt: z.string().optional(),
    reasoningTrace: z.string().optional()
});
export const X402ChallengeSchema = z.object({
    merchant: z.string(),
    amountUsdc: z.string(),
    resourceUri: z.string(),
    nonce: z.string(),
    deadline: z.number(),
    tokenAddress: z.string().optional()
});
//# sourceMappingURL=types.js.map