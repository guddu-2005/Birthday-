import { useState, useRef } from 'react'

const IMG = '/ChatGPT Image Aug 23, 2026, 11_16_50 AM.png'
const G = 8          // 8×8 grid
const TOTAL = G * G  // 64 pieces

const CONFETTI_COLORS = ['#FF6B8B', '#89CFF0', '#FFE082', '#C5A8E0', '#B8F0D4', '#FFB6C1']

function shuffleArr(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/* Returns background-* style for a given tile index at a given rendered size */
function tileImgStyle(tileIdx, cellPx, gridCells = G) {
  const col = tileIdx % gridCells
  const row = Math.floor(tileIdx / gridCells)
  const fullSize = gridCells * cellPx
  return {
    backgroundImage: `url("${IMG}")`,
    backgroundSize: `${fullSize}px ${fullSize}px`,
    backgroundPosition: `-${col * cellPx}px -${row * cellPx}px`,
  }
}

export default function EasyPuzzle({ onBack }) {
  // Cell size on the grid
  const CELL = 44   // px  →  grid = 352 × 352
  const TRAY_TILE = 38  // px in the tray

  // grid[cellIdx] = tileIdx | null
  const [grid, setGrid] = useState(Array(TOTAL).fill(null))
  // tray = shuffled list of tile indices not placed in the grid yet
  const [tray, setTray] = useState(() => shuffleArr([...Array(TOTAL).keys()]))
  const [moves, setMoves] = useState(0)
  const [won, setWon] = useState(false)
  const [particles, setParticles] = useState([])
  const [dragOver, setDragOver] = useState(null) // 'tray' | cellIdx (number)
  const dragging = useRef(null) // { source:'tray'|'grid', tileIdx, fromCell? }

  /* ─── Win check ─────────────────────────────── */
  const checkWin = (g) => g.every((v, i) => v === i)

  /* ─── Drag start ─────────────────────────────── */
  const onTrayDragStart = (e, tileIdx) => {
    dragging.current = { source: 'tray', tileIdx }
    e.dataTransfer.effectAllowed = 'move'
  }

  const onGridDragStart = (e, cellIdx, tileIdx) => {
    dragging.current = { source: 'grid', tileIdx, fromCell: cellIdx }
    e.dataTransfer.effectAllowed = 'move'
  }

  /* ─── Drop on a grid cell ─────────────────────── */
  const onGridDrop = (e, cellIdx) => {
    e.preventDefault()
    setDragOver(null)
    const d = dragging.current
    if (!d) return

    const newGrid = [...grid]
    const newTray = [...tray]

    if (d.source === 'tray') {
      // If destination occupant exists → return to tray
      if (newGrid[cellIdx] !== null) {
        newTray.push(newGrid[cellIdx])
      }
      // Remove dragged tile from tray
      const ti = newTray.indexOf(d.tileIdx)
      if (ti !== -1) newTray.splice(ti, 1)
      newGrid[cellIdx] = d.tileIdx

    } else {
      // Dragging from another grid cell
      if (d.fromCell === cellIdx) { dragging.current = null; return }
      const occupant = newGrid[cellIdx]
      // Swap
      newGrid[cellIdx] = d.tileIdx
      newGrid[d.fromCell] = occupant !== undefined ? occupant : null
    }

    dragging.current = null
    setGrid(newGrid)
    setTray(newTray)
    setMoves(m => m + 1)

    if (checkWin(newGrid)) triggerWin()
  }

  /* ─── Drop on the tray ───────────────────────── */
  const onTrayDrop = (e) => {
    e.preventDefault()
    setDragOver(null)
    const d = dragging.current
    if (!d || d.source !== 'grid') { dragging.current = null; return }

    const newGrid = [...grid]
    const newTray = [...tray]

    newGrid[d.fromCell] = null
    if (!newTray.includes(d.tileIdx)) newTray.push(d.tileIdx)

    dragging.current = null
    setGrid(newGrid)
    setTray(newTray)
    setMoves(m => m + 1)
  }

  const onDragOver = (e, target) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOver(target)
  }

  const onDragLeave = () => setDragOver(null)

  /* ─── Win celebration ────────────────────────── */
  const triggerWin = () => {
    setWon(true)
    setParticles(Array.from({ length: 90 }, (_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 40}%`,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      angle: Math.random() * 360,
      speed: 80 + Math.random() * 180,
      size: 5 + Math.random() * 9,
    })))
  }

  const reset = () => {
    setGrid(Array(TOTAL).fill(null))
    setTray(shuffleArr([...Array(TOTAL).keys()]))
    setMoves(0)
    setWon(false)
    setParticles([])
    dragging.current = null
  }

  const placed = grid.filter(v => v !== null).length
  const correct = grid.filter((v, i) => v === i).length

  /* ─── Render ─────────────────────────────────── */
  return (
    <div className="flex flex-col items-center gap-4 select-none w-full">

      {/* ── Header ── */}
      <div className="w-full flex items-center justify-between">
        <button onClick={onBack} className="text-[#FF6B8B] font-quicksand text-sm font-bold flex items-center gap-1 hover:underline">
          ← Difficulty
        </button>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <span className="text-[10px] font-quicksand font-bold text-white px-2 py-0.5 rounded-full bg-[#34C97A]">🌸 Easy</span>
          <span className="font-quicksand text-xs text-[#aaa]">
            ✅ <strong className="text-[#34C97A]">{correct}</strong>
            <span className="text-[#ddd]">/64</span>
          </span>
          <span className="font-quicksand text-xs text-[#aaa]">Moves: <strong className="text-[#FF6B8B]">{moves}</strong></span>
          <button
            onClick={reset}
            className="text-xs font-quicksand font-bold px-3 py-1 rounded-full bg-[#FFE0E6] text-[#FF6B8B] hover:bg-[#FFB6C1] transition-colors"
          >
            🔀 Reset
          </button>
        </div>
      </div>

      {/* ── Reference thumbnail ── */}
      <div className="flex items-center gap-3 w-full">
        <div className="flex-shrink-0">
          <p className="font-quicksand text-[10px] text-[#ccc] mb-1 text-center">Reference</p>
          <img
            src={IMG}
            alt="reference"
            className="rounded-lg border border-[#FFB6C1] shadow-sm"
            style={{ width: 64, height: 64, objectFit: 'cover' }}
          />
        </div>
        {/* Progress bar */}
        <div className="flex-1">
          <div className="flex justify-between mb-1">
            <span className="font-quicksand text-[10px] text-[#ccc]">Progress</span>
            <span className="font-quicksand text-[10px] text-[#FF6B8B] font-bold">{Math.round((correct / TOTAL) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-[#FFE8EE] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#FFB6C1] to-[#34C97A] transition-all duration-500"
              style={{ width: `${(correct / TOTAL) * 100}%` }}
            />
          </div>
          <p className="font-quicksand text-[10px] text-[#ccc] mt-1">Drag pieces from the tray below into the correct grid cell ✨</p>
        </div>
      </div>

      {/* ── 8×8 Grid ── */}
      <div
        className="rounded-2xl border-2 border-[#FFB6C1] shadow-soft overflow-hidden flex-shrink-0"
        style={{ display: 'grid', gridTemplateColumns: `repeat(${G}, ${CELL}px)` }}
        onDragOver={(e) => e.preventDefault()}
      >
        {Array.from({ length: TOTAL }, (_, cellIdx) => {
          const tileIdx = grid[cellIdx]
          const isEmpty = tileIdx === null
          const isCorrect = !isEmpty && tileIdx === cellIdx
          const isOver = dragOver === cellIdx

          return (
            <div
              key={cellIdx}
              onDragOver={(e) => onDragOver(e, cellIdx)}
              onDragLeave={onDragLeave}
              onDrop={(e) => onGridDrop(e, cellIdx)}
              style={{
                width: CELL,
                height: CELL,
                background: isEmpty
                  ? isOver ? 'rgba(255,107,139,0.12)' : 'rgba(255,182,193,0.06)'
                  : 'transparent',
                border: isEmpty
                  ? `1px dashed ${isOver ? '#FF6B8B' : 'rgba(255,182,193,0.5)'}`
                  : 'none',
                position: 'relative',
                transition: 'background 0.15s',
              }}
            >
              {!isEmpty && (
                <div
                  draggable
                  onDragStart={(e) => onGridDragStart(e, cellIdx, tileIdx)}
                  className="absolute inset-0 cursor-grab active:cursor-grabbing transition-all duration-100"
                  style={{
                    ...tileImgStyle(tileIdx, CELL),
                    outline: isCorrect ? '2px solid #34C97A' : '1px solid rgba(255,182,193,0.3)',
                    outlineOffset: '-1px',
                    filter: isCorrect ? 'brightness(1.05)' : 'none',
                    borderRadius: 2,
                  }}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* ── Tray ── */}
      <div
        onDragOver={(e) => onDragOver(e, 'tray')}
        onDragLeave={onDragLeave}
        onDrop={onTrayDrop}
        className="w-full rounded-2xl border-2 border-dashed transition-colors duration-200"
        style={{
          borderColor: dragOver === 'tray' ? '#FF6B8B' : '#FFE0E6',
          background: dragOver === 'tray' ? 'rgba(255,107,139,0.05)' : 'rgba(255,240,243,0.4)',
          minHeight: 80,
          padding: '8px',
        }}
      >
        <p className="font-quicksand text-[10px] text-[#ccc] mb-1.5 text-center">
          Pieces tray — drag pieces into the grid above ({tray.length} left)
        </p>
        <div className="flex flex-wrap gap-1 justify-center" style={{ maxHeight: 180, overflowY: 'auto' }}>
          {tray.map(tileIdx => (
            <div
              key={tileIdx}
              draggable
              onDragStart={(e) => onTrayDragStart(e, tileIdx)}
              className="cursor-grab active:cursor-grabbing hover:scale-110 transition-transform duration-100 flex-shrink-0"
              style={{
                width: TRAY_TILE,
                height: TRAY_TILE,
                ...tileImgStyle(tileIdx, TRAY_TILE),
                borderRadius: 3,
                border: '1.5px solid rgba(255,182,193,0.6)',
              }}
            />
          ))}
          {tray.length === 0 && (
            <p className="font-quicksand text-xs text-[#34C97A] font-bold italic text-center w-full py-3">
              All pieces placed! Check for greens 🎉
            </p>
          )}
        </div>
      </div>

      {/* ── Win overlay ── */}
      {won && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* Confetti */}
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

          {/* Card */}
          <div
            className="relative z-10 glass-card rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl border-2 border-[#FFB6C1]"
            style={{ animation: 'popIn 0.5s cubic-bezier(0.175,0.885,0.32,1.275)' }}
          >
            <div className="text-6xl mb-2 animate-bounce">🎉</div>
            <h2 className="font-fredoka text-2xl text-[#FF6B8B] mb-1">Picture Perfect! 🌸</h2>
            <p className="font-fredoka text-xl text-[#FF6B8B] mb-1">{moves} moves</p>
            <p className="font-comic text-sm text-[#4a4a5a] leading-relaxed mb-5">
              See? Piece of cake for my Preet! 🌸💙<br />
              Every piece exactly where it belongs — just like you in my life. 💙
            </p>

            {['🌸', '⭐', '💙', '🎊', '✨'].map((em, i) => (
              <span
                key={i}
                className="absolute text-2xl pointer-events-none animate-float"
                style={{ left: `${[10, 80, 15, 70, 45][i]}%`, top: `${[8, 8, 78, 72, 85][i]}%`, animationDelay: `${i * 0.3}s` }}
              >
                {em}
              </span>
            ))}

            <div className="flex gap-3 justify-center">
              <button
                onClick={reset}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-[#FFB6C1] to-[#FF6B8B] text-white font-quicksand font-bold text-sm shadow-md hover:scale-105 transition-transform"
              >
                Again 🔄
              </button>
              <button
                onClick={onBack}
                className="px-5 py-2 rounded-full bg-white/80 border-2 border-[#FFB6C1] text-[#FF6B8B] font-quicksand font-bold text-sm hover:scale-105 transition-transform"
              >
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
