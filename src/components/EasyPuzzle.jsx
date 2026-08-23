import { useState, useRef, useEffect } from 'react'

const IMG = '/ChatGPT Image Aug 23, 2026, 11_16_50 AM.png'
const G = 6          // 6×6 grid
const TOTAL = G * G  // 36 pieces

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
  const [cellSize, setCellSize] = useState(52)
  const [trayTileSize, setTrayTileSize] = useState(46)

  // grid[cellIdx] = tileIdx | null
  const [grid, setGrid] = useState(Array(TOTAL).fill(null))
  // tray = shuffled list of tile indices not placed in the grid yet
  const [tray, setTray] = useState(() => shuffleArr([...Array(TOTAL).keys()]))
  const [moves, setMoves] = useState(0)
  const [won, setWon] = useState(false)
  const [particles, setParticles] = useState([])
  const [dragOver, setDragOver] = useState(null) // 'tray' | cellIdx (number)

  // Mobile Tap-to-Select State: { source: 'tray'|'grid', tileIdx, fromCell? } | null
  const [selected, setSelected] = useState(null)

  const dragging = useRef(null) // { source:'tray'|'grid', tileIdx, fromCell? }

  // Compute responsive cell size for mobile & desktop (6 columns)
  useEffect(() => {
    const handleResize = () => {
      const screenW = window.innerWidth
      const padding = screenW < 640 ? 36 : 120
      const availableW = screenW - padding
      const availableH = window.innerHeight - 260
      // 6 columns -> calculate cell size clamped between 42px and 62px
      const calcCell = Math.max(42, Math.min(Math.floor(availableW / G), Math.floor(availableH / G), 62))
      setCellSize(calcCell)
      setTrayTileSize(Math.max(38, calcCell - 8))
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  /* ─── Win check ─────────────────────────────── */
  const checkWin = (g) => g.every((v, i) => v === i)

  /* ─── Tap selection handler ─────────────────── */
  const handleTrayPieceTap = (tileIdx) => {
    if (selected && selected.source === 'tray' && selected.tileIdx === tileIdx) {
      setSelected(null) // deselect
    } else {
      setSelected({ source: 'tray', tileIdx })
    }
  }

  const handleGridCellTap = (cellIdx) => {
    if (!selected) {
      if (grid[cellIdx] !== null) {
        setSelected({ source: 'grid', tileIdx: grid[cellIdx], fromCell: cellIdx })
      }
      return
    }
    executeMove(selected, cellIdx)
    setSelected(null)
  }

  const handleReturnToTrayTap = () => {
    if (selected && selected.source === 'grid') {
      const newGrid = [...grid]
      const newTray = [...tray]
      newGrid[selected.fromCell] = null
      if (!newTray.includes(selected.tileIdx)) newTray.push(selected.tileIdx)
      setGrid(newGrid)
      setTray(newTray)
      setMoves(m => m + 1)
      setSelected(null)
    }
  }

  /* ─── Execute Move ───────────────────────────── */
  const executeMove = (sourceData, targetCellIdx) => {
    const newGrid = [...grid]
    const newTray = [...tray]

    if (sourceData.source === 'tray') {
      if (newGrid[targetCellIdx] !== null) {
        newTray.push(newGrid[targetCellIdx])
      }
      const ti = newTray.indexOf(sourceData.tileIdx)
      if (ti !== -1) newTray.splice(ti, 1)
      newGrid[targetCellIdx] = sourceData.tileIdx
    } else {
      if (sourceData.fromCell === targetCellIdx) return
      const occupant = newGrid[targetCellIdx]
      newGrid[targetCellIdx] = sourceData.tileIdx
      newGrid[sourceData.fromCell] = occupant !== undefined ? occupant : null
    }

    setGrid(newGrid)
    setTray(newTray)
    setMoves(m => m + 1)

    if (checkWin(newGrid)) triggerWin()
  }

  /* ─── Drag & Drop Handlers (Desktop Mouse) ────── */
  const onTrayDragStart = (e, tileIdx) => {
    dragging.current = { source: 'tray', tileIdx }
    e.dataTransfer.effectAllowed = 'move'
    setSelected(null)
  }

  const onGridDragStart = (e, cellIdx, tileIdx) => {
    dragging.current = { source: 'grid', tileIdx, fromCell: cellIdx }
    e.dataTransfer.effectAllowed = 'move'
    setSelected(null)
  }

  const onGridDrop = (e, cellIdx) => {
    e.preventDefault()
    setDragOver(null)
    const d = dragging.current
    if (!d) return
    executeMove(d, cellIdx)
    dragging.current = null
  }

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
    setSelected(null)
    dragging.current = null
  }

  const correct = grid.filter((v, i) => v === i).length

  return (
    <div className="flex flex-col items-center gap-4 select-none w-full max-w-xl mx-auto">

      {/* ── Header ── */}
      <div className="w-full flex items-center justify-between px-1">
        <button onClick={onBack} className="text-[#FF6B8B] font-quicksand text-xs sm:text-sm font-bold flex items-center gap-1 hover:underline">
          ← Difficulty
        </button>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <span className="text-[11px] font-quicksand font-bold text-white px-3 py-0.5 rounded-full bg-[#34C97A] shadow-sm">
            🌸 Easy 6×6
          </span>
          <span className="font-quicksand text-xs text-[#aaa]">
            ✅ <strong className="text-[#34C97A] font-bold">{correct}</strong>
            <span className="text-[#ddd]">/36</span>
          </span>
          <span className="font-quicksand text-xs text-[#aaa]">
            Moves: <strong className="text-[#FF6B8B] font-bold">{moves}</strong>
          </span>
          <button
            onClick={reset}
            className="text-xs font-quicksand font-bold px-3 py-1 rounded-full bg-[#FFE0E6] text-[#FF6B8B] hover:bg-[#FFB6C1] transition-colors"
          >
            🔀 Reset
          </button>
        </div>
      </div>

      {/* ── Reference & Progress Bar ── */}
      <div className="flex items-center gap-3 w-full bg-white/60 p-2.5 rounded-2xl border border-[#FFB6C1]/40 shadow-sm">
        <div className="flex-shrink-0">
          <img
            src={IMG}
            alt="reference"
            className="rounded-xl border border-[#FFB6C1] shadow-sm"
            style={{ width: 56, height: 56, objectFit: 'cover' }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between mb-1">
            <span className="font-quicksand text-[11px] text-[#777] font-medium">Completion Progress</span>
            <span className="font-quicksand text-[11px] text-[#FF6B8B] font-bold">{Math.round((correct / TOTAL) * 100)}%</span>
          </div>
          <div className="w-full h-2.5 bg-[#FFE8EE] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#FFB6C1] to-[#34C97A] transition-all duration-300"
              style={{ width: `${(correct / TOTAL) * 100}%` }}
            />
          </div>
          <p className="font-quicksand text-[10px] text-[#888] truncate mt-1">
            {selected ? '✨ Tap any grid cell to place piece!' : '💡 Drag pieces OR tap to select & place into grid boxes!'}
          </p>
        </div>
      </div>

      {/* ── 6×6 Grid ── */}
      <div
        className="rounded-2xl border-2 border-[#FFB6C1] shadow-md overflow-hidden flex-shrink-0 bg-white/40"
        style={{ display: 'grid', gridTemplateColumns: `repeat(${G}, ${cellSize}px)` }}
        onDragOver={(e) => e.preventDefault()}
      >
        {Array.from({ length: TOTAL }, (_, cellIdx) => {
          const tileIdx = grid[cellIdx]
          const isEmpty = tileIdx === null
          const isCorrect = !isEmpty && tileIdx === cellIdx
          const isOver = dragOver === cellIdx
          const isSelected = selected && selected.source === 'grid' && selected.fromCell === cellIdx

          return (
            <div
              key={cellIdx}
              onClick={() => handleGridCellTap(cellIdx)}
              onDragOver={(e) => onDragOver(e, cellIdx)}
              onDragLeave={() => setDragOver(null)}
              onDrop={(e) => onGridDrop(e, cellIdx)}
              style={{
                width: cellSize,
                height: cellSize,
                background: isEmpty
                  ? isOver ? 'rgba(255,107,139,0.18)' : 'rgba(255,182,193,0.06)'
                  : 'transparent',
                border: isEmpty
                  ? `1px dashed ${isOver ? '#FF6B8B' : 'rgba(255,182,193,0.5)'}`
                  : 'none',
                position: 'relative',
                cursor: 'pointer',
              }}
            >
              {!isEmpty && (
                <div
                  draggable
                  onDragStart={(e) => onGridDragStart(e, cellIdx, tileIdx)}
                  className={`absolute inset-0 transition-all duration-100 ${
                    isSelected ? 'ring-2 ring-[#FF6B8B] scale-105 z-20 shadow-lg animate-pulse' : ''
                  }`}
                  style={{
                    ...tileImgStyle(tileIdx, cellSize),
                    outline: isCorrect ? '2.5px solid #34C97A' : '1px solid rgba(255,182,193,0.3)',
                    outlineOffset: '-1px',
                    filter: isCorrect ? 'brightness(1.05)' : 'none',
                    borderRadius: 3,
                  }}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* ── Pieces Tray (6x6 = 36 pieces) ── */}
      <div
        onDragOver={(e) => onDragOver(e, 'tray')}
        onDragLeave={() => setDragOver(null)}
        onDrop={onTrayDrop}
        onClick={handleReturnToTrayTap}
        className="w-full rounded-2xl border-2 border-dashed transition-colors duration-200"
        style={{
          borderColor: dragOver === 'tray' || (selected && selected.source === 'grid') ? '#FF6B8B' : '#FFE0E6',
          background: dragOver === 'tray' ? 'rgba(255,107,139,0.08)' : 'rgba(255,240,243,0.6)',
          minHeight: 85,
          padding: '8px',
        }}
      >
        <div className="flex items-center justify-between px-2 mb-1.5">
          <span className="font-quicksand text-[11px] text-[#888] font-medium">
            Pieces Tray ({tray.length} remaining)
          </span>
          {selected && selected.source === 'grid' && (
            <span className="font-quicksand text-[10px] text-[#FF6B8B] font-bold animate-pulse">
              Tap tray to remove piece ↩️
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 justify-center max-h-44 overflow-y-auto p-1">
          {tray.map(tileIdx => {
            const isSelected = selected && selected.source === 'tray' && selected.tileIdx === tileIdx
            return (
              <div
                key={tileIdx}
                draggable
                onDragStart={(e) => onTrayDragStart(e, tileIdx)}
                onClick={(e) => {
                  e.stopPropagation()
                  handleTrayPieceTap(tileIdx)
                }}
                className={`cursor-pointer hover:scale-110 active:scale-95 transition-all duration-100 flex-shrink-0 ${
                  isSelected ? 'ring-2 ring-[#FF6B8B] scale-110 shadow-md animate-bounce' : ''
                }`}
                style={{
                  width: trayTileSize,
                  height: trayTileSize,
                  ...tileImgStyle(tileIdx, trayTileSize),
                  borderRadius: 4,
                  border: isSelected ? '2px solid #FF6B8B' : '1.5px solid rgba(255,182,193,0.6)',
                }}
              />
            )
          })}
          {tray.length === 0 && (
            <p className="font-quicksand text-xs text-[#34C97A] font-bold italic text-center w-full py-2">
              All 36 pieces placed! Check for green outlines 🎉
            </p>
          )}
        </div>
      </div>

      {/* ── Win overlay ── */}
      {won && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

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
            className="relative z-10 glass-card rounded-3xl p-6 sm:p-8 max-w-xs w-full text-center shadow-2xl border-2 border-[#FFB6C1]"
            style={{ animation: 'popIn 0.5s cubic-bezier(0.175,0.885,0.32,1.275)' }}
          >
            <div className="text-6xl mb-2 animate-bounce">🎉</div>
            <h2 className="font-fredoka text-2xl text-[#FF6B8B] mb-1">Picture Perfect! 🌸</h2>
            <p className="font-fredoka text-xl text-[#FF6B8B] mb-1">{moves} moves</p>
            <p className="font-comic text-sm text-[#4a4a5a] leading-relaxed mb-5">
              See? Piece of cake for my Preet! 🌸💙<br />
              6×6 drag puzzle solved completely! 💙
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
