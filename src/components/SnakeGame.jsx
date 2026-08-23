import { useState, useEffect, useRef, useCallback } from 'react'

const COLS = 20
const ROWS = 18
const CELL = 20  // px per cell
const TICK = 130 // ms per tick

const random = (max) => Math.floor(Math.random() * max)
const randFood = (snake) => {
  let pos
  do { pos = { x: random(COLS), y: random(ROWS) } }
  while (snake.some(s => s.x === pos.x && s.y === pos.y))
  return pos
}

const DIRS = { ArrowUp:[0,-1], ArrowDown:[0,1], ArrowLeft:[-1,0], ArrowRight:[1,0],
               w:[0,-1], s:[0,1], a:[-1,0], d:[1,0] }

export default function SnakeGame({ onBack }) {
  const initSnake = [{ x: 10, y: 9 }, { x: 9, y: 9 }, { x: 8, y: 9 }]
  const [snake, setSnake] = useState(initSnake)
  const [food, setFood] = useState({ x: 15, y: 9 })
  const [dir, setDir] = useState({ x: 1, y: 0 })
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(() => Number(localStorage.getItem('snakeBest') || 0))
  const [status, setStatus] = useState('idle') // idle | playing | dead
  const nextDir = useRef({ x: 1, y: 0 })
  const touchStart = useRef(null)
  const gameRef = useRef(null)

  // Tick
  useEffect(() => {
    if (status !== 'playing') return
    const id = setInterval(() => {
      setDir(nextDir.current)
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

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (DIRS[e.key]) {
        e.preventDefault()
        const [dx, dy] = DIRS[e.key]
        if (dx !== -nextDir.current.x || dy !== -nextDir.current.y)
          nextDir.current = { x: dx, y: dy }
        if (status === 'idle' || status === 'dead') startGame()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [status])

  // Touch swipe
  const onTouchStart = (e) => { touchStart.current = e.touches[0] }
  const onTouchEnd = (e) => {
    if (!touchStart.current) return
    const dx = e.changedTouches[0].clientX - touchStart.current.clientX
    const dy = e.changedTouches[0].clientY - touchStart.current.clientY
    if (Math.abs(dx) > Math.abs(dy)) {
      const nd = dx > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 }
      if (nd.x !== -nextDir.current.x) nextDir.current = nd
    } else {
      const nd = dy > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 }
      if (nd.y !== -nextDir.current.y) nextDir.current = nd
    }
    if (status !== 'playing') startGame()
    touchStart.current = null
  }

  const startGame = useCallback(() => {
    const s = [{ x: 10, y: 9 }, { x: 9, y: 9 }, { x: 8, y: 9 }]
    nextDir.current = { x: 1, y: 0 }
    setSnake(s)
    setFood(randFood(s))
    setScore(0)
    setStatus('playing')
  }, [])

  const W = COLS * CELL
  const H = ROWS * CELL

  return (
    <div className="flex flex-col items-center gap-3 select-none">
      {/* Header */}
      <div className="w-full flex items-center justify-between" style={{ maxWidth: W }}>
        <button onClick={onBack} className="text-[#FF6B8B] font-quicksand text-sm font-bold flex items-center gap-1 hover:underline">
          ← Games
        </button>
        <div className="flex items-center gap-3">
          <span className="font-quicksand text-xs text-[#aaa]">Score: <strong className="text-[#FF6B8B]">{score}</strong></span>
          <span className="font-quicksand text-xs text-[#aaa]">Best: <strong className="text-[#C5A8E0]">{best}</strong></span>
        </div>
      </div>

      {/* Game board */}
      <div
        ref={gameRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative rounded-2xl overflow-hidden border-2 border-[#FFB6C1] shadow-soft cursor-pointer"
        style={{
          width: W, height: H,
          background: 'linear-gradient(135deg, #fff5f7 0%, #fff0f5 100%)',
          backgroundImage: `
            linear-gradient(rgba(255,182,193,0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,182,193,0.2) 1px, transparent 1px)
          `,
          backgroundSize: `${CELL}px ${CELL}px`,
        }}
        onClick={() => { if (status !== 'playing') startGame() }}
      >
        {/* Food */}
        <div
          className="absolute flex items-center justify-center text-base animate-bounce-slow"
          style={{ left: food.x * CELL, top: food.y * CELL, width: CELL, height: CELL }}
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
              className="absolute rounded-[6px] transition-none"
              style={{
                left: seg.x * CELL + 1,
                top:  seg.y * CELL + 1,
                width: CELL - 2,
                height: CELL - 2,
                background: isHead
                  ? 'linear-gradient(135deg, #FF6B8B, #e0405a)'
                  : `rgb(${r},${g},${b})`,
                boxShadow: isHead ? '0 2px 8px rgba(255,107,139,0.5)' : undefined,
                zIndex: isHead ? 2 : 1,
              }}
            >
              {isHead && (
                <div className="absolute inset-0 flex items-center justify-center text-[10px]">👀</div>
              )}
            </div>
          )
        })}

        {/* Overlay: idle or dead */}
        {status !== 'playing' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm rounded-2xl gap-3">
            <div className="text-5xl animate-bounce">{status === 'dead' ? '💔' : '🐍'}</div>
            <h3 className="font-fredoka text-xl text-[#FF6B8B]">
              {status === 'dead' ? 'Game Over!' : 'Birthday Snake 🎂'}
            </h3>
            {status === 'dead' && (
              <p className="font-quicksand text-sm text-[#7a7a9a]">Score: <strong>{score}</strong></p>
            )}
            <p className="font-quicksand text-xs text-[#bbb] text-center px-4">
              {status === 'dead' ? 'Tap / press any arrow to try again!' : 'Tap or press Arrow keys to start!'}
            </p>
            <button
              onClick={startGame}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-[#FFB6C1] to-[#FF6B8B] text-white font-quicksand font-bold text-sm shadow-md hover:scale-105 transition-transform"
            >
              {status === 'dead' ? 'Try Again 🔄' : 'Start Game 🎮'}
            </button>
          </div>
        )}
      </div>

      <p className="font-quicksand text-[10px] text-[#ccc] text-center">
        🎮 Arrow keys / WASD to move &nbsp;·&nbsp; Swipe on mobile
      </p>
    </div>
  )
}
