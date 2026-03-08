interface RingButtonProps {
  label: string
  count: number
  onIncrement: () => void
  onDecrement: () => void
  accent?: boolean
}

export default function RingButton({
  label,
  count,
  onIncrement,
  onDecrement,
  accent = false,
}: RingButtonProps) {
  return (
    <div className="h-full select-none">
      <button
        type="button"
        onClick={onIncrement}
        className={`
          w-full h-full rounded-lg flex items-center
          transition-colors active:scale-95 active:brightness-125
          ${accent
            ? 'bg-cyan-900/60 border-2 border-cyan-400 text-cyan-400'
            : 'bg-slate-800 border border-slate-600 text-slate-300'
          }
        `}
      >
        {/* Ringzahl links – zentriert */}
        <span className="flex-1 text-center text-[57px] font-semibold leading-none">
          {label}
        </span>

        {/* Rechte Spalte: Count oben, −1 unten */}
        <span
          className="flex flex-col items-center justify-between h-full py-1 pr-1.5 min-w-[3rem]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Count */}
          <span
            className={`text-2xl font-black tabular-nums ${count > 0 ? 'text-cyan-400' : 'text-slate-600'}`}
          >
            {count}
          </span>

          {/* −1 Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onDecrement()
            }}
            disabled={count === 0}
            className={`
              w-14 h-9 rounded-md text-xl font-bold
              flex items-center justify-center
              transition-colors
              ${count > 0
                ? 'bg-slate-700 text-red-400 active:bg-red-900'
                : 'bg-slate-800/50 text-slate-700 cursor-default'
              }
            `}
          >
            −1
          </button>
        </span>
      </button>
    </div>
  )
}
