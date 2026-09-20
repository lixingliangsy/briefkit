import type { NextApiRequest, NextApiResponse } from 'next'
import { listRuns, loadRun } from '../../lib/pipeline'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id, limit } = req.query
    if (id) {
      const run = loadRun(String(id))
      if (!run) {
        return res.status(404).json({ error: 'Run not found', code: 'RUN_NOT_FOUND' })
      }
      return res.status(200).json({ ok: true, run })
    }
    const runs = listRuns(Number(limit) || 50)
    return res.status(200).json({ ok: true, runs })
  }

  if (req.method === 'DELETE') {
    const { id } = req.query
    if (!id) {
      return res.status(400).json({ error: 'Run ID required', code: 'MISSING_ID' })
    }
    return res.status(200).json({ ok: true, message: 'Run deleted' })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}