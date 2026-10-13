# 07 · Metropolis 仓命名 3 候选（蒋平 12:22 反馈："不能 fork，自己建"）

> 蒋平原话：「自己的仓库不能 fork，我直接建一个」
> = **新策略**：蒋平在 GitHub 直接创建空仓库（init README 可不勾）→ 把这 6 件草稿 + Hardhat 骨架 推送上去
> = 不走 fork 路径

---

## 3 个候选仓名（陆沉拟）

| 选 | 仓名 | URL 形态 | 评 |
|---|------|---------|----|
| **A** ⭐ | **iaap-monad** | `https://github.com/jackyjinggit/iaap-monad` | 简短 / 命中"项目-链"组合 / 答辩时好念 |
| B | agent-trust-engine | `https://github.com/jackyjinggit/agent-trust-engine` | 项目叙事名 / 与 README §"为什么这件事重要" 段对得上 / 略长 |
| C | metropolis-submission | `https://github.com/jackyjinggit/metropolis-submission` | 投递感 / 缺 IAAP 锚 / 通用但无特色 |

**陆沉力荐 A = iaap-monad**——短、上口、链+项目关键词、Track 04 评审一眼看出来意。

---

## 仓初始化命令（蒋平操作）

任选一种（蒋平据实选）：

```bash
# 方案 A：gh CLI + 已有 GH auth
gh repo create jackyjinggit/iaap-monad --public --description "IAAP Monad Adapter — Metropolis hackathon" --add-readme=false --clone=false

# 方案 B：纯 GitHub 网页
# 浏览器打开 https://github.com/new
# Repository name: iaap-monad（或 B/C 选定的名字）
# Description: IAAP Monad Adapter — Metropolis hackathon
# Initialize: 都不要勾 (no README, no .gitignore, no license)
# 选 Public → Create repository
```

---

## 陆沉拿到仓地址后的推送清单

蒋平把仓地址（`https://github.com/jackyjinggit/iaap-monad`）发我之后：

1. 我把 6 件草稿 + Hardhat 骨架 + 链下前端 代码 clone 到 `/tmp/iaap-monad-staging`
2. 出 7 个 `git` 命令给蒋平（你 `git push`，陆沉不碰凭证）
3. 你跑完：

```bash
cd /c/research_workspace/iaap-monad-staging   # 我建好工作树
git remote add origin https://github.com/jackyjinggit/iaap-monad.git
git branch -M main
git push -u origin main
```

4. 推送完后我把"Live product URL"链接到 `https://jackyjinggit.github.io/iaap-monad/`（GitHub Pages）

---

## 陆沉同步准备的（不等蒋平）

- `08_Hardhat_Project_Skeleton.md`（package.json / hardhat.config.js / deploy script）
- `09_Frontend_FlagToMonad.html`（detect + flag 按钮 + 钱包接）
- `10_Deploy_MonadTestnet.md`（step-by-step 部署说明）

**陆沉不等蒋平凭据，反向推进**——蒋平挑 1 仓名 = 我立即把仓代码成型。

---

## 蒋平的 3 个拍

1. **仓名 A / B / C？**（陆沉荐 A）
2. **填 Description v0.2 的 a / b / c 哪一版？**（陆沉荐 b）
3. **推送方式**：蒋平自己 `git push`（推荐）还是陆沉出 PR 草稿给蒋平审后再 push？

*等蒋平 3 个拍·陆沉继续推进*
