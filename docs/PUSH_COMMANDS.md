# PUSH_COMMANDS.md — 蒋平跑这一份就够了

> 蒋平已经创建了空仓 `https://github.com/jackyjinggit/iaap-monad`。
> 陆沉把所有 staging 内容落到 `产出/iaap-monad-staging/`，
> 蒋平按下面命令 **rsync / git add / commit / push** 一次到位。

---

## 方式 A · 蒋平亲跑（陆沉零凭证）

```bash
# ─────────────────────────────────────────
# Step 1: 把 staging 同步到一个干净工作树
# ─────────────────────────────────────────
# 选项 1（推荐）：把 产出/iaap-monad-staging 复制到仓根
rsync -av --delete \
  /c/research_workspace/产出/iaap-monad-staging/ \
  /c/research_workspace/iaap-monad/

cd /c/research_workspace/iaap-monad

# ─────────────────────────────────────────
# Step 2: 初始化仓
# ─────────────────────────────────────────
git init                                # 若不是已经 init
git remote add origin https://github.com/jackyjinggit/iaap-monad.git

# ─────────────────────────────────────────
# Step 3: 第一批提交
# ─────────────────────────────────────────
git add .
git status                              # 核对所有文件
git commit -m "feat(iaap-monad): Metropolis hackathon submission v0.1

- MonorepAdapter.sol (minimal on-chain adapter)
- IAAP 5-stage offline engine (frontend/iaap-engine.js)
- Frontend with 'Flag to Monad' button
- Hardhat deploy to Monad Testnet
- Track 04 Trust, Identity & AI Infrastructure

Co-authored-by: TrueFellow <jackyjinggit@users.noreply.github.com>"

# ─────────────────────────────────────────
# Step 4: 推送（不可逆外发 = 蒋平按）
# ─────────────────────────────────────────
git branch -M main
git push -u origin main

# ─────────────────────────────────────────
# Step 5: 后续维护
# ─────────────────────────────────────────
# 每次改完（蒋平或陆沉提示），按 1-3 步循环：
git add <file>
git commit -m "fix: ..."
git push
```

---

## 方式 B · 蒋平只创仓，陆沉打包成 zip + 二维码

如果蒋平不想 terminal 跑命令：
1. 陆沉把 `产出/iaap-monad-staging/` 打成 `iaap-monad.zip`（含所有文件 + 隐藏 .gitignore）
2. 蒋平下到本地解压
3. 蒋平用 GitHub Desktop 上传（GitHub Desktop 比 git CLI 友好）

---

## 推送后马上做的（陆沉下一步）

1. Pages 启用：在仓 Settings → Pages → `main` 分支 root → Save
2. 访问 `https://jackyjinggit.github.io/iaap-monad/` 验证（首次 1-2 min 生效）
3. 录 60s demo video（按 `docs/submission/06_Demo_Video_Script.md`）
4. 填 Metropolis 提交表单（按 `docs/submission/05_Submission_Checklist.md`）
5. 按 submit（蒋平本人）

---

## 退回线（如有意外）

如果第一个 commit 想撤回（不可逆但还没 push = 可撤回）：

```bash
# 在 git push 之前，全撤回：
git log --oneline                        # 看最新 commit
git reset --soft HEAD~1                   # 软撤回，文件保留在工作区
git status                                # 应该见 staged 文件 + 工作区文件
# 改完再 git add / commit / push
```

如果已经 push：
- 在 GitHub 网页 → Revert this commit
- 或 git revert <hash> 后再 push

---

## 包含 9 文件清单（蒋平核对）

| # | 文件 | 用途 | 状态 |
|---|------|------|------|
| 1 | README.md | 仓首页 | 陆沉写 |
| 2 | package.json | Hardhat deps | 陆沉写 |
| 3 | hardhat.config.js | Monad Testnet config | 陆沉写 |
| 4 | .env.example | PRIVATE_KEY placeholder | 陆沉写 |
| 5 | contracts/MonorepAdapter.sol | 链上合约 | 陆沉写 |
| 6 | scripts/deploy.js | Hardhat 部署 | 陆沉写 |
| 7 | frontend/index.html | 用户界面 | 陆沉写 |
| 8 | frontend/iaap-engine.js | 5 阶段规则引擎 | 陆沉写 |
| 9 | docs/architecture.md | 架构文档 | 陆沉写 |
| 10 | docs/DEPLOYMENT.md | 部署 step-by-step | 陆沉写 |
| 11 | docs/PUSH_COMMANDS.md | 本文件 | 陆沉写 |
| 12 | docs/submission/ 7 件草稿 | Metropolis 提交艺术品 | 陆沉写 |

---

*陆沉窗 · 2026-10-13 12:27 · staging 树成 + push 命令 ready · 等蒋平跑*
