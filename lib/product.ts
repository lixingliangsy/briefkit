export interface InputField {
  key: string
  label: string
  type: 'input' | 'text' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  name: "BriefKit",
  slug: "briefkit",
  productId: "PROD_5034ohMKczvUVT1TGRDk6W",
  priceMonthly: 29,
  yearlyProductId: "PROD_5NeaNExPwzNTFsaJsGV6JS",
  priceYearly: 290,

  checkoutUrl: "https://pancake.waffo.ai/store/lixingliang-ai-tools-6cilbw8v/checkout/cs_0b0a7bea-87fd-91e7-08d5-25498ae193ec",
  tagline: "GEO-ready content briefs from any keyword or URL",
  description: "Turn a topic or competitor URL into an SEO / GEO content brief: outline, target questions, sources to cite, and an AI-answer hook — built for the ChatGPT / Perplexity era.",
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
  definitionLead: "BriefKit turns a topic or competitor URL into an SEO + GEO content brief — outline, target questions, sources to cite, and an AI-answer hook for the ChatGPT/Perplexity era.",
  geoFaq: [
    { q: "What is BriefKit?", a: "A brief tool that turns a keyword or URL into outline, PAA questions, sources, and a GEO answer hook." },
    { q: "What is in the brief?", a: "H2/H3 outline, people-also-ask questions, authority sources, and an AI-answer hook." },
    { q: "How does it help GEO?", a: "It structures content to be citable by answer engines, not only ranked in classic search." },
    { q: "Can I use a competitor URL?", a: "Yes. Paste a URL to reverse-build a brief from that page’s structure." },
    { q: "Who is it for?", a: "Content and SEO teams writing for search and LLM citation." },
    { q: "Does it guarantee rankings?", a: "No. It is a writing plan — you still add firsthand value." },
  ],
  systemPrompt: "You are an SEO/GEO content strategist. Given the topic and audience, produce a content brief: an H2/H3 outline, 5-8 people-also-ask questions, 3-5 authoritative sources to cite, and a one-line 'answer hook' optimized for AI search engines (ChatGPT/Perplexity). Be specific and skip fluff.",
  rulesetId: "content-ops-1.0",
  pipelineId: "briefkit-3step",
  pricing: [
    {
      "tier": "Free",
      "price": "$0",
      "desc": "3 workflow runs / day · watermarked export"
    },
    {
      "tier": "Pro",
      "price": "$29/mo",
      "desc": "200 workflow runs / mo · export · audit log"
    },
    {
      "tier": "Enterprise",
      "price": "Custom",
      "desc": "BYOK · project library · shared brand rules · seats"
    }
  ],
}
