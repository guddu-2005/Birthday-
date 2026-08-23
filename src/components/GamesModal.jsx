import { useState } from 'react'
import PuzzleGame from './PuzzleGame'
import EasyPuzzle from './EasyPuzzle'
import SnakeGame from './SnakeGame'

const GAMES = [
  {
    id: 'puzzle',
    emoji: '🧩',
    title: 'Photo Puzzle',
    desc: 'Slide tiles to restore our picture!',
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
    detail: '3 × 3 grid — 8 tiles',
    desc: 'Relax and enjoy ~',
    gradient: 'from-[#B8F0D4] to-[#34C97A]',
    bg: 'bg-[#EDFFF5]',
    badge: 'Beginner',
    badgeColor: 'bg-[#34C97A]',
    grid: 3,
  },
  {
    id: 'hard',
    label: 'Hard',
    emoji: '🔥',
    detail: '4 × 4 grid — 15 tiles',
    desc: 'Think fast, move faster!',
    gradient: 'from-[#FF6B8B] to-[#c0405a]',
    bg: 'bg-[#FFF0F3]',
    badge: 'Challenge',
    badgeColor: 'bg-[#FF6B8B]',
    grid: 4,
  },
]

// Screens: null = game list, 'puzzle-pick' = difficulty, 'puzzle-easy' | 'puzzle-hard' = game, 'snake'
function GamesModal({ onClose }) {
  const [screen, setScreen] = useState(null)

  const handleDifficulty = (level) => {
    setScreen(level.id === 'easy' ? 'puzzle-easy' : 'puzzle-hard')
  }

  const headerVisible = screen === null || screen === 'puzzle-pick'

  return (
    <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#FFB6C1]/30 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative glass-card rounded-3xl p-6 sm:p-8 w-full max-w-lg max-h-[92vh] overflow-y-auto animate-[popIn_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)]">
        {/* Close */}
        <button
          id="games-modal-close"
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 text-[#FF6B8B] text-xl font-fredoka hover:bg-[#FFB6C1] hover:text-white transition-all duration-200 hover:scale-110 z-10"
        >
          ✕
        </button>

        {/* ── Game list header ── */}
        {screen === null && (
          <div className="text-center mb-6">
            <div className="text-5xl mb-2">🎮</div>
            <h2 className="font-fredoka text-2xl text-[#FF6B8B]">Fun &amp; Games</h2>
            <p className="font-quicksand text-[#aaa] text-xs mt-1">Pick a game and let's play! 🎉</p>
          </div>
        )}

        {/* ── Difficulty picker header ── */}
        {screen === 'puzzle-pick' && (
          <div className="mb-6">
            <button
              onClick={() => setScreen(null)}
              className="text-[#FF6B8B] font-quicksand text-sm font-bold flex items-center gap-1 mb-4 hover:underline"
            >
              ← Back to Games
            </button>
            <div className="text-center">
              <div className="text-4xl mb-1">🧩</div>
              <h2 className="font-fredoka text-2xl text-[#FF6B8B]">Photo Puzzle</h2>
              <p className="font-quicksand text-[#aaa] text-xs mt-1">Choose your difficulty level ✨</p>
            </div>
          </div>
        )}

        {/* ── SCREENS ── */}

        {screen === null && (
          /* Game picker */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {GAMES.map(game => (
              <button
                key={game.id}
                id={`game-${game.id}`}
                onClick={() => setScreen(game.id === 'puzzle' ? 'puzzle-pick' : 'snake')}
                className={`sticker-btn glass-card rounded-2xl p-5 flex flex-col items-center gap-3 text-center hover:scale-[1.03] transition-transform duration-200 ${game.bg}`}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${game.gradient} flex items-center justify-center text-3xl shadow-lg`}>
                  {game.emoji}
                </div>
                <div>
                  <p className="font-fredoka text-lg text-[#4a4a6a]">{game.title}</p>
                  <p className="font-quicksand text-[#aaa] text-xs font-medium mt-0.5">{game.desc}</p>
                </div>
                <div className={`px-4 py-1 rounded-full bg-gradient-to-r ${game.gradient} text-white font-quicksand text-xs font-bold shadow-md`}>
                  Play Now ✨
                </div>
              </button>
            ))}
          </div>
        )}

        {screen === 'puzzle-pick' && (
          /* Difficulty picker */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DIFFICULTY_LEVELS.map(level => (
              <button
                key={level.id}
                id={`puzzle-${level.id}`}
                onClick={() => handleDifficulty(level)}
                className={`sticker-btn glass-card rounded-2xl p-5 flex flex-col items-center gap-3 text-center hover:scale-[1.04] transition-transform duration-200 ${level.bg} border-2 border-transparent hover:border-[#FFB6C1]`}
              >
                {/* Icon with pulse ring on hard */}
                <div className="relative">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${level.gradient} flex items-center justify-center text-3xl shadow-lg`}>
                    {level.emoji}
                  </div>
                  {level.id === 'hard' && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#FF6B8B] animate-ping opacity-60" />
                  )}
                </div>

                {/* Badge */}
                <span className={`text-[10px] font-quicksand font-bold text-white px-2.5 py-0.5 rounded-full ${level.badgeColor}`}>
                  {level.badge}
                </span>

                <div>
                  <p className="font-fredoka text-xl text-[#4a4a6a]">{level.label}</p>
                  <p className="font-quicksand text-[#888] text-xs font-semibold mt-0.5">{level.detail}</p>
                  <p className="font-quicksand text-[#bbb] text-[10px] mt-0.5 italic">{level.desc}</p>
                </div>

                <div className={`px-4 py-1.5 rounded-full bg-gradient-to-r ${level.gradient} text-white font-quicksand text-xs font-bold shadow-md`}>
                  {level.id === 'easy' ? 'Start Easy 🌸' : 'Accept Challenge 🔥'}
                </div>
              </button>
            ))}
          </div>
        )}

        {screen === 'puzzle-easy' && (
          <EasyPuzzle onBack={() => setScreen('puzzle-pick')} />
        )}

        {screen === 'puzzle-hard' && (
          <PuzzleGame onBack={() => setScreen('puzzle-pick')} />
        )}

        {screen === 'snake' && (
          <SnakeGame onBack={() => setScreen(null)} />
        )}
      </div>
    </div>
  )
}

export default GamesModal
