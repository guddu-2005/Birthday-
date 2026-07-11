import { useEffect, useRef } from 'react'

const COLORS = ['#89CFF0', '#FFE082', '#FFB6C1', '#C5A8E0', '#B8F0D4', '#BFDFFF', '#FFF176']

function Confetti() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const pieces = []
    for (let i = 0; i < 60; i++) {
      const piece = document.createElement('div')
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      const size = Math.random() * 10 + 6
      const left = Math.random() * 100
      const delay = Math.random() * 4
      const duration = Math.random() * 3 + 3
      const isCircle = Math.random() > 0.5

      piece.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        left: ${left}%;
        top: -20px;
        border-radius: ${isCircle ? '50%' : '2px'};
        animation: confettiFall ${duration}s ${delay}s linear infinite;
        opacity: 0.85;
        transform: rotate(${Math.random() * 360}deg);
      `
      container.appendChild(piece)
      pieces.push(piece)
    }

    return () => {
      pieces.forEach(p => p.remove())
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  )
}

export default Confetti
