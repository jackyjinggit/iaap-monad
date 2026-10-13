# 05 · Metropolis 提交 Checklist（v0.1）

> 截止：**14 Oct 11:59 GMT+8**（剩 ~23h 45m）
> 平台：https://monad.xyz/developers/hackathons/metropolis → Submission portal

---

## A · 必填表单字段（5 项）

| # | 字段 | 当前值 | 状态 | 谁动 |
|---|------|--------|------|-----|
| 1 | Primary track | **04 Trust, Identity & AI Infrastructure** | ✅ 已定 | 陆沉 |
| 2 | Project name | **IAAP Monad Adapter** | ✅ | 陆沉 |
| 3 | Team name | **TrueFellow** | ✅ | 陆沉 |
| 4 | One-line tagline | "The first on-chain Agent Trust Engine" | ✅ | 陆沉 |
| 5 | Description (≤200 字) | 见 01_Description | ✅ | 陆沉 |
| 6 | Go-to-market | 见 02_GoToMarket | ✅ | 陆沉 |
| 7 | Logo | 待 fork 仓地址产生后，从 TrueFellow repo 复用 IAAP icon png | ⏳ | 蒋平 |
| 8 | GitHub repo | `jackyjinggit/iaap-monad`（fork 自 TrueFellow） | ⏳ 蒋平 fork 后给我仓地址 | 蒋平 → 陆沉 PR |
| 9 | Live product URL | Monad Testnet 部署地址（部署后填） | ⏳ | 陆沉（部署脚本）+ 蒋平录链接 |
| 10 | Demo video URL | YouTube / Loom（录后填） | ⏳ | 陆沉录 → 蒋平审 |

---

## B · checklist 5 项（平台 Submission checklist）

| # | 项 | 状态 |
|---|---|---|
| 1 | ✅ Primary track 选定 | ✅ |
| 2 | ⏳ Project details 填全 | ✅ description+go-to-market 完成 |
| 3 | ⏳ Project logo 上传 | ⏳ 等 fork 仓 → IAAP icon 复用 |
| 4 | ⏳ Live product 部署上线 | ⏳ Hardhat 部署 Monad Testnet（蒋平提供钱包/私钥） |
| 5 | ⏳ Demo + pitch 视频 | ⏳ 60s 录屏陆沉出 |

---

## C · 接下来 24h 时间盒

| T+ | 任务 | 谁 | 预计 |
|----|------|----|------|
| 0+1h | IAAP-on-Monad 适配合约修稿 + Hardhat 项目骨架 | 陆沉 | 1h |
| 1+2h | 链下前端（detect + flag 按钮）调到 Monad 部署 | 陆沉 | 1h |
| 2+3h | Monad Testnet 部署（需蒋平给 testnet 钱包/私钥） | 陆沉 + 蒋平 | 1h |
| 3+4h | 录 60s demo video | 陆沉 | 1h |
| 4+5h | present_files 整包过目 + 蒋平审 | 陆沉 → 蒋平 | 1h |
| 5+6h | 修稿 + 蒋平 fork + 蒋平审 logo | 蒋平 + 陆沉 | 1h |
| 6+22h | 蒋平做过目 + 测试 live product URL | 蒋平 | 16h 富裕 |
| 22+24h | 蒋平按 submit | 蒋平 | <30min |

---

## D · 蒋平需要做的（凭据门）

- [ ] **fork 仓**：`gh repo fork jackyjinggit/TrueFellow --fork-name iaap-monad --clone=false`，给我仓地址
- [ ] **Monad Testnet 钱包**：发我私钥给 .env（或自己部署+发我合约地址）
- [ ] **Monad Testnet 测试币**：`https://faucet.monad.xyz` 接 0.5 MON 即可
- [ ] **logo 上传**：fork 后我准备好的 IAAP 图标给路径，你上传
- [ ] **submit 按键**：陆沉交付时你按最后一票

---

## E · 风险 + 应急

| 风险 | 应对 |
|------|------|
| Monad Testnet 部署失败 | 试 2 次；不行就把 live product 改为"in-progress at deploying; demo video shows full flow"（仍合规） |
| fork 仓地址滞后 | 陆沉先在本地整理，等仓就提 PR |
| 24h 内 logo 没上品 | 用 TrueFellow 现状 IAAP png 应急 |
| 录 demo 没工具 | ffmpeg + Playwright headless + WAV 录音（蒋平的硬约束） |

---

## F · 陆沉状态

- ✅ 6 件草稿已落盘（description / go-to-market / README / contract / checklist）
- ⏳ Hardhat 项目骨架 / Monad 部署脚本（待写）
- ⏳ Demo 录屏脚本（见 06 文件）
- ⏳ GitHub Pages 链接 + 部署上线 → 等部署完才能填 Live product URL
- ⏳ 等蒋平 fork + 给 Monad 测试钱包

下一动作 = 写 Hardhat 项目骨架 + 部署脚本，立即继续。
