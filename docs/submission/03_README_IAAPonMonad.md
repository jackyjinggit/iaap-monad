# IAAP Monad Adapter

> **The first on-chain Agent Trust Engine.** Extends the IAAP detector's five-stage
> rule engine for flattery / halo / 装腔 onto **Monad Testnet** via a minimal
> adapter contract — anyone can flag a content-hash with a 0–5 severity score;
> submissions anchor immutably on Monad and accumulate per-agent reputation.

[![Monad Testnet](https://img.shields.io/badge/Monad-Testnet-blueviolet)](https://testnet.monadexplorer.com)
[![Solidity 0.8](https://img.shields.io/badge/Solidity-0.8.x-363636)]()
[![Hackathon: Metropolis](https://img.shields.io/badge/Metropolis-Metropolis-orange)]()

> Track: **04 Trust, Identity & AI Infrastructure**
> Team: **TrueFellow** (Jacky Jiang · Independent Researcher)
> Status: **Submission draft v0.1 · 2026-10-13**

---

## ⚠️ Why this matters

When users interact with an AI agent, three failure modes are silent and dangerous:
- **Flattery** (the agent says "great work!" regardless of truth)
- **Halo effect** (the agent praises the user to maintain affiliation)
- **装腔** (the agent uses fluff to fill the response void)

Individually each is a known LLM failure mode. **The problem**: there is **no public,
verifiable, post-hoc audit trail** that survives across platforms.

IAAP solves detection (front-end, JS, offline-capable). This Monad adapter solves
**public verifiability** — every flagged interaction gets an immutable hash on a public chain.

Together they form an **Agent Trust Engine** for the AI-native Internet.

---

## 🧱 Architecture

```
┌──────────────────────────────────┐
│ Front-end (Zero backend)         │
│  - HTML + JS IAAP detector      │
│  - 5-stage rule engine          │
│  - Local ID-Score 0–1           │
│  - Display 0–5 severity score   │
└──────────┬───────────────────────┘
           │ flagContent(hash, severity)
           ▼
┌──────────────────────────────────┐
│ Smart contract (Monad Testnet)  │
│  contract MonorepAdapter         │
│  function flagContent(bytes32,  │
│    uint8 severity)               │
│  event IAAPFlagSubmitted(...)    │
│  mapping(address => uint256)     │
│    reputationScores              │
└──────────────────────────────────┘
```

**No private data on chain** — only `contentHash` (32 bytes) + `severityScore`
(0–5) + `submitter` (address) + `timestamp`. The content itself stays on the
front-end / user's device. **Privacy-first by design.**

---

## 🛠 Tech stack

| Layer | Choice | Why |
|-------|--------|-----|
| Chain | **Monad Testnet** | High-TPS EVM-compatible, parallel execution |
| Language | **Solidity 0.8.x** | Standard, audited |
| Framework | **Hardhat** (compile + test + deploy) | EVM-native, Monad supports out-of-the-box |
| Front-end | **HTML + Vanilla JS** | Zero dependency, offline-capable |
| Storage | **GitHub Pages** | 静态托管, 与 IAAP 检测器前作共用部署路径 |

---

## 📦 Repo layout (after fork)

```
iaap-monad/
├── README.md                ← (this file)
├── contracts/
│   └── MonorepAdapter.sol   ← minimal adapter contract
├── scripts/
│   └── deploy.js            ← Hardhat deployment to Monad Testnet
├── frontend/
│   ├── index.html           ← IAAP detector UI + "flag to Monad" button
│   ├── iaap-engine.js       ← 5-stage rule engine
│   └── flag-to-monad.js     ← ethers.js call to flagContent()
├── test/
│   └── MonorepAdapter.test.js
└── docs/
    ├── submission/          ← METROPOLIS submission artifacts
    └── roadmap.md
```

---

## 🚀 Quick start

```bash
# 1. Install
npm install

# 2. Set env
echo "MONAD_RPC=https://testnet-rpc.monad.xyz" > .env
echo "PRIVATE_KEY=<蒋平 Testnet 钱包私钥>" >> .env
echo "MONAD_CHAIN_ID=10143" >> .env

# 3. Get testnet MON from faucet
# https://faucet.monad.xyz

# 4. Compile + test
npx hardhat compile
npx hardhat test

# 5. Deploy to Monad Testnet
npx hardhat run scripts/deploy.js --network monadTestnet
```

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

---

## 🔗 Links (filled at submission time)

- Live product (Monad Testnet): `<待部署>`
- Demo video (60s): `<待录制>`
- Hackathon submission: METROPOLIS / Monad Foundation
