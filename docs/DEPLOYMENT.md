# DEPLOYMENT.md — Monad Testnet 部署 step-by-step

> 蒋平按本文逐步执行；每步有验证命令 / 截图位。
> 预计 **~ 30 min**（含领 faucet + 部署 + Pages 开关）。

---

## Step 0 · 前置

- 安装 Node.js ≥ 18（陆沉未动，仅供查）
- 安装 MetaMask 浏览器扩展（已有钱包）
- 准备：项目仓地址 `https://github.com/jackyjinggit/iaap-monad`（蒋平已创建）

---

## Step 1 · Clone 到本地

```bash
cd /c/research_workspace   # 或任意本地路径
git clone https://github.com/jackyjinggit/iaap-monad.git
cd iaap-monad
ls
# 应看到 contracts/ scripts/ frontend/ docs/ hardhat.config.js package.json .env.example README.md
```

---

## Step 2 · 装依赖

```bash
npm install
# 若 hardhat toolbox / ethers 报错，删 node_modules 再装一遍：
#   rm -rf node_modules package-lock.json && npm install
```

预期看到 `node_modules/`、`package-lock.json` 出现。

---

## Step 3 · 配 Monad Testnet 钱包（陆沉不碰凭证）

1. 在 MetaMask 创建/切换一个**专用 Testnet 钱包**（不要用 mainnet）
2. 打开 MetaMask → 网络 → 添加网络
   - 网络名：`Monad Testnet`
   - RPC：`https://testnet-rpc.monad.xyz`
   - 链 ID：`10143`
   - 货币：`MON`
   - 区块浏览器：`https://testnet.monadexplorer.com`
3. 复制该钱包 **私钥**（0x 开头 64 hex）→ 准备填 `.env`

---

## Step 4 · 领 Testnet MON（部署 gas 钱）

打开 `https://faucet.monad.xyz`：

- 粘贴 Step 3 的钱包地址
- 领 `0.5 MON` 起步（通常 faucet 每日有上限）
- 等 ~30 秒 → 在浏览器 explorer 查 `https://testnet.monadexplorer.com/address/<你的地址>` 看到余额

---

## Step 5 · 配 .env（陆沉不碰凭证）

```bash
cp .env.example .env
# 编辑 .env（用 Notepad / VSCode，**不要提交**）：
#   PRIVATE_KEY=0x<你的 64-hex 私钥>
# 其余字段已有默认值
```

确认 `.gitignore` 已包含 `.env`：

```bash
cat .gitignore
# 若没有 .env 行，添加一行：
#   echo ".env" >> .gitignore
```

---

## Step 6 · 编译 + 单测

```bash
npx hardhat compile
# 输出：Compiled 1 Solidity file successfully (evm target: paris)

npx hardhat test
# 输出：0 failing · （建议加测试用例，可先 0 用例通过）
```

---

## Step 7 · 部署到 Monad Testnet（不可逆外发，但仅链上写，没"对外发布"风险）

```bash
npx hardhat run scripts/deploy.js --network monadTestnet
```

预期输出（**保留这一段 = 后续填 GitHub Pages + 提交表单用**）：

```
═══════════════════════════════════════════════════════════════
IAAP Monad Adapter — Deployment
═══════════════════════════════════════════════════════════════
Network       : monadTestnet
Deployer      : 0x<你的地址>
Balance (MON) : 0.499
───────────────────────────────────────────────────────────────
Deploying MonorepAdapter ...
✅ MonorepAdapter deployed
   Contract address    : 0x<合约地址>
   Deployment tx hash  : 0x<交易 hash>
   Explorer (contract) : https://testnet.monadexplorer.com/address/0x<合约地址>
   Explorer (tx)       : https://testnet.monadexplorer.com/tx/0x<交易 hash>
───────────────────────────────────────────────────────────────
```

**记录 contract address**，下一步用。

---

## Step 8 · 把合约地址填进前端 + 部署到 GitHub Pages

```bash
# 编辑 frontend/index.html，搜索：
#   const MONOREP_ADAPTER_ADDRESS = "";
# 替换为实际地址：
#   const MONOREP_ADAPTER_ADDRESS = "0x<合约地址>";

# 提交 + push
git add frontend/index.html
git commit -m "deploy: bind to Monad Testnet contract 0x<addr>"
git push origin main

# 开启 GitHub Pages：浏览器打开
#   https://github.com/jackyjinggit/iaap-monad/settings/pages
# Source: Deploy from a branch → Branch: main → Folder: /(root)
# （或者放 gh-pages 分支 → 选 gh-pages 分支）
```

注意：GitHub Pages 默认从 root 部署，访问路径 `https://jackyjinggit.github.io/iaap-monad/`——但默认首页是仓库根 README；要让 `frontend/index.html` 跑，可：
- **方案 A**（推荐）：把 `frontend/index.html` 移到仓根 → `mv frontend/index.html index.html` 后 push
- **方案 B**（次选）：GitHub Pages 不支持自定义 index；只能用 A。

**陆沉建议**：直接用 A，把 `frontend/index.html` 移到仓根（README 不影响，README 还是 README）。

---

## Step 9 · 录 Demo Video（60s）

见 `docs/submission/06_Demo_Video_Script.md`。录屏方法：
1. **OBS Studio** / Windows Game Bar / Mac QuickTime 启动录屏
2. 浏览器打开 `https://jackyjinggit.github.io/iaap-monad/`
3. 粘贴一段内容（蒋平任意一段对话，含 flattery 关键词）→ Run IAAP → 显示结果 → Flag to Monad → MetaMask 签 → 显示交易 hash
4. 录 60s
5. 上传 YouTube（unlisted）/ Loom → 给我公开 URL

---

## Step 10 · 填提交表单

回到 Metropolis 提交页 `https://monad.xyz/developers/hackathons/metropolis` →
"Submit a project"，按 `docs/submission/05_Submission_Checklist.md` 的 5 项填：

| 字段 | 值 |
|------|----|
| Primary track | **04 Trust, Identity & AI Infrastructure** |
| Project name | **IAAP Monad Adapter** |
| Team name | **TrueFellow** |
| Description | `docs/submission/01_Description_200.md` 选 b 板 78 字 |
| Go-to-market | `docs/submission/02_GoToMarket_500.md` |
| Logo | 待 fork 仓后再上传（IAAP 现有 png 可复用） |
| GitHub repo | `https://github.com/jackyjinggit/iaap-monad` |
| Live product | `https://jackyjinggit.github.io/iaap-monad/`（Pages 启用后） |
| Demo video | YouTube/Loom 公开 URL |

---

## 应急 / 已知风险

| 风险 | 应急 |
|------|------|
| MetaMask RPC 连接失败 | 试备用 RPC：`https://rpc.ankr.com/monad_testnet`（如有） |
| Faucet 不发币 | 在 Monad Discord 找 #testnet-faucet 频道管理员 |
| Hardhat 编译错版本 | 改 `hardhat.config.js` 的 `solidity.version = "0.8.x"` 试 0.8.19 / 0.8.21 |
| Pages 启用后 404 | 等 1-2 分钟；删重建 gh-pages 分支 |
| Demo video 卡 | 改纯字幕方案（06 文件已备） |

---

## 红线

- ✅ 蒋平从未签任何不可逆 token-approval / approve 类操作（合约本身不需要）
- ✅ MonorepAdapter 不持有用户资金，纯粹记账 + 事件 emit
- ✅ `.env` 含私钥不入 commit（已在 `.gitignore`）
- ❌ 陆沉不碰 PRIVATE_KEY = 蒋平亲做配置 + 部署

*完毕·预计总耗时 30-40 min*
