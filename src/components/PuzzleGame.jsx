import { useState, useEffect, useCallback } from 'react'

const IMG = '/ChatGPT Image Aug 23, 2026, 11_16_50 AM.png'
const GRID = 4
const TOTAL = GRID * GRID

const CONFETTI_COLORS = ['#FF6B8B', '#89CFF0', '#FFE082', '#C5A8E0', '#B8F0D4', '#FFB6C1']

function isSolvable(arr) {
  let inversions = 0
  const flat = arr.filter(v => v !== TOTAL - 1)
  for (let i = 0; i < flat.length; i++)
    for (let j = i + 1; j < flat.length; j++)
      if (flat[i] > flat[j]) inversions++
  const blankRow = Math.floor(arr.indexOf(TOTAL - 1) / GRID)
  return (inversions + (GRID - 1 - blankRow)) % 2 === 0
}

function createShuffled() {
  const arr = Array.from({ length: TOTAL }, (_, i) => i)
  do {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
  } while (!isSolvable(arr))
  return arr
}

export default function PuzzleGame({ onBack }) {
  const [tiles, setTiles] = useState(createShuffled)
  const [moves, setMoves] = useState(0)
  const [won, setWon] = useState(false)
  const [particles, setParticles] = useState([])
  const [imgSize, setImgSize] = useState(360)

  // Responsive size
  useEffect(() => {
    const update = () => setImgSize(Math.min(window.innerWidth - 64, 360))
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const blankIdx = tiles.indexOf(TOTAL - 1)

  const canMove = useCallback((idx) => {
    const br = Math.floor(blankIdx / GRID), bc = blankIdx % GRID
    const tr = Math.floor(idx / GRID),    tc = idx % GRID
    return (br === tr && Math.abs(bc - tc) === 1) || (bc === tc && Math.abs(br - tr) === 1)
  }, [blankIdx])

  const moveTile = (idx) => {
    if (won || !canMove(idx)) return
    const next = [...tiles];
    [next[idx], next[blankIdx]] = [next[blankIdx], next[idx]]
    setTiles(next)
    setMoves(m => m + 1)
    if (next.every((v, i) => v === i)) triggerWin()
  }

  const triggerWin = () => {
    setWon(true)
    setParticles(Array.from({ length: 90 }, (_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 50}%`,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      angle: Math.random() * 360,
      speed: 80 + Math.random() * 180,
      size: 5 + Math.random() * 9,
    })))
  }

  const reset = () => {
    setTiles(createShuffled())
    setMoves(0)
    setWon(false)
    setParticles([])
  }

  const tileSize = imgSize / GRID

  return (
    <div className="flex flex-col items-center gap-4 select-none">

      {/* Header */}
      <div className="w-full flex items-center justify-between">
        <button onClick={onBack} className="text-[#FF6B8B] font-quicksand text-sm font-bold flex items-center gap-1 hover:underline">
          ← Difficulty
        </button>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-quicksand font-bold text-white px-2 py-0.5 rounded-full bg-[#FF6B8B]">🔥 Hard</span>
          <span className="font-quicksand text-xs text-[#aaa]">Moves: <strong className="text-[#FF6B8B]">{moves}</strong></span>
          <button onClick={reset} className="text-xs font-quicksand font-bold px-3 py-1 rounded-full bg-[#FFE0E6] text-[#FF6B8B] hover:bg-[#FFB6C1] transition-colors">
            🔀
          </button>
        </div>
      </div>

      {/* Puzzle grid */}
      <div
        className="relative rounded-2xl overflow-hidden shadow-soft border-2 border-[#FFB6C1]"
        style={{ width: imgSize, height: imgSize }}
      >
        {tiles.map((tile, idx) => {
          const isBlank = tile === TOTAL - 1
          const srcCol = tile % GRID
          const srcRow = Math.floor(tile / GRID)
          const destCol = idx % GRID
          const destRow = Math.floor(idx / GRID)
          const moveable = canMove(idx) && !isBlank
          return (
            <div
              key={tile}
              onClick={() => moveTile(idx)}
              className={`absolute transition-all duration-150 ${
                isBlank
                  ? 'opacity-0 cursor-default'
                  : moveable
                    ? 'cursor-pointer hover:brightness-105 hover:scale-[1.04] ring-2 ring-[#FF6B8B] ring-inset'
                    : 'cursor-pointer hover:brightness-105'
              }`}
              style={{
                width: tileSize - 2,
                height: tileSize - 2,
                left: destCol * tileSize + 1,
                top: destRow * tileSize + 1,
                backgroundImage: `url("${IMG}")`,
                backgroundSize: `${imgSize}px ${imgSize}px`,
                backgroundPosition: `-${srcCol * tileSize}px -${srcRow * tileSize}px`,
                borderRadius: 4,
              }}
            />
          )
        })}
      </div>

      <p className="font-quicksand text-xs text-[#bbb] text-center max-w-xs">
        🔥 Hard mode — 4×4 sliding puzzle. Pink-ringed tiles can move. Click to slide!
      </p>

      {/* Win overlay */}
      {won && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map(p => (
              <div
                key={p.id}
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: p.x, top: p.y, width: p.size, height: p.size,
                  background: p.color,
                  animation: 'confettiFall 2.5s ease-out forwards',
                  '--angle': `${p.angle}deg`,
                  '--speed': `${p.speed}px`,
                }}
              />
            ))}
          </div>

          <div
            className="relative z-10 glass-card rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl border-2 border-[#FFB6C1]"
            style={{ animation: 'popIn 0.5s cubic-bezier(0.175,0.885,0.32,1.275)' }}
          >
            <div className="text-6xl mb-2 animate-bounce">🎉</div>
            <h2 className="font-fredoka text-2xl text-[#FF6B8B] mb-1">LEGENDARY!! 🔥</h2>
            <p className="font-fredoka text-xl text-[#FF6B8B] mb-3">{moves} moves</p>
            <p className="font-comic text-sm text-[#4a4a5a] leading-relaxed mb-5">
              I told you — <em className="text-[#FF6B8B]">My Preet can do it.</em><br />
              Anyhow, she figures it out! 💙🔥
            </p>

            {['🌸', '⭐', '💙', '🎊', '✨'].map((em, i) => (
              <span
                key={i}
                className="absolute text-2xl pointer-events-none animate-float"
                style={{ left: `${[10, 80, 15, 70, 45][i]}%`, top: `${[10, 8, 75, 70, 85][i]}%`, animationDelay: `${i * 0.3}s` }}
              >
                {em}
              </span>
            ))}

            <div className="flex gap-3 justify-center">
              <button onClick={reset} className="px-5 py-2 rounded-full bg-gradient-to-r from-[#FFB6C1] to-[#FF6B8B] text-white font-quicksand font-bold text-sm shadow-md hover:scale-105 transition-transform">
                Again 🔄
              </button>
              <button onClick={onBack} className="px-5 py-2 rounded-full bg-white/80 border-2 border-[#FFB6C1] text-[#FF6B8B] font-quicksand font-bold text-sm hover:scale-105 transition-transform">
                Levels 🧩
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes confettiFall {
          0%   { transform: translate(0,0) rotate(0deg); opacity: 1; }
          100% { transform: translate(calc(cos(var(--angle,45deg)) * var(--speed,100px)), calc(sin(var(--angle,45deg)) * var(--speed,100px) + 300px)) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
