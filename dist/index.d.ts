import { GuardPolicy, Plugin } from "./types.js";
export * from "./types.js";
export * from "./constants.js";
export * from "./engine.js";
/**
 * Creates an ElizaOS BaseGuard plugin instance with customizable policies.
 */
export declare function createBaseGuardPlugin(customPolicy?: Partial<GuardPolicy>): Plugin;
export declare const baseGuardPlugin: Plugin;
export default baseGuardPlugin;
//# sourceMappingURL=index.d.ts.map