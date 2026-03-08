import { useState } from 'react'
import { useScore } from '../store/ScoreContext'
import { useCurrentStats } from '../hooks/useCurrentStats'

export default function Footer() {
  const { dispatch } = useScore()
  const { totalShots } = useCurrentStats()
  const [confirmReset, setConfirmReset] = useState(false)

  function handleSaveSet() {
    if (totalShots === 0) return
    dispatch({ type: 'SAVE_SET' })
  }

  function handleReset() {
    if (!confirmReset) {
      setConfirmReset(true)
      setTimeout(() => setConfirmReset(false), 3000)
      return
    }
    dispatch({ type: 'RESET_ALL' })
    setConfirmReset(false)
  }

  return (
    <footer className="flex-none bg-slate-800 border-t border-slate-700 px-3 py-3">
      <div className="flex gap-3">
        {/* Save Set */}
        <button
          type="button"
          onClick={handleSaveSet}
          disabled={totalShots === 0}
          className={`
            flex-1 py-3 rounded-xl font-bold text-base transition-colors
            ${totalShots > 0
              ? 'bg-cyan-600 text-white active:bg-cyan-500'
              : 'bg-slate-700 text-slate-500 cursor-default'
            }
          `}
        >
          + Set speichern
        </button>

        {/* Reset */}
        <button
          type="button"
          onClick={handleReset}
          className={`
            px-5 py-3 rounded-xl font-bold text-base transition-colors
            ${confirmReset
              ? 'bg-red-600 text-white active:bg-red-500'
              : 'bg-slate-700 text-slate-400 active:bg-slate-600'
            }
          `}
        >
          {confirmReset ? 'Sicher?' : 'Reset'}
        </button>
      </div>
    </footer>
  )
}
