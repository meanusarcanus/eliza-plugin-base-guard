import { GuardPolicy, SecurityVerdict, TransactionInput, X402Challenge } from "./types.js";
export declare class BaseGuardEngine {
    private policy;
    private spendHistory;
    private blocklistSet;
    private usedNonces;
    constructor(policy: GuardPolicy);
    getPolicy(): GuardPolicy;
    get24hNativeUsed(now?: number): bigint;
    get24hUsdcUsed(now?: number): bigint;
    scanPrompt(text?: string): {
        safe: boolean;
        pattern?: string;
        riskScore: number;
    };
    evaluateTransaction(input: TransactionInput, now?: number): SecurityVerdict;
    evaluateX402(challenge: X402Challenge, now?: number): SecurityVerdict;
}
//# sourceMappingURL=engine.d.ts.map