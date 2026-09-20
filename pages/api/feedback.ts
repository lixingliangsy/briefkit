import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const body = (req.body || {}) as {
      runId: string
      type: 'thumbs_up' | 'thumbs_down' | 'correction'
      comment?: string
      approved?: boolean
    }

    if (!body.runId) {
      return res.status(400).json({ error: 'runId is required', code: 'MISSING_RUN_ID' })
    }

    const feedbackDir = path.join(process.cwd(), '.data', 'feedback')
    if (!fs.existsSync(feedbackDir)) fs.mkdirSync(feedbackDir, { recursive: true })

    const entry = {
      runId: body.runId,
      type: body.type,
      comment: body.comment || '',
      approved: body.approved || false,
      createdAt: new Date().toISOString(),
    }

    const p = path.join(feedbackDir, 'briefkit.jsonl')
    fs.appendFileSync(p, JSON.stringify(entry) + '\n', 'utf8')

    return res.status(201).json({ ok: true, message: 'Feedback saved' })

  } catch (e: any) {
    return res.status(500).json({ error: 'Failed to save feedback: ' + (e?.message || 'unknown error'), code: 'FEEDBACK_SAVE_FAILED' })
  }
}