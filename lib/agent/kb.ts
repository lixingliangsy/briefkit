import type { KbEntry } from "../support-kit/types";
export type { KbEntry };

export const KB: KbEntry[] = [
  {
    id: "what",
    title: "What BriefKit does",
    keywords: ["BriefKit", "briefkit", "what", "product", "about", "GEO-ready content briefs from any keyword or URL"],
    body: "GEO-ready content briefs from any keyword or URL. BriefKit turns a topic or competitor URL into an SEO + GEO content brief — outline, target questions, sources to cite, and an AI-answer hook for the ChatGPT/Perplexity era.",
    source: "BriefKit product definition",
    tags: [],
  },
  {
    id: "features",
    title: "BriefKit features",
    keywords: ["features", "feature", "can", "does", "Outline + H2/H3 structure", "People-also-ask questions", "Sources to cite (authority)", "GEO answer hook for AI engines"],
    body: "BriefKit includes: Outline + H2/H3 structure; People-also-ask questions; Sources to cite (authority); GEO answer hook for AI engines. It does not add capabilities that are not listed here.",
    source: "BriefKit feature list",
    tags: [],
  },
  {
    id: "pricing",
    title: "BriefKit pricing",
    keywords: ["price", "pricing", "plan", "cost", "billing", "subscription", "monthly", "yearly"],
    body: "Listed prices for BriefKit: $29/month and $290/year. Checkout uses the in-app checkout route. This assistant cannot change a subscription or issue a refund.",
    source: "BriefKit pricing fields",
    tags: [],
  },
  {
    id: "howto",
    title: "How to use BriefKit",
    keywords: ["how", "start", "use", "tool", "run", "Generate your content brief"],
    body: "Open BriefKit and use Generate your content brief. The form asks for: Topic / Keyword; Competitor URL (optional); Target audience; Brief depth.",
    source: "BriefKit tool fields",
    tags: [],
  },
  {
    id: "faq-1",
    title: "What is BriefKit?",
    keywords: ["What", "is", "BriefKit?"],
    body: "A brief tool that turns a keyword or URL into outline, PAA questions, sources, and a GEO answer hook.",
    source: "BriefKit FAQ",
    tags: [],
  },
  {
    id: "faq-2",
    title: "What is in the brief?",
    keywords: ["What", "is", "in", "the", "brief?"],
    body: "H2/H3 outline, people-also-ask questions, authority sources, and an AI-answer hook.",
    source: "BriefKit FAQ",
    tags: [],
  },
  {
    id: "faq-3",
    title: "How does it help GEO?",
    keywords: ["How", "does", "it", "help", "GEO?"],
    body: "It structures content to be citable by answer engines, not only ranked in classic search.",
    source: "BriefKit FAQ",
    tags: [],
  },
  {
    id: "honesty",
    title: "What this assistant will not claim",
    keywords: ["legal", "advice", "guarantee", "demo", "human", "refund", "support"],
    body: "Answers about BriefKit are decision support only, not legal, tax, accessibility-certification, or compliance sign-off. This assistant does not invent integrations, SSO, CSV export, or Slack connections unless they are already in the product description. If live AI is unavailable, the product must not pretend a demo result is live. Say you want a human and leave an email if you need a person.",
    source: "BriefKit support policy",
    tags: ["compliance"],
  },
];

function normalize(s: string): string {
  return (s || "").toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ");
}
function toWords(s: string): string[] {
  return normalize(s).split(/\s+/).map((w) => w.trim()).filter(Boolean);
}
function cjkBigrams(s: string): string[] {
  const grams: string[] = [];
  const han = /[\u4e00-\u9fff]/;
  for (const w of toWords(s)) {
    if (han.test(w) && w.length >= 2) {
      for (let i = 0; i < w.length - 1; i++) grams.push(w.slice(i, i + 2));
    }
  }
  return grams;
}
function scoreEntry(entry: KbEntry, query: string): number {
  const q = normalize(query);
  const qWords = new Set(toWords(q));
  const qGrams = new Set(cjkBigrams(q));
  let s = 0;
  for (const kw of entry.keywords) {
    const k = kw.toLowerCase();
    if (q.includes(k)) s += 3;
  }
  for (const tw of toWords(entry.title)) {
    if (qWords.has(tw)) s += 2;
  }
  const idx = normalize(entry.keywords.join(" ") + " " + entry.title + " " + entry.body.slice(0, 400));
  for (const g of qGrams) if (idx.includes(g)) s += 0.5;
  return s;
}

export interface RetrieveResult {
  entries: KbEntry[];
  topScore: number;
}

export function retrieve(query: string, topK = 4, entries: KbEntry[] = KB): RetrieveResult {
  const scored = entries
    .map((e) => ({ e, s: scoreEntry(e, query) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, topK);
  return { entries: scored.map((x) => x.e), topScore: scored.length ? scored[0].s : 0 };
}

export function isComplianceRelated(entries: KbEntry[]): boolean {
  return entries.some((e) => e.tags.includes("compliance"));
}
