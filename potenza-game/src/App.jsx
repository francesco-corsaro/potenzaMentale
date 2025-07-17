import { useState } from 'react'
import IntrusoGame from './components/IntrusoGame'
import TokenCounter from './components/TokenCounter'
import SummaryChart from './components/SummaryChart'
import './App.css'

function App() {
  const [tokens, setTokens] = useState(0)

  const handleCorrect = () => {
    const stats = JSON.parse(localStorage.getItem('stats') || '{"correct":0,"wrong":0}')
    localStorage.setItem('stats', JSON.stringify({ ...stats, correct: stats.correct + 1 }))

    setTokens((t) => {
      const newT = t + 1
      if (newT >= 5) {
        // keep the reward visible for a short time before resetting
        setTimeout(() => setTokens(0), 3000)
        return 5
      }
      return newT
    })
  }

  return (
    <div className="App">
      <IntrusoGame onCorrect={handleCorrect} />
      <TokenCounter tokens={tokens} />
      <h3>Statistiche</h3>
      <SummaryChart />
    </div>
  )
}

export default App
