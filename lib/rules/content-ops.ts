/**
 * Vertical moat for briefkit: deterministic content brief quality rules.
 * These run WITHOUT the LLM (rule-based) and tag the generated brief, so the
 * output is reproducible and not just chat. Every rule has a stable ID.
 * Based on content strategy best practices, workflow optimization, and task decomposition.
 *
 * Refs (also in SOURCES.md):
 * - https://blog.hubspot.com/marketing/content-brief
 * - https://www.siteimprove.com/blog/content-briefs-best-practices/
 * - https://themarketingjuice.com/content-brief-example/
 */
import type { RuleCategory, RuleResult } from '../schema'

export const RULESET_VERSION = '1.1.0'

/** Public references cited by rule remediation / Studio. */
export const RULE_REFS = [
  'https://blog.hubspot.com/marketing/content-brief',
  'https://www.siteimprove.com/blog/content-briefs-best-practices/',
  'https://themarketingjuice.com/content-brief-example/',
] as const

export interface Rule {
  ruleId: string
  name: string
  category: RuleCategory
  severity: 'low' | 'medium' | 'high'
  check: (content: string, context?: Record<string, string>) => RuleResult
}

const rules: Rule[] = [
  {
    ruleId: 'BK-A01',
    name: 'Audience clearly defined',
    category: 'audience',
    severity: 'high',
    check: (content) => {
      const hasAudience = /(target\s+audience|audience|for\s+(you|developers|founders|teams|business|users)|designed\s+for|built\s+for|ideal\s+customer)/i.test(content)
      const passed = hasAudience
      return {
        ruleId: 'BK-A01',
        name: 'Audience clearly defined',
        category: 'audience',
        severity: 'high',
        passed,
        message: passed ? 'Target audience clearly identified.' : 'Missing target audience definition.',
      }
    },
  },
  {
    ruleId: 'BK-A02',
    name: 'Objective stated',
    category: 'objective',
    severity: 'high',
    check: (content) => {
      const hasObjective = /(goal|objective|purpose|outcome|deliverable|aim|what\s+we\s+want|achieve)/i.test(content)
      const passed = hasObjective
      return {
        ruleId: 'BK-A02',
        name: 'Objective stated',
        category: 'objective',
        severity: 'high',
        passed,
        message: passed ? 'Clear objective/outcome defined.' : 'Missing objective statement.',
      }
    },
  },
  {
    ruleId: 'BK-A03',
    name: 'Key message(s) present',
    category: 'message',
    severity: 'high',
    check: (content) => {
      const hasKeyMessage = /(key\s+message|core\s+message|main\s+point|unique\s+value|differentiator|value\s+proposition)/i.test(content)
      const passed = hasKeyMessage
      return {
        ruleId: 'BK-A03',
        name: 'Key message(s) present',
        category: 'message',
        severity: 'high',
        passed,
        message: passed ? 'Key messages/value proposition defined.' : 'Missing key messages.',
      }
    },
  },
  {
    ruleId: 'BK-A04',
    name: 'Tone/style guidance',
    category: 'tone',
    severity: 'medium',
    check: (content) => {
      const hasTone = /(tone|style|voice|formal|informal|friendly|professional|conversational|authoritative)/i.test(content)
      const passed = hasTone
      return {
        ruleId: 'BK-A04',
        name: 'Tone/style guidance',
        category: 'tone',
        severity: 'medium',
        passed,
        message: passed ? 'Tone and style guidance included.' : 'No tone/style guidance provided.',
      }
    },
  },
  {
    ruleId: 'BK-A05',
    name: 'Structure/outline present',
    category: 'structure',
    severity: 'high',
    check: (content) => {
      const hasStructure = /(outline|structure|section|chapter|table\s+of\s+contents|h2|h3|section\s+\d+)/i.test(content)
      const passed = hasStructure
      return {
        ruleId: 'BK-A05',
        name: 'Structure/outline present',
        category: 'structure',
        severity: 'high',
        passed,
        message: passed ? 'Content structure/outline provided.' : 'Missing content structure/outline.',
      }
    },
  },
  {
    ruleId: 'BK-A06',
    name: 'Word count specified',
    category: 'length',
    severity: 'medium',
    check: (content) => {
      const hasWordCount = /(\d+\s*(word|words|character|chars)|length\s*:\s*\d+)/i.test(content)
      const passed = hasWordCount
      return {
        ruleId: 'BK-A06',
        name: 'Word count specified',
        category: 'length',
        severity: 'medium',
        passed,
        message: passed ? 'Target word count specified.' : 'No word count guidance.',
      }
    },
  },
  {
    ruleId: 'BK-A07',
    name: 'Keywords included',
    category: 'seo',
    severity: 'medium',
    check: (content) => {
      const hasKeywords = /(keyword|keywords|search\s+term|SEO|organic)/i.test(content)
      const passed = hasKeywords
      return {
        ruleId: 'BK-A07',
        name: 'Keywords included',
        category: 'seo',
        severity: 'medium',
        passed,
        message: passed ? 'SEO keywords included.' : 'No SEO keywords specified.',
      }
    },
  },
  {
    ruleId: 'BK-A08',
    name: 'Call-to-action defined',
    category: 'cta',
    severity: 'high',
    check: (content) => {
      const hasCta = /(call\s+to\s+action|CTA|next\s+step|what\s+they\s+should\s+do|get\s+started|learn\s+more|download|sign\s+up)/i.test(content)
      const passed = hasCta
      return {
        ruleId: 'BK-A08',
        name: 'Call-to-action defined',
        category: 'cta',
        severity: 'high',
        passed,
        message: passed ? 'Clear call-to-action defined.' : 'Missing call-to-action.',
      }
    },
  },
  {
    ruleId: 'BK-A09',
    name: 'Constraints/limitations',
    category: 'constraints',
    severity: 'medium',
    check: (content) => {
      const hasConstraints = /(constraint|limitation|avoid|do\s+not|don['']t|restriction|requirement)/i.test(content)
      const passed = hasConstraints
      return {
        ruleId: 'BK-A09',
        name: 'Constraints/limitations',
        category: 'constraints',
        severity: 'medium',
        passed,
        message: passed ? 'Constraints and limitations specified.' : 'No constraints or limitations mentioned.',
      }
    },
  },
  {
    ruleId: 'BK-A10',
    name: 'Background/context',
    category: 'context',
    severity: 'medium',
    check: (content) => {
      const hasContext = /(background|context|history|previous|current\s+state|situation|why\s+this\s+matters)/i.test(content)
      const passed = hasContext
      return {
        ruleId: 'BK-A10',
        name: 'Background/context',
        category: 'context',
        severity: 'medium',
        passed,
        message: passed ? 'Background context provided.' : 'Missing background context.',
      }
    },
  },
  {
    ruleId: 'BK-A11',
    name: 'Success metrics',
    category: 'objective',
    severity: 'high',
    check: (content) => {
      const hasMetrics = /(metric|KPI|success|measure|goal|target|ROI|conversion|engagement)/i.test(content)
      const passed = hasMetrics
      return {
        ruleId: 'BK-A11',
        name: 'Success metrics',
        category: 'objective',
        severity: 'high',
        passed,
        message: passed ? 'Success metrics/KPIs defined.' : 'No success metrics specified.',
      }
    },
  },
  {
    ruleId: 'BK-A12',
    name: 'Target platform(s)',
    category: 'context',
    severity: 'medium',
    check: (content) => {
      const hasPlatform = /(platform|channel|medium|website|blog|social\s+media|email|landing\s+page)/i.test(content)
      const passed = hasPlatform
      return {
        ruleId: 'BK-A12',
        name: 'Target platform(s)',
        category: 'context',
        severity: 'medium',
        passed,
        message: passed ? 'Target platforms/channels specified.' : 'No target platform mentioned.',
      }
    },
  },
  {
    ruleId: 'BK-A13',
    name: 'Competitor/reference content',
    category: 'context',
    severity: 'medium',
    check: (content) => {
      const hasReference = /(competitor|reference|example|inspiration|similar\s+content|benchmark)/i.test(content)
      const passed = hasReference
      return {
        ruleId: 'BK-A13',
        name: 'Competitor/reference content',
        category: 'context',
        severity: 'medium',
        passed,
        message: passed ? 'Competitor/reference content mentioned.' : 'No reference content specified.',
      }
    },
  },
  {
    ruleId: 'BK-A14',
    name: 'Deadline/timeline',
    category: 'constraints',
    severity: 'medium',
    check: (content) => {
      const hasDeadline = /(deadline|timeline|due\s+date|when|schedule|timeframe)/i.test(content)
      const passed = hasDeadline
      return {
        ruleId: 'BK-A14',
        name: 'Deadline/timeline',
        category: 'constraints',
        severity: 'medium',
        passed,
        message: passed ? 'Deadline or timeline specified.' : 'No deadline mentioned.',
      }
    },
  },
  {
    ruleId: 'BK-A15',
    name: 'Approval workflow',
    category: 'workflow',
    severity: 'medium',
    check: (content) => {
      const hasWorkflow = /(approval|review|stakeholder|signoff|who\s+approves|process)/i.test(content)
      const passed = hasWorkflow
      return {
        ruleId: 'BK-A15',
        name: 'Approval workflow',
        category: 'workflow',
        severity: 'medium',
        passed,
        message: passed ? 'Approval workflow defined.' : 'No approval process specified.',
      }
    },
  },
]

export function runAllRules(content: string, context?: Record<string, string>): RuleResult[] {
  return rules.map(r => r.check(content, context))
}

export function getRulesByCategory(category: RuleCategory): Rule[] {
  return rules.filter(r => r.category === category)
}

// RAD A09-A11 sources reinforced 2026-07-20 — see ./SOURCES.md
