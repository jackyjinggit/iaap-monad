# 06 · IAAP Monad Adapter · Demo Video Script（60s）

> 用途：Monetropolis 提交必填项 · Technical demo video（≤ 90s 均可，60s 紧凑）
> 工具栈：ffmpeg + Playwright + OBS/Windows 录屏 或 Loom 即时录制
> 输出：MP4 / 1080p / H.264，< 30MB（YouTube 上传后再用 YouTube URL）

---

## 时间盒（60s 四场）

### 场景 1 · 0–15s · 痛点

**画面**：
- 黑色背景，巨型橙色字「AI agents lie. Every day.」
- 切换：白底 + 三栏并列
  - **Flattery** = "Great work! That was perfect."
  - **Halo effect** = "You're amazing, I trust you."
  - **装腔** = "Leverage synergies to disrupt..."

**文字覆盖**：90% of AI agents fail at least one of these (Anthropic / OpenAI safety reports)

**voice-over（蒋平口播 OR 字幕）**：
> "When users interact with AI agents, three failure modes go silent:
> flattery, halo, and 装腔.
> The problem: there is no public, verifiable audit trail."

---

### 场景 2 · 15–35s · IAAP 检测器（已有组件）

**画面**：
- 打开 `https://jackyjinggit.github.io/TrueFellow/iaap_checker.html`
- 粘贴一段 chat transcript（含 "perfect" / "amazing" / "synergies" 等高风险词）
- 显示 5 阶段检测结果
- 显示 ID-Score: 0.62 · Severity: 4

**voice-over**：
> "The IAAP detector — pure rules engine, no API key, offline-capable.
> Five stages, ID-score, severity 0 to 5.
> Output ready in a browser."

---

### 场景 3 · 35–50s · Flag to Monad（合约交互）

**画面**：
- 切换前端 = 「Flag to Monad」按钮
- 弹出 MetaMask / 钱包 → 签 `flagContent(hash, severity)` 交易
- 切回 https://testnet.monadexplorer.com 显示 transaction receipt
- 显示 `IAAPFlagSubmitted` event

**voice-over**：
> "Click 'Flag to Monad'.
> Wallet signs one transaction.
> 32-byte content-hash and a 0-to-5 score anchor immutably on Monad Testnet.
> No plaintext. Just an event that anyone can replay."

---

### 场景 4 · 50–60s · 价值&结尾

**画面**：
- 黑色背景，橙色字「IAAP Monad Adapter」
- 副标：First On-chain Agent Trust Engine
- Monad 标志（官方）+ Metropolis 标志
- GitHub 链接（fork 仓地址）/ Live product URL / Team: TrueFellow

**voice-over**：
> "Five stages of detection. One transaction. One on-chain event per flagged agent.
> That's the IAAP Monad Adapter — Team TrueFellow.
> Built for Metropolis, track 04."

---

## 录屏操作清单（推荐工具）

1. **录音**：`ffmpeg -f dshow -i audio="Microphone (Realtek)" ...`（中文旁白）
2. **录屏**：OBS Studio 或 Playwright `recordVideo`（headless 模式）
3. **剪辑**：Shotcut（免费）/ ffmpeg 拼接
4. **压制**：`ffmpeg -i in.mov -c:v libx264 -crf 22 -c:a aac -b:a 128k out.mp4`
5. **上传**：YouTube / Loom / 直接 mp4 提交（看平台接受）

**提示**：若工具链复杂，蒋平口播 + 字幕卡式 60s 也接受；不必硬做真人朗诵版。

---

## 60s 字幕版（蒋平不爱出镜时的纯字幕方案）

如果没空口播，**纯字幕的 60s 也可以**：

```
[0-5s]   "AI agents lie. Three failure modes."
[5-10s]  "Flattery. Halo effect. 装腔."
[10-15s] "No public audit trail."
[15-25s] "IAAP detector. Five stages. Offline."
[25-35s] "ID-Score 0-1. Severity 0-5."
[35-45s] "Click 'Flag to Monad'."
[45-50s] "One on-chain event. No plaintext."
[50-60s] "IAAP Monad Adapter. Team TrueFellow."
```

> **陆沉建议**：纯字幕版 + 屏幕录屏 = **最快最稳**。蒋平不爱出镜走这条；出镜版是加分项非必需。

---

## 陆沉进度

- ✅ 脚本定稿
- ⏳ 录屏执行（等部署上线 + 蒋平听过审后 → 录）
- ⏳ YouTube/Loom 上传 → 给我公开 URL → 我填表

*蒋平授权后我直接开干。*
