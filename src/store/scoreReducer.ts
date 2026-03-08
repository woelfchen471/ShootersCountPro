import type { Hit, Session, ShotSet } from '../types'

// ── Actions ──────────────────────────────────────────────────────────

export type ScoreAction =
  | { type: 'INCREMENT'; ring: number; isX: boolean }
  | { type: 'DECREMENT'; ring: number; isX: boolean }
  | { type: 'SAVE_SET' }
  | { type: 'DELETE_SET'; setId: string }
  | { type: 'RESET_CURRENT' }
  | { type: 'RESET_ALL' }
  | { type: 'LOAD_SESSION'; session: Session }

// ── Helpers ──────────────────────────────────────────────────────────

function createHit(ring: number, isX: boolean): Hit {
  return { ring, isX, timestamp: Date.now() }
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function buildSet(hits: Hit[]): ShotSet {
  const totalRings = hits.reduce((sum, h) => sum + h.ring, 0)
  const totalShots = hits.length
  const average = totalShots > 0 ? totalRings / totalShots : 0
  return {
    id: generateId(),
    hits: [...hits],
    totalRings,
    totalShots,
    average,
    createdAt: Date.now(),
  }
}

// ── Initial State ────────────────────────────────────────────────────

export const initialSession: Session = {
  currentHits: [],
  savedSets: [],
}

// ── Reducer ──────────────────────────────────────────────────────────

export function scoreReducer(
  state: Session,
  action: ScoreAction,
): Session {
  switch (action.type) {
    case 'INCREMENT': {
      const hit = createHit(action.ring, action.isX)
      return { ...state, currentHits: [...state.currentHits, hit] }
    }

    case 'DECREMENT': {
      // Remove the LAST hit that matches ring + isX
      const idx = [...state.currentHits]
        .reverse()
        .findIndex((h) => h.ring === action.ring && h.isX === action.isX)
      if (idx === -1) return state
      const realIdx = state.currentHits.length - 1 - idx
      const next = [...state.currentHits]
      next.splice(realIdx, 1)
      return { ...state, currentHits: next }
    }

    case 'SAVE_SET': {
      if (state.currentHits.length === 0) return state
      const set = buildSet(state.currentHits)
      return {
        currentHits: [],
        savedSets: [...state.savedSets, set],
      }
    }

    case 'DELETE_SET': {
      return {
        ...state,
        savedSets: state.savedSets.filter((s) => s.id !== action.setId),
      }
    }

    case 'RESET_CURRENT':
      return { ...state, currentHits: [] }

    case 'RESET_ALL':
      return { ...initialSession }

    case 'LOAD_SESSION':
      return action.session

    default:
      return state
  }
}
