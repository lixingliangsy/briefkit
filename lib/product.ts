export interface InputField {
  key: string
  label: string
  type: 'input' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  name: "BriefKit",
  slug: "briefkit",
  tagline: "GEO-ready content briefs from any keyword or URL",
  description: "Turn a topic or competitor URL into an SEO / GEO content brief: outline, target questions, sources to cite, and an AI-answer hook \u2014 built for the ChatGPT / Perplexity era.",
  toolTitle: "Generate your content brief",
  resultLabel: "Your brief",
  ctaLabel: "Generate brief",
  features: [
  "Outline + H2/H3 structure",
  "People-also-ask questions",
  "Sources to cite (authority)",
  "GEO answer hook for AI engines"
],
  inputs: [
  {
    "key": "topic",
    "label": "Topic / Keyword",
    "type": "input",
    "placeholder": "e.g. best password manager for small teams"
  },
  {
    "key": "url",
    "label": "Competitor URL (optional)",
    "type": "input",
    "placeholder": "https://..."
  },
  {
    "key": "audience",
    "label": "Target audience",
    "type": "input",
    "placeholder": "e.g. non-technical SMB owners"
  },
  {
    "key": "depth",
    "label": "Brief depth",
    "type": "select",
    "options": [
      "Quick",
      "Standard",
      "Deep"
    ]
  }
] as InputField[],
  systemPrompt: "You are an SEO/GEO content strategist. Given the topic and audience, produce a content brief: an H2/H3 outline, 5-8 people-also-ask questions, 3-5 authoritative sources to cite, and a one-line 'answer hook' optimized for AI search engines (ChatGPT/Perplexity). Be specific and skip fluff.",
  pricing: [
  {
    "tier": "Free",
    "price": "$0",
    "desc": "3 briefs/month"
  },
  {
    "tier": "Pro",
    "price": "$19/mo",
    "desc": "Unlimited, deep briefs, export"
  },
  {
    "tier": "Team",
    "price": "$49/mo",
    "desc": "Shared workspace, bulk gen"
  }
],
  mock: (inputs: Record<string, string>): string => {
  const t = inputs['topic'] || 'your topic'
  const a = inputs['audience'] || 'your audience'
  const dp = inputs['depth'] || 'Standard'
  return `CONTENT BRIEF — ${t}
Audience: ${a} | Depth: ${dp}

H2/H3 OUTLINE
1. What is ${t}?
   1.1 Why it matters in 2026
   1.2 Who needs it
2. Top options compared
3. How to choose
4. Common mistakes
5. FAQ

PEOPLE-ALSO-ASK
- Is ${t} worth it for small teams?
- What is the cheapest ${t}?
- How do I set up ${t}?

SOURCES TO CITE
- Official vendor docs
- A recent comparison post
- A Reddit/G2 thread for real users

GEO ANSWER HOOK
"${t} is a tool that ... — best for ${a} because ..."

---
(This is a mock brief. Add OPENAI_API_KEY for a full AI-generated brief.)`
}
}
