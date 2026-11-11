# 📝 ElizaOS (ai16z) Ecosystem Grant & Base Builder Bounty Application

Use this document to apply for the **ai16z Partner Grants**, **ElizaOS Ecosystem Fund**, and **Base AI Agent Grants**.

---

## 1. Project Summary
* **Project Name:** `@elizaos/plugin-base-guard` (ElizaOS Base Guard)
* **Tagline:** Zero-latency onchain security firewall, spend guardrails & prompt injection defense plugin for ElizaOS autonomous agents on Base.
* **Repository:** `https://github.com/meanusarcanus/eliza-plugin-base-guard`
* **Target Network:** Base Mainnet & Base Sepolia
* **Category:** Developer Tooling & Security Infrastructure / AI Agents
* **Requested Funding:** $15,000 USDC

---

## 2. Problem & Value Proposition
With over 19,000 GitHub stars, **ElizaOS** is the default operating system for onchain AI agents. However, giving an Eliza agent live private keys exposes users and DAOs to catastrophic risk:
1. **Prompt Injection Drains:** Attackers trick agents into executing unauthorized fund transfers.
2. **Infinite Approvals:** Agents routinely approve `type(uint256).max` allowances to DEX routers, exposing wallets to future exploits.
3. **Runaway Loops:** Logical loops can burn through agent treasuries in minutes.
4. **x402 Micropayment Overcharging:** Agents lack local rate limits when paying for paywalled web APIs.

**`plugin-base-guard`** solves this by providing native ElizaOS Evaluators, Providers, and Actions that enforce deterministic, fail-closed policy checks before any EVM transaction can be signed.

---

## 3. Milestones & Deliverables
* **Milestone 1 ($5,000 USDC - Completed):** Complete TypeScript implementation of `baseGuardPlugin` with `VALIDATE_TRANSACTION`, `PROMPT_SAFETY_EVALUATOR`, and `GUARD_POLICY_PROVIDER`. (10/10 automated tests passing).
* **Milestone 2 ($5,000 USDC - Completed):** Integration of Coinbase HTTP 402 (x402) micropayment validator and unlimited ERC-20 approval blocker.
* **Milestone 3 ($5,000 USDC - In Progress):** Official upstreaming into the `elizaOS/eliza` monorepo (`plugins/plugin-base-guard`) and community onboarding across Base hackathons.
