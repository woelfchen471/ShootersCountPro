import { ScoreProvider } from './store/ScoreContext'
import Header from './components/Header'
import ScoreGrid from './components/ScoreGrid'

export default function App() {
  return (
    <ScoreProvider>
      <div className="h-dvh flex flex-col bg-slate-900 text-white max-w-lg mx-auto">
        <Header />
        <ScoreGrid />
      </div>
    </ScoreProvider>
  )
}
