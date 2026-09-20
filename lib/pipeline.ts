import fs from 'fs'
import path from 'path'

export type StepId = 'brief' | 'outline' | 'draft_qa' | 'human_confirm'

export type RunStatus = 'running' | 'awaiting_confirm' | 'done' | 'failed'

export interface RunState {
  runId: string
  step: StepId
  inputs: Record<string, string>
  artifacts: Record<string, unknown>
  status: RunStatus
  createdAt: string
  updatedAt: string
}

export const STEP_ORDER: StepId[] = ['brief', 'outline', 'draft_qa', 'human_confirm']
export const STEP_LABELS: Record<StepId, string> = {
  brief: "Step 1/4 \u00b7 Topic / URL brief",
  outline: "Step 2/4 \u00b7 Outline H2/H3",
  draft_qa: "Step 3/4 \u00b7 PAA + GEO hook",
  human_confirm: "Step 4/4 \u00b7 Confirm brief",
}
export function getStepLabel(step: StepId): string { return STEP_LABELS[step] }
export function completeRun(state: RunState, artifacts: Record<string, unknown> = {}): RunState {
  return { ...finalizeRun(state), artifacts: { ...state.artifacts, ...artifacts } }
}

export function getNextStep(current: StepId): StepId | null {
  const idx = STEP_ORDER.indexOf(current)
  return idx < STEP_ORDER.length - 1 ? STEP_ORDER[idx + 1] : null
}

export function isValidTransition(current: StepId, target: StepId): boolean {
  const currentIdx = STEP_ORDER.indexOf(current)
  const targetIdx = STEP_ORDER.indexOf(target)
  if (currentIdx === -1 || targetIdx === -1) return false
  return targetIdx === currentIdx + 1
}

export function canAdvance(state: RunState): boolean {
  if (state.status === 'failed' || state.status === 'done') return false
  return getNextStep(state.step) !== null
}

export function nextStep(state: RunState, action: 'advance' | 'confirm'): RunState {
  if (state.status === 'failed') {
    throw new Error('Invalid step transition: failed run cannot advance')
  }
  if (state.status === 'done') {
    throw new Error('Invalid step transition: completed run cannot advance')
  }

  let next: StepId
  if (action === 'confirm') {
    if (state.status !== 'awaiting_confirm') {
      throw new Error('Invalid step transition: confirm requires awaiting_confirm status')
    }
    next = state.step
  } else {
    const n = getNextStep(state.step)
    if (!n) {
      throw new Error('Invalid step transition: no next step available')
    }
    next = n
  }

  const now = new Date().toISOString()
  return {
    ...state,
    step: next,
    status: next === 'human_confirm' ? 'awaiting_confirm' : 'running',
    updatedAt: now,
  }
}

export function finalizeRun(state: RunState): RunState {
  return {
    ...state,
    status: 'done',
    updatedAt: new Date().toISOString(),
  }
}

export function createRun(inputs: Record<string, string>): RunState {
  const now = new Date().toISOString()
  return {
    runId: crypto.randomUUID(),
    step: 'brief',
    inputs,
    artifacts: {},
    status: 'running',
    createdAt: now,
    updatedAt: now,
  }
}

function runsDir(): string {
  const dir = path.join(process.cwd(), '.data', 'runs')
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  return dir
}

export function saveRun(state: RunState): void {
  const p = path.join(runsDir(), `${state.runId}.json`)
  try { fs.writeFileSync(p, JSON.stringify(state, null, 2), 'utf8') } catch { /* serverless */ }
}

export function loadRun(runId: string): RunState | null {
  const p = path.join(runsDir(), `${runId}.json`)
  try {
    const raw = fs.readFileSync(p, 'utf8')
    return JSON.parse(raw) as RunState
  } catch {
    return null
  }
}

export function listRuns(limit: number = 50): RunState[] {
  const dir = runsDir()
  try {
    const files = fs.readdirSync(dir)
      .filter(f => f.endsWith('.json'))
      .sort((a, b) => b.localeCompare(a))
      .slice(0, limit)
    
    return files.map(f => {
      const p = path.join(dir, f)
      const raw = fs.readFileSync(p, 'utf8')
      return JSON.parse(raw) as RunState
    })
  } catch {
    return []
  }
}