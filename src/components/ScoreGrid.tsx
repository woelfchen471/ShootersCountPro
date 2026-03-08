import { useState } from 'react'
import { useScore } from '../store/ScoreContext'
import { useCurrentStats } from '../hooks/useCurrentStats'
import { RING_VALUES } from '../types'
import RingButton from './RingButton'

export default function ScoreGrid() {
  const { dispatch } = useScore()
  const { ringCounts, totalShots } = useCurrentStats()
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
    <div className="flex-1 min-h-0 px-1.5 py-1.5">
      {/* 2 Spalten, 7 Reihen – füllt den gesamten verfügbaren Platz */}
      <div className="grid grid-cols-2 grid-rows-7 gap-1.5 h-full">
        {RING_VALUES.map((ring) => (
          <RingButton
            key={ring}
            label={ring.toString()}
            count={ringCounts[ring]}
            onIncrement={() =>
              dispatch({ type: 'INCREMENT', ring, isX: false })
            }
            onDecrement={() =>
              dispatch({ type: 'DECREMENT', ring, isX: false })
            }
          />
        ))}

        {/* X-Button = aktuelles Set löschen */}
        <button
          type="button"
          onClick={() => {
            if (totalShots > 0) dispatch({ type: 'RESET_CURRENT' })
          }}
          className={`
            w-full h-full rounded-lg flex items-center justify-center
            transition-colors active:scale-95
            ${totalShots > 0
              ? 'bg-red-900/50 border-2 border-red-500 text-red-400 active:bg-red-800'
              : 'bg-slate-800 border border-slate-700 text-slate-600 cursor-default'
            }
          `}
        >
          <span className="text-[57px] font-semibold">X</span>
        </button>

        {/* Set speichern */}
        <button
          type="button"
          onClick={handleSaveSet}
          disabled={totalShots === 0}
          className={`
            w-full h-full rounded-lg font-bold text-lg
            flex items-center justify-center
            transition-colors active:scale-95
            ${totalShots > 0
              ? 'bg-cyan-600 text-white active:bg-cyan-500'
              : 'bg-slate-700 text-slate-500 cursor-default'
            }
          `}
        >
          + Set speichern
        </button>

        {/* Reset Sitzung */}
        <button
          type="button"
          onClick={handleReset}
          className={`
            w-full h-full rounded-lg font-bold text-lg
            flex items-center justify-center
            transition-colors active:scale-95
            ${confirmReset
              ? 'bg-red-600 text-white active:bg-red-500'
              : 'bg-slate-700 text-slate-400 active:bg-slate-600'
            }
          `}
        >
          {confirmReset ? 'Sicher?' : 'Reset Sitzung'}
        </button>
      </div>
    </div>
  )
}
