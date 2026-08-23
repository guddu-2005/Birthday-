import { useState, useEffect, useRef, useCallback } from 'react'

const COLS = 18
const ROWS = 16
const TICK = 130 // ms per tick

const random = (max) => Math.floor(Math.random() * max)
const randFood = (snake) => {
  let pos
  do { pos = { x: random(COLS), y: random(ROWS) } }
  while (snake.some(s => s.x === pos.x && s.y === pos.y))
  return pos
}

const DIRS = {
  ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0],
  w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0]
}

export default function SnakeGame({ onBack }) {
  const [cellSize, setCellSize] = useState(18)
  const initSnake = [{ x: 9, y: 8 }, { x: 8, y: 8 }, { x: 7, y: 8 }]
  const [snake, setSnake] = useState(initSnake)
  const [food, setFood] = useState({ x: 13, y: 8 })
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(() => Number(localStorage.getItem('snakeBest') || 0))
  const [status, setStatus] = useState('idle') // idle | playing | dead
  const nextDir = useRef({ x: 1, y: 0 })
  const touchStart = useRef(null)

  // Mobile responsive cell size
  useEffect(() => {
    const updateSize = () => {
      const availW = window.innerWidth - (window.innerWidth < 640 ? 32 : 80)
      const availH = window.innerHeight - 260
      const calcCell = Math.max(14, Math.min(Math.floor(availW / COLS), Math.floor(availH / ROWS), 22))
      setCellSize(calcCell)
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  // Tick loop
  useEffect(() => {
    if (status !== 'playing') return
    const id = setInterval(() => {
      setSnake(prev => {
        const head = { x: prev[0].x + nextDir.current.x, y: prev[0].y + nextDir.current.y }
        // Wall collision
        if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
          setStatus('dead')
          return prev
        }
        // Self collision
        if (prev.some(s => s.x === head.x && s.y === head.y)) {
          setStatus('dead')
          return prev
        }
        let ateFood = false
        setFood(f => {
          if (f.x === head.x && f.y === head.y) {
            ateFood = true
            setScore(sc => {
              const ns = sc + 10
              setBest(b => {
                const nb = Math.max(b, ns)
                localStorage.setItem('snakeBest', nb)
                return nb
              })
              return ns
            })
            return randFood([head, ...prev])
          }
          return f
        })
        const next = [head, ...prev]
        if (!ateFood) next.pop()
        return next
      })
    }, TICK)
    return () => clearInterval(id)
  }, [status])

  // Keyboard controls
  useEffect(() => {
    const onKey = (e) => {
      if (DIRS[e.key]) {
        e.preventDefault()
        const [dx, dy] = DIRS[e.key]
        if (dx !== -nextDir.current.x || dy !== -nextDir.current.y) {
          nextDir.current = { x: dx, y: dy }
        }
        if (status === 'idle' || status === 'dead') startGame()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [status])

  // Change direction safely
  const changeDirection = (dx, dy) => {
    if (dx !== -nextDir.current.x || dy !== -nextDir.current.y) {
      nextDir.current = { x: dx, y: dy }
    }
    if (status !== 'playing') startGame()
  }

  // Touch swipe controls
  const onTouchStart = (e) => { touchStart.current = e.touches[0] }
  const onTouchEnd = (e) => {
    if (!touchStart.current) return
    const dx = e.changedTouches[0].clientX - touchStart.current.clientX
    const dy = e.changedTouches[0].clientY - touchStart.current.clientY
    if (Math.abs(dx) > Math.abs(dy)) {
      if (Math.abs(dx) > 20) changeDirection(dx > 0 ? 1 : -1, 0)
    } else {
      if (Math.abs(dy) > 20) changeDirection(0, dy > 0 ? 1 : -1)
    }
    touchStart.current = null
  }

  const startGame = useCallback(() => {
    const s = [{ x: 9, y: 8 }, { x: 8, y: 8 }, { x: 7, y: 8 }]
    nextDir.current = { x: 1, y: 0 }
    setSnake(s)
    setFood(randFood(s))
    setScore(0)
    setStatus('playing')
  }, [])

  const W = COLS * cellSize
  const H = ROWS * cellSize

  return (
    <div className="flex flex-col items-center gap-3 select-none w-full max-w-full">
      {/* Header */}
      <div className="w-full flex items-center justify-between px-1" style={{ maxWidth: W }}>
        <button onClick={onBack} className="text-[#FF6B8B] font-quicksand text-xs sm:text-sm font-bold flex items-center gap-1 hover:underline">
          ← Games
        </button>
        <div className="flex items-center gap-3">
          <span className="font-quicksand text-xs text-[#aaa]">Score: <strong className="text-[#FF6B8B] font-bold">{score}</strong></span>
          <span className="font-quicksand text-xs text-[#aaa]">Best: <strong className="text-[#C5A8E0] font-bold">{best}</strong></span>
        </div>
      </div>

      {/* Game board */}
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative rounded-2xl overflow-hidden border-2 border-[#FFB6C1] shadow-md cursor-pointer"
        style={{
          width: W,
          height: H,
          background: 'linear-gradient(135deg, #fff5f7 0%, #fff0f5 100%)',
          backgroundImage: `
            linear-gradient(rgba(255,182,193,0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,182,193,0.2) 1px, transparent 1px)
          `,
          backgroundSize: `${cellSize}px ${cellSize}px`,
        }}
        onClick={() => { if (status !== 'playing') startGame() }}
      >
        {/* Food */}
        <div
          className="absolute flex items-center justify-center text-sm sm:text-base animate-bounce-slow"
          style={{ left: food.x * cellSize, top: food.y * cellSize, width: cellSize, height: cellSize }}
        >
          🫐
        </div>

        {/* Snake */}
        {snake.map((seg, i) => {
          const isHead = i === 0
          const progress = i / snake.length
          const r = Math.round(255 - progress * 60)
          const g = Math.round(107 - progress * 40)
          const b = Math.round(139 + progress * 40)
          return (
            <div
              key={i}
              className="absolute rounded-[4px] transition-none"
              style={{
                left: seg.x * cellSize + 1,
                top: seg.y * cellSize + 1,
                width: cellSize - 2,
                height: cellSize - 2,
                background: isHead
                  ? 'linear-gradient(135deg, #FF6B8B, #e0405a)'
                  : `rgb(${r},${g},${b})`,
                boxShadow: isHead ? '0 2px 8px rgba(255,107,139,0.5)' : undefined,
                zIndex: isHead ? 2 : 1,
              }}
            >
              {isHead && (
                <div className="absolute inset-0 flex items-center justify-center text-[9px]">👀</div>
              )}
            </div>
          )
        })}

        {/* Overlay: idle or dead */}
        {status !== 'playing' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl gap-2 p-3">
            <div className="text-4xl sm:text-5xl animate-bounce">{status === 'dead' ? '💔' : '🐍'}</div>
            <h3 className="font-fredoka text-xl text-[#FF6B8B]">
              {status === 'dead' ? 'Game Over!' : 'Birthday Snake 🎂'}
            </h3>
            {status === 'dead' && (
              <p className="font-quicksand text-xs sm:text-sm text-[#7a7a9a]">Score: <strong>{score}</strong></p>
            )}
            <p className="font-quicksand text-[11px] sm:text-xs text-[#888] text-center px-4">
              {status === 'dead' ? 'Tap button below or swipe to try again!' : 'Tap or use Arrow keys to start!'}
            </p>
            <button
              onClick={startGame}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-[#FFB6C1] to-[#FF6B8B] text-white font-quicksand font-bold text-xs sm:text-sm shadow-md hover:scale-105 transition-transform mt-1"
            >
              {status === 'dead' ? 'Try Again 🔄' : 'Start Game 🎮'}
            </button>
          </div>
        )}
      </div>

      {/* On-screen Directional Touch D-Pad for Mobile */}
      <div className="flex flex-col items-center gap-1 mt-1">
        <button
          onClick={() => changeDirection(0, -1)}
          className="w-10 h-9 rounded-xl bg-white/90 border border-[#FFB6C1] text-[#FF6B8B] font-bold text-base shadow-sm active:bg-[#FF6B8B] active:text-white"
        >
          ▲
        </button>
        <div className="flex gap-4">
          <button
            onClick={() => changeDirection(-1, 0)}
            className="w-10 h-9 rounded-xl bg-white/90 border border-[#FFB6C1] text-[#FF6B8B] font-bold text-base shadow-sm active:bg-[#FF6B8B] active:text-white"
          >
            ◀
          </button>
          <button
            onClick={() => changeDirection(0, 1)}
            className="w-10 h-9 rounded-xl bg-white/90 border border-[#FFB6C1] text-[#FF6B8B] font-bold text-base shadow-sm active:bg-[#FF6B8B] active:text-white"
          >
            ▼
          </button>
          <button
            onClick={() => changeDirection(1, 0)}
            className="w-10 h-9 rounded-xl bg-white/90 border border-[#FFB6C1] text-[#FF6B8B] font-bold text-base shadow-sm active:bg-[#FF6B8B] active:text-white"
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  )
}
