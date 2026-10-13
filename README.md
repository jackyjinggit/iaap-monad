# IAAP Monad Adapter

> **The first on-chain Agent Trust Engine.** Extends the IAAP detector's
> five-stage rule engine for flattery / halo / 装腔 onto **Monad Testnet** via
> a minimal adapter contract — anyone can flag a content-hash with a 0–5
> severity score; submissions anchor immutably on Monad and accumulate
> per-agent reputation.

[![Monad Testnet](https://img.shields.io/badge/Monad-Testnet-blueviolet)](https://testnet.monadexplorer.com)
[![Solidity 0.8](https://img.shields.io/badge/Solidity-0.8.x-363636)]()
[![Hackathon: Metropolis](https://img.shields.io/badge/Metropolis-Metropolis-orange)]()
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache--2.0-blue)]()

> Track: **04 Trust, Identity & AI Infrastructure**
> Team: **TrueFellow** (Jacky Jiang · Independent Researcher)
> Submission deadline: 14 Oct 11:59 GMT+8

---

## ⚠️ Why this matters

When users interact with an AI agent, three failure modes are silent and dangerous:
- **Flattery** (the agent says "great work!" regardless of truth)
- **Halo effect** (the agent praises the user to maintain affiliation)
- **装腔** (the agent uses fluff to fill the response void)

Individually each is a known LLM failure mode. **The problem**: there is
**no public, verifiable, post-hoc audit trail** that survives across platforms.

IAAP solves detection (front-end, JS, offline-capable). This Monad adapter solves
**public verifiability** — every flagged interaction gets an immutable hash on a public chain.

Together they form an **Agent Trust Engine** for the AI-native Internet.

---

## 🧱 Architecture

```
┌──────────────────────────────────┐
│ Front-end (Zero backend)         │
│  - HTML + JS IAAP detector       │
│  - 5-stage rule engine           │
│  - Local ID-Score 0–1            │
│  - Display 0–5 severity score    │
│  - "Flag to Monad" button        │
└──────────┬───────────────────────┘
           │ flagContent(bytes32 hash, uint8 severity)
           ▼
┌──────────────────────────────────┐
│ Smart contract (Monad Testnet)   │
│  contract MonorepAdapter         │
│  function flagContent(...)       │
│  event IAAPFlagSubmitted(...)    │
│  mapping(address => uint256)     │
│    reputationScores              │
└──────────────────────────────────┘
```

**No private data on chain** — only `contentHash` (32 bytes) + `severityScore`
(0–5) + `submitter` (address) + `timestamp`. The content itself stays on the
front-end / user's device. **Privacy-first by design.**

---

## 📦 Repo layout

```
iaap-monad/
├── README.md                ← (this file)
├── package.json             ← Hardhat + ethers dependencies
├── hardhat.config.js        ← Monad Testnet config
├── .env.example             ← PRIVATE_KEY + RPC placeholders
├── contracts/
│   └── MonorepAdapter.sol   ← minimal adapter contract
├── scripts/
│   └── deploy.js            ← Hardhat deployment to Monad Testnet
├── frontend/
│   ├── index.html           ← IAAP detector UI + flag button
│   └── iaap-engine.js       ← 5-stage rule engine (offline)
└── docs/
    ├── architecture.md
    ├── DEPLOYMENT.md        ← Step-by-step deploy guide
    ├── PUSH_COMMANDS.md     ← git push cheat sheet
    └── submission/          ← Original Metropolis submission artifacts
```

---

## 🚀 Quick start

```bash
# 1. Install
npm install

# 2. Set env
cp .env.example .env
#  - edit PRIVATE_KEY=<your Monad Testnet wallet private key>

# 3. Get testnet MON from faucet
# https://faucet.monad.xyz  (request 0.5 MON)

# 4. Compile + test
npx hardhat compile
npx hardhat test

# 5. Deploy to Monad Testnet
npx hardhat run scripts/deploy.js --network monadTestnet
# → record the deployed contract address for the front-end
```

---

## 🛠 Tech stack

| Layer | Choice | Why |
|-------|--------|-----|
| Chain | **Monad Testnet** | High-TPS EVM-compatible, parallel execution |
| Language | **Solidity 0.8.x** | Standard, audited |
| Framework | **Hardhat** (compile + test + deploy) | EVM-native, Monad supports out-of-the-box |
| Front-end | **HTML + Vanilla JS** | Zero dependency, offline-capable |
| Wallet | **MetaMask / ethers.js** | 浏览器原生集成 |

---

## 🗺 Roadmap

- [x] **v0.1** (Metropolis submission): Minimal contract + flag UX + 60s demo
- [ ] **v0.2**: ERC-8004 agent reputation module (post-Metropolis)
- [ ] **v0.3**: P256 / WebAuthn passkey-native accounts
- [ ] **v1.0**: DAO-governed trusted-agent registry

---

## 👤 Team

- **Jacky Jiang (蒋平)** — independent researcher; author of
  [FEE v3.4](https://osf.io/6jdhm) (谄臣效应 / flattery-effect echo) and
  DSHarness; Zhi-Hu ONF; OSChina 11-13 speaker.
- **AI collaborator** — built into TrueFellow pipeline.

---

## 📜 License

Apache-2.0 (same as parent `TrueFellow` repository).
