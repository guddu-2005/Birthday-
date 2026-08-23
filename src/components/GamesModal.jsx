import { useState } from 'react'
import PuzzleGame from './PuzzleGame'
import EasyPuzzle from './EasyPuzzle'
import SnakeGame from './SnakeGame'

const GAMES = [
  {
    id: 'puzzle',
    emoji: '🧩',
    title: 'Photo Puzzle',
    desc: 'Solve picture puzzles in Easy (6×6 Drag) or Hard (6×6 Slide)!',
    gradient: 'from-[#FFB6C1] to-[#FF6B8B]',
    bg: 'bg-[#FFF0F3]',
  },
  {
    id: 'snake',
    emoji: '🐍',
    title: 'Birthday Snake',
    desc: "Eat all the berries, don't crash!",
    gradient: 'from-[#C5A8E0] to-[#8B5CF6]',
    bg: 'bg-[#F5EEFF]',
  },
]

const DIFFICULTY_LEVELS = [
  {
    id: 'easy',
    label: 'Easy',
    emoji: '🌸',
    detail: '6 × 6 grid — Drag & Drop',
    desc: 'Place 36 pieces in empty boxes! Tap or drag ~',
    gradient: 'from-[#B8F0D4] to-[#34C97A]',
    bg: 'bg-[#EDFFF5]',
    badge: 'Beginner',
    badgeColor: 'bg-[#34C97A]',
    grid: 6,
  },
  {
    id: 'hard',
    label: 'Hard',
    emoji: '🔥',
    detail: '6 × 6 grid — 35 tiles',
    desc: 'Complex sliding puzzle! Move fast!',
    gradient: 'from-[#FF6B8B] to-[#c0405a]',
    bg: 'bg-[#FFF0F3]',
    badge: 'Challenge',
    badgeColor: 'bg-[#FF6B8B]',
    grid: 6,
  },
]

// Screens: null = game list, 'puzzle-pick' = difficulty, 'puzzle-easy' | 'puzzle-hard' = game, 'snake'
function GamesModal({ onClose }) {
  const [screen, setScreen] = useState(null)

  const handleDifficulty = (level) => {
    setScreen(level.id === 'easy' ? 'puzzle-easy' : 'puzzle-hard')
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#fff5f8] bg-stars min-h-screen w-screen overflow-y-auto flex flex-col items-center p-3 sm:p-6 animate-[fadeIn_0.3s_ease-out]">
      {/* Decorative ambient blur blobs */}
      <div className="fixed top-0 left-0 w-80 h-80 bg-lavender rounded-full opacity-35 blur-3xl -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-80 h-80 bg-babyblue rounded-full opacity-35 blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

      {/* ── Top Header Navigation Bar ── */}
      <header className="w-full max-w-4xl flex items-center justify-between py-2 px-2 sm:px-4 mb-4 relative z-10 border-b border-[#FFB6C1]/30">
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/80 border border-[#FFB6C1] text-[#FF6B8B] font-quicksand font-bold text-xs sm:text-sm hover:bg-[#FF6B8B] hover:text-white transition-all shadow-sm"
        >
          ← Back to Dashboard
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xl sm:text-2xl">🎮</span>
          <h1 className="font-fredoka text-lg sm:text-2xl text-[#FF6B8B]">Fun &amp; Games Arena</h1>
        </div>

        <button
          id="games-modal-close"
          onClick={onClose}
          className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/80 text-[#FF6B8B] text-lg sm:text-xl font-fredoka hover:bg-[#FF6B8B] hover:text-white transition-all shadow-sm"
          title="Close Games"
        >
          ✕
        </button>
      </header>

      {/* ── Main Full Screen Game Content Area ── */}
      <main className="w-full max-w-4xl flex-1 flex flex-col items-center justify-center relative z-10 py-2">
        {/* ── Game picker list screen ── */}
        {screen === null && (
          <div className="w-full max-w-2xl text-center py-4">
            <div className="text-5xl sm:text-6xl mb-3 animate-bounce-slow">🧩 🐍</div>
            <h2 className="font-fredoka text-2xl sm:text-4xl text-[#FF6B8B] mb-2">Welcome to the Arcade!</h2>
            <p className="font-quicksand text-[#888] text-xs sm:text-base mb-8">
              Pick a birthday mini-game below and enjoy full screen fun! ✨
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 px-2">
              {GAMES.map(game => (
                <button
                  key={game.id}
                  id={`game-${game.id}`}
                  onClick={() => setScreen(game.id === 'puzzle' ? 'puzzle-pick' : 'snake')}
                  className={`sticker-btn glass-card rounded-3xl p-6 flex flex-col items-center gap-4 text-center hover:scale-[1.03] transition-transform duration-200 ${game.bg} border border-white/60 shadow-lg`}
                >
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${game.gradient} flex items-center justify-center text-4xl shadow-md`}>
                    {game.emoji}
                  </div>
                  <div>
                    <p className="font-fredoka text-2xl text-[#4a4a6a]">{game.title}</p>
                    <p className="font-quicksand text-[#888] text-xs sm:text-sm font-medium mt-1">{game.desc}</p>
                  </div>
                  <div className={`px-6 py-2 rounded-full bg-gradient-to-r ${game.gradient} text-white font-quicksand text-xs sm:text-sm font-bold shadow-md hover:brightness-105`}>
                    Play Now ✨
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Difficulty picker screen ── */}
        {screen === 'puzzle-pick' && (
          <div className="w-full max-w-2xl text-center py-2">
            <button
              onClick={() => setScreen(null)}
              className="text-[#FF6B8B] font-quicksand text-xs sm:text-sm font-bold flex items-center gap-1 mb-4 hover:underline mx-auto"
            >
              ← Back to Games Arcade
            </button>

            <div className="text-4xl sm:text-5xl mb-2">🧩</div>
            <h2 className="font-fredoka text-2xl sm:text-3xl text-[#FF6B8B]">Photo Puzzle</h2>
            <p className="font-quicksand text-[#888] text-xs sm:text-sm mb-6">Choose your difficulty level ✨</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 px-2">
              {DIFFICULTY_LEVELS.map(level => (
                <button
                  key={level.id}
                  id={`puzzle-${level.id}`}
                  onClick={() => handleDifficulty(level)}
                  className={`sticker-btn glass-card rounded-3xl p-6 flex flex-col items-center gap-4 text-center hover:scale-[1.04] transition-transform duration-200 ${level.bg} border-2 border-transparent hover:border-[#FFB6C1] shadow-md`}
                >
                  <div className="relative">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${level.gradient} flex items-center justify-center text-4xl shadow-md`}>
                      {level.emoji}
                    </div>
                    {level.id === 'hard' && (
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#FF6B8B] animate-ping opacity-60" />
                    )}
                  </div>

                  <span className={`text-xs font-quicksand font-bold text-white px-3 py-0.5 rounded-full ${level.badgeColor}`}>
                    {level.badge}
                  </span>

                  <div>
                    <p className="font-fredoka text-2xl text-[#4a4a6a]">{level.label}</p>
                    <p className="font-quicksand text-[#666] text-xs sm:text-sm font-semibold mt-1">{level.detail}</p>
                    <p className="font-quicksand text-[#aaa] text-xs mt-0.5 italic">{level.desc}</p>
                  </div>

                  <div className={`px-6 py-2 rounded-full bg-gradient-to-r ${level.gradient} text-white font-quicksand text-xs sm:text-sm font-bold shadow-md`}>
                    {level.id === 'easy' ? 'Start Easy 🌸' : 'Accept Challenge 🔥'}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Active Game Screens (Full Screen View) ── */}
        {screen === 'puzzle-easy' && (
          <EasyPuzzle onBack={() => setScreen('puzzle-pick')} />
        )}

        {screen === 'puzzle-hard' && (
          <PuzzleGame onBack={() => setScreen('puzzle-pick')} />
        )}

        {screen === 'snake' && (
          <SnakeGame onBack={() => setScreen(null)} />
        )}
      </main>
    </div>
  )
}

export default GamesModal
