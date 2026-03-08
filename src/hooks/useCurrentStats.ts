import { useMemo } from 'react'
import type { Hit } from '../types'
import { useScore } from '../store/ScoreContext'

export interface CurrentStats {
  totalShots: number
  totalRings: number
  average: number
  /** Count per ring value (index = ring value, 0-10) */
  ringCounts: number[]
  /** Count of X (inner ten) */
  xCount: number
}

export function useCurrentStats(): CurrentStats {
  const { state } = useScore()

  return useMemo(() => {
    const hits: Hit[] = state.currentHits
    const totalShots = hits.length
    const totalRings = hits.reduce((s, h) => s + h.ring, 0)
    const average = totalShots > 0 ? totalRings / totalShots : 0

    // Count per ring (index 0 = ring 0, index 10 = ring 10)
    const ringCounts = new Array(11).fill(0) as number[]
    let xCount = 0
    for (const h of hits) {
      ringCounts[h.ring]++
      if (h.isX) xCount++
    }

    return { totalShots, totalRings, average, ringCounts, xCount }
  }, [state.currentHits])
}
