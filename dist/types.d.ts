import { z } from "zod";
/**
 * Standard ElizaOS runtime and plugin interfaces
 */
export interface Memory {
    id?: string;
    userId?: string;
    agentId?: string;
    createdAt?: number;
    content: {
        text: string;
        action?: string;
        source?: string;
        url?: string;
        inReplyTo?: string;
        attachments?: unknown[];
        [key: string]: unknown;
    };
    roomId?: string;
    embedding?: number[];
}
export interface State {
    userId?: string;
    agentId?: string;
    bio?: string;
    lore?: string;
    messageDirections?: string;
    postDirections?: string;
    roomId?: string;
    actors?: string;
    recentMessages?: string;
    recentMessagesData?: Memory[];
    [key: string]: unknown;
}
export type HandlerCallback = (response: {
    text: string;
    action?: string;
    [key: string]: unknown;
}, files?: unknown[]) => Promise<unknown>;
export interface IAgentRuntime {
    agentId?: string;
    serverUrl?: string;
    getSetting(key: string): string | undefined;
    getConversationLength?(): number;
    [key: string]: unknown;
}
export interface Action {
    name: string;
    description: string;
    similes?: string[];
    examples?: Array<Array<{
        user?: string;
        name?: string;
        content: {
            text: string;
            [key: string]: unknown;
        };
    }>>;
    validate: (runtime: IAgentRuntime, message: Memory, state?: State) => Promise<boolean>;
    handler: (runtime: IAgentRuntime, message: Memory, state?: State, options?: Record<string, unknown>, callback?: HandlerCallback) => Promise<unknown>;
}
export interface Evaluator {
    name: string;
    description: string;
    similes?: string[];
    schema?: Record<string, unknown>;
    prompt?: string;
    shouldRun?: (params: any) => Promise<boolean>;
    handler: (runtime: IAgentRuntime, message: Memory, state?: State) => Promise<unknown>;
}
export interface Provider {
    name?: string;
    get: (runtime: IAgentRuntime, message: Memory, state?: State) => Promise<string | {
        text?: string;
    } | null>;
}
export interface Plugin {
    name: string;
    description: string;
    actions?: Action[];
    evaluators?: Evaluator[];
    providers?: Provider[];
    services?: unknown[];
}
/**
 * Onchain Security & Guardrail Configurations
 */
export interface GuardPolicy {
    maxNativePerTx: string;
    maxNativeDaily: string;
    maxUsdcPerTx: string;
    maxUsdcDaily: string;
    maxPaymentPerX402: string;
    blockedDestinations: string[];
    strictMode: boolean;
}
export type VerdictCode = "APPROVED" | "PROMPT_INJECTION_DETECTED" | "DESTINATION_BLOCKLISTED" | "INVALID_DESTINATION" | "UNLIMITED_APPROVAL_ATTACK" | "DANGEROUS_CALLDATA" | "UNRECOGNIZED_CALLDATA" | "EXCEEDS_SPEND_LIMIT" | "X402_EXPIRED" | "X402_EXPIRED_OR_MISSING" | "X402_NONCE_REPLAY" | "X402_EXCEEDS_CAP" | "X402_MALFORMED" | "MALFORMED_VALUE";
export interface SecurityVerdict {
    allowed: boolean;
    code: VerdictCode;
    riskScore: number;
    reason: string;
    timestamp: number;
    diagnostics?: Record<string, unknown>;
}
export declare const TransactionInputSchema: z.ZodObject<{
    to: z.ZodString;
    value: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    data: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    userPrompt: z.ZodOptional<z.ZodString>;
    reasoningTrace: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    to: string;
    value: string;
    data: string;
    userPrompt?: string | undefined;
    reasoningTrace?: string | undefined;
}, {
    to: string;
    value?: string | undefined;
    data?: string | undefined;
    userPrompt?: string | undefined;
    reasoningTrace?: string | undefined;
}>;
export type TransactionInput = z.infer<typeof TransactionInputSchema>;
export declare const X402ChallengeSchema: z.ZodObject<{
    merchant: z.ZodString;
    amountUsdc: z.ZodString;
    resourceUri: z.ZodString;
    nonce: z.ZodString;
    deadline: z.ZodNumber;
    tokenAddress: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    merchant: string;
    amountUsdc: string;
    resourceUri: string;
    nonce: string;
    deadline: number;
    tokenAddress?: string | undefined;
}, {
    merchant: string;
    amountUsdc: string;
    resourceUri: string;
    nonce: string;
    deadline: number;
    tokenAddress?: string | undefined;
}>;
export type X402Challenge = z.infer<typeof X402ChallengeSchema>;
//# sourceMappingURL=types.d.ts.map