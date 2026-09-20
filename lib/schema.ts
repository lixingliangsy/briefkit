import type { StepId } from './pipeline'

export type RuleCategory = 'audience' | 'objective' | 'message' | 'tone' | 'structure' | 'length' | 'seo' | 'cta' | 'constraints' | 'context' | 'workflow'

export interface RuleResult {
  ruleId: string
  name: string
  passed: boolean
  message: string
  category: RuleCategory
  severity: 'low' | 'medium' | 'high'
}

export interface BriefOutput {
  title: string
  audience: string
  depth: 'Quick' | 'Standard' | 'Deep'
  hook: string
}

export interface OutlineOutput {
  sections: Array<{
    h2: string
    h3?: string[]
    purpose: string
  }>
  questions: string[]
  sources: Array<{
    title: string
    url?: string
    type: 'official' | 'comparison' | 'user-review' | 'research'
  }>
}

export interface DraftQaOutput {
  draft: string
  quality_score: number
  issues: Array<{
    type: 'length' | 'readability' | 'seo' | 'tone' | 'structure'
    severity: 'low' | 'medium' | 'high'
    message: string
    suggestion: string
  }>
  improvements: string[]
}

export interface FeedbackInput {
  runId: string
  type: 'thumbs_up' | 'thumbs_down' | 'correction'
  comment?: string
  approved?: boolean
}

export const STEP_IDS: StepId[] = ['brief', 'outline', 'draft_qa', 'human_confirm']

export function isValidStep(v: unknown): v is StepId {
  return v === 'brief' || v === 'outline' || v === 'draft_qa' || v === 'human_confirm'
}

export function parseFeedback(body: unknown): FeedbackInput {
  const b = (body || {}) as Record<string, unknown>
  const runId = typeof b.runId === 'string' ? b.runId.trim() : ''
  if (!runId) {
    throw new Error('runId is required')
  }
  const type = b.type
  if (type !== 'thumbs_up' && type !== 'thumbs_down' && type !== 'correction') {
    throw new Error('type must be thumbs_up, thumbs_down, or correction')
  }
  const comment = typeof b.comment === 'string' ? b.comment : undefined
  const approved = typeof b.approved === 'boolean' ? b.approved : undefined
  return { runId, type, comment, approved }
}

// --- GEO JSON-LD helpers (server-side Head injection) ---
export interface FaqItem {
  question: string
  answer: string
}

export interface HowToStep {
  name: string
  text: string
}

export function buildFaqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.answer,
      },
    })),
  }
}

export function buildHowToJsonLd(name: string, steps: HowToStep[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  }
}
