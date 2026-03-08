import { useCurrentStats } from '../hooks/useCurrentStats'
import { useScore } from '../store/ScoreContext'

/*
 * VORHERIGE DIMENSIONIERUNG (zum Zurücksetzen):
 * - Stats-Bar: py-4 px-3 gap-2
 * - Icon: text-4xl
 * - Wert: text-5xl
 * - Label: text-sm
 * - Summenleiste: px-4 py-3 text-2xl, Summe text-3xl
 * - Kachel-Label: text-[96px], Count: text-[72px], -1: text-[48px]
 */

export default function Header() {
  const { totalShots, totalRings, average } = useCurrentStats()
  const { state } = useScore()
  const sets = state.savedSets

  // Grand total across all saved sets + current
  const savedTotal = sets.reduce((s, set) => s + set.totalRings, 0)
  const grandTotal = savedTotal + totalRings
  const savedShots = sets.reduce((s, set) => s + set.totalShots, 0)
  const grandShots = savedShots + totalShots

  // Farbe für Treffer-Anzeige
  const shotColor =
    totalShots > 20
      ? 'text-red-500'
      : totalShots === 20
        ? 'text-yellow-400'
        : 'text-white'

  return (
    <header className="flex-none bg-slate-800 border-b border-slate-700">
      {/* Stats bar – um 30% reduziert */}
      <div className="grid grid-cols-3 text-center py-2 px-3 gap-2">
        <StatBox
          icon="🎯"
          label="Treffer"
          value={totalShots.toString()}
          colorClass={shotColor}
        />
        <StatBox
          icon="◎"
          label="Ringe"
          value={totalRings.toString()}
        />
        <StatBox
          icon="ø"
          label="Schnitt"
          value={average.toFixed(2)}
        />
      </div>

      {/* Summenleiste – immer sichtbar */}
      <div className="bg-slate-900/50 px-4 py-3 text-center text-2xl border-t border-slate-700">
        {sets.length > 0 ? (
          <>
            <span className="text-slate-400">
              {sets.map((s) => s.totalRings).join(' + ')}
              {totalRings > 0 && ` + ${totalRings}`}
              {' = '}
            </span>
            <span className="text-cyan-400 font-bold text-3xl">
              {grandTotal}
            </span>
            <span className="text-slate-500 ml-2 text-xl">
              ({grandShots} Schuss)
            </span>
          </>
        ) : (
          <span className="text-slate-600">Noch keine Sets gespeichert</span>
        )}
      </div>
    </header>
  )
}

function StatBox({
  icon,
  label,
  value,
  colorClass,
}: {
  icon: string
  label: string
  value: string
  colorClass?: string
}) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl leading-none">{icon}</span>
      <span className={`text-4xl font-bold tabular-nums ${colorClass ?? 'text-white'}`}>
        {value}
      </span>
      <span className="text-xs text-slate-400 uppercase tracking-wider">
        {label}
      </span>
    </div>
  )
}
