# Architecture

```
        ┌────────────────────────────────────────────────────────────────┐
        │                       User's browser                          │
        │                                                                │
        │   ┌──────────────────────────────┐   ┌─────────────────────┐  │
        │   │  iaap-engine.js (offline)    │   │  ethers.js          │  │
        │   │  5 stages · pure rules       │   │  wallet integration │  │
        │   └────────┬─────────────────────┘   └─────────┬───────────┘  │
        │            │                                    │              │
        │   ┌────────▼────────────────────────────────────▼───────────┐  │
        │   │  index.html                                             │  │
        │   │  - paste transcript                                     │  │
        │   │  - run detection (offline)                              │  │
        │   │  - "Flag to Monad" button                               │  │
        │   └─────────────────────────────────────────────────────────┘  │
        └─────────────────┬──────────────────────────────────────────────┘
                          │
                          │  flagContent(bytes32 contentHash, uint8 severityScore)
                          ▼
        ┌────────────────────────────────────────────────────────────────┐
        │                 Monad Testnet (chainId 10143)                  │
        │                                                                │
        │   ┌────────────────────────────────────────────────────────┐  │
        │   │  contract MonorepAdapter                                │  │
        │   │                                                        │  │
        │   │   state:                                               │  │
        │   │     seen[bytes32] -> bool                              │  │
        │   │     reputationTotalScore[address] -> uint256          │  │
        │   │     reputationFlagCount [address] -> uint256          │  │
        │   │     totalFlags -> uint256                              │  │
        │   │                                                        │  │
        │   │   events:                                              │  │
        │   │     IAAPFlagSubmitted(hash, submitter, sev, ts)        │  │
        │   │     IAAPReputationUpdated(agent, totalScore, cnt, ts)  │  │
        │   │                                                        │  │
        │   │   function flagContent(bytes32, uint8) external        │  │
        │   │   function getReputation(address) view                 │  │
        │   │   function getTotalFlags() view                        │  │
        │   └────────────────────────────────────────────────────────┘  │
        │                                                                │
        │   block explorer: https://testnet.monadexplorer.com           │
        └────────────────────────────────────────────────────────────────┘
```

## Privacy guarantees

| Data | Where |
|------|------|
| Original transcript text | **User's browser only** (never uploaded) |
| 32-byte content-hash | Public on Monad Testnet |
| Severity score (0–5) | Public on Monad Testnet |
| Submitter wallet address | Public on Monad Testnet (pseudonymous) |
| Submission timestamp | Public on Monad Testnet |

This means: anyone can verify that *something* was flagged at *some* severity, at *a* time, by *a* address. Nobody (including the contract operator) can read the original message.

## Why ERC-8004 alignment matters

ERC-8004 is the emerging Ethereum standard for **Agent identity and reputation**.
By aligning MonorepAdapter's `reputationScores` mapping and event shape with
ERC-8004's reputation model, IAAP-on-Monad can become a *compliant data source*
for downstream ERC-8004 registries — without needing a redesign when ERC-8004
ships.

## Why Monad (not mainnet Ethereum)

- Monad: parallel-execution EVM, sub-second finality, gas <$0.001 typical
- Ethereum mainnet: ~12s block, $0.50+ per flagContent() call (untenable for a public spam-deterrent registry)
- Testnet is fully EVM-compatible, so the same Solidity deploys to both with zero changes
