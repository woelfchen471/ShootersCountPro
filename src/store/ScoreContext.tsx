import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
  type Dispatch,
} from 'react'
import type { Session } from '../types'
import {
  scoreReducer,
  initialSession,
  type ScoreAction,
} from './scoreReducer'

const STORAGE_KEY = 'shooters-count-session'

// ── Context ──────────────────────────────────────────────────────────

interface ScoreContextValue {
  state: Session
  dispatch: Dispatch<ScoreAction>
}

const ScoreContext = createContext<ScoreContextValue | null>(null)

// ── Provider ─────────────────────────────────────────────────────────

function loadFromStorage(): Session {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as Session
  } catch {
    // corrupt data → start fresh
  }
  return initialSession
}

export function ScoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(scoreReducer, null, loadFromStorage)

  // Persist every change to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  return (
    <ScoreContext.Provider value={{ state, dispatch }}>
      {children}
    </ScoreContext.Provider>
  )
}

// ── Hook ─────────────────────────────────────────────────────────────

export function useScore(): ScoreContextValue {
  const ctx = useContext(ScoreContext)
  if (!ctx) throw new Error('useScore must be used within <ScoreProvider>')
  return ctx
}
