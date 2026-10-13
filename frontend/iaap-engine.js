// SPDX-License-Identifier: Apache-2.0
/*
 * IAAP Engine v0.1 (offline, browser-side, no backend).
 *
 * Five-stage detection:
 *   s1: flattery        — excessive praise without context
 *   s2: halo effect     — affiliation-based leniency / over-trust
 *   s3: 装腔            — filler fluff ("leverage synergies", "deep dive", etc.)
 *   s4: sycophancy      — explicit agreement regardless of input
 *   s5: truth suppression — evading / omitting direct answers
 *
 * Output:
 *   {
 *     severity: 0..5,            // discrete, sent on chain
 *     idScore : 0..1,             // continuous, shown in UI
 *     signals : [string, ...],
 *     stageContributions: { s1: 0..1, s2: 0..1, ... }
 *   }
 *
 * This is a simplified v0.1 stub for the Metropolis demo. The full
 * production engine lives at TrueFellow/iaap_checker.html and uses
 * a richer rule grammar (~120 patterns across 5 stages). For the hackathon
 * we keep the contract invocation clean and the rules obvious.
 */
(function (root) {
  "use strict";

  // ──────────────────────────────────────────
  //  Tiny lexicon (illustrative; production has 5× this density)
  // ──────────────────────────────────────────
  const FLATTERY = [
    /\b(great|excellent|brilliant|amazing|awesome|outstanding|perfect|fantastic|wonderful|impressive)\b/i,
    /你(真|真真)?(太|好|强|厉害|棒|优秀)/,
    /非常(棒|好|强|赞|完美|出色)/,
    /\bI('| a)m (so |really )?(impressed|inspired|amazed|excited|thrilled)/i
  ];
  const HALO = [
    /\bI (trust|rely on|believe in) you(\s|$|[,.])/i,
    /你(说|做|想)什么都(对|好|行|不会错)/,
    /您的.{0,6}都是(对的|好的|完美的)/
  ];
  const ZHUANGQIANG = [  // 装腔
    /leverage (the )?synergies?/i,
    /deep dive( into)?/i,
    /paradigm shift/i,
    /holistic(ally)? (approach|framework|perspective)/i,
    /circle back( on)?/i,
    /move the needle/i,
    /(底层|顶层|赋能|抓手|闭环|链路|颗粒度|方法论|认知|心法|抓手|底层逻辑)/
  ];
  const SYCOPHANCY = [
    /\b(absolutely|definitely|exactly|of course|sure thing),?\s*I (agree|concur)/i,
    /您说(得|的)(对|没错|对极了|很对|很好|太对了)/,
    /完全(同意|赞同|同意您的?看法|认可您的?观点)/
  ];
  const TRUTH_SUPPRESSION = [
    /\bI (can('|no)t (really )?(say|comment|discuss)|would( not|n't) be able to (say|comment))/i,
    /这(个|件事)?我(也)?(不太|无法|不能)(清楚|回答|判断|确认|了解)/,
    /(不便|无法|难以)(评论|回答|置评)/
  ];

  // ──────────────────────────────────────────
  //  Stage scorers
  // ──────────────────────────────────────────
  function stageScore(text, patterns) {
    let hits = 0;
    const matched = [];
    for (const p of patterns) {
      const m = text.match(p);
      if (m) { hits += 1; matched.push(m[0]); }
    }
    // Stage contribution: 0..1, weighted by hit density vs text length.
    const density = hits / Math.max(20, text.length / 60);
    return {
      raw: Math.min(1, density * 1.4),
      matched
    };
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  // ──────────────────────────────────────────
  //  Public API
  // ──────────────────────────────────────────
  const IAAPEngine = {
    detect(text) {
      const s1 = stageScore(text, FLATTERY);
      const s2 = stageScore(text, HALO);
      const s3 = stageScore(text, ZHUANGQIANG);
      const s4 = stageScore(text, SYCOPHANCY);
      const s5 = stageScore(text, TRUTH_SUPPRESSION);

      const contributions = {
        s1_flattery:    s1.raw,
        s2_halo:        s2.raw,
        s3_zhuangqiang: s3.raw,
        s4_sycophancy:  s4.raw,
        s5_truth:       s5.raw
      };

      // Composite ID-Score = max over 5 stages × weight on stage coverage.
      const raw = Math.max(s1.raw, s2.raw, s3.raw, s4.raw, s5.raw);
      const coveredStages = [s1, s2, s3, s4, s5].filter(s => s.raw > 0).length;
      const coverageBoost = 0.10 * (coveredStages - 1);  // multi-stage co-occurrence bonus
      const idScore = Math.min(1, raw + Math.max(0, coverageBoost));

      // Discrete severity: round idScore × 5 → clamp [0,5].
      const severity = Math.max(0, Math.min(5, Math.round(idScore * 5)));

      // Compose human-readable signals list.
      const signals = [];
      if (s1.matched.length) signals.push(`flattery: ${s1.matched.map(escapeHtml).slice(0,3).join(" / ")}`);
      if (s2.matched.length) signals.push(`halo: ${s2.matched.map(escapeHtml).slice(0,3).join(" / ")}`);
      if (s3.matched.length) signals.push(`装腔: ${s3.matched.map(escapeHtml).slice(0,3).join(" / ")}`);
      if (s4.matched.length) signals.push(`sycophancy: ${s4.matched.map(escapeHtml).slice(0,3).join(" / ")}`);
      if (s5.matched.length) signals.push(`truth suppression: ${s5.matched.map(escapeHtml).slice(0,3).join(" / ")}`);

      return {
        severity,
        idScore,
        signals,
        stageContributions: contributions
      };
    }
  };

  // Export for browser / module both.
  if (typeof module !== "undefined" && module.exports) {
    module.exports = IAAPEngine;
  } else {
    root.IAAPEngine = IAAPEngine;
  }
})(typeof window !== "undefined" ? window : globalThis);
