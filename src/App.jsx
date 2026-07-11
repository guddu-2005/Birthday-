import { useState } from 'react'
import SecretGate from './screens/SecretGate'
import Teaser from './screens/Teaser'
import Dashboard from './screens/Dashboard'
import Confetti from './components/Confetti'
import FloatingStars from './components/FloatingStars'

function App() {
  const [screen, setScreen] = useState('gate') // 'gate' | 'teaser' | 'dashboard'

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingStars />
      {screen === 'dashboard' && <Confetti />}

      {screen === 'gate' && (
        <SecretGate onSuccess={() => setScreen('teaser')} />
      )}
      {screen === 'teaser' && (
        <Teaser onYes={() => setScreen('dashboard')} />
      )}
      {screen === 'dashboard' && (
        <Dashboard />
      )}
    </div>
  )
}

export default App
