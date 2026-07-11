const STARS = [
  { top: '5%', left: '8%', size: 22, delay: '0s', color: '#89CFF0' },
  { top: '12%', left: '85%', size: 16, delay: '0.5s', color: '#FFE082' },
  { top: '22%', left: '15%', size: 12, delay: '1s', color: '#FFB6C1' },
  { top: '35%', left: '92%', size: 20, delay: '1.5s', color: '#C5A8E0' },
  { top: '48%', left: '5%', size: 14, delay: '0.8s', color: '#B8F0D4' },
  { top: '60%', left: '88%', size: 18, delay: '0.3s', color: '#89CFF0' },
  { top: '72%', left: '10%', size: 10, delay: '1.2s', color: '#FFE082' },
  { top: '82%', left: '80%', size: 24, delay: '0.7s', color: '#FFB6C1' },
  { top: '90%', left: '20%', size: 15, delay: '0.4s', color: '#C5A8E0' },
  { top: '95%', left: '70%', size: 11, delay: '1.8s', color: '#B8F0D4' },
]

function StarShape({ size, color }) {
  const points = []
  const outerR = size / 2
  const innerR = outerR * 0.45
  for (let i = 0; i < 10; i++) {
    const angle = (Math.PI / 5) * i - Math.PI / 2
    const r = i % 2 === 0 ? outerR : innerR
    points.push(`${outerR + r * Math.cos(angle)},${outerR + r * Math.sin(angle)}`)
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <polygon points={points.join(' ')} fill={color} opacity="0.7" />
    </svg>
  )
}

function FloatingStars() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {STARS.map((s, i) => (
        <div
          key={i}
          className="star absolute"
          style={{
            top: s.top,
            left: s.left,
            animationDelay: s.delay,
            animationDuration: `${2 + i * 0.3}s`,
          }}
        >
          <StarShape size={s.size} color={s.color} />
        </div>
      ))}
    </div>
  )
}

export default FloatingStars
