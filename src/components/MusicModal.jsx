import { useState, useEffect, useRef } from 'react'

const LYRICS = [
  { time: 0,   text: "🎵 Count on me, like 1, 2, 3..." },
  { time: 4,   text: "I'll be there..." },
  { time: 7,   text: "And I know when I need it..." },
  { time: 11,  text: "I can count on you like 4, 3, 2..." },
  { time: 15,  text: "And you'll be there..." },
  { time: 18,  text: "'Cause that's what friends are supposed to do..." },
  { time: 22,  text: "Oh yeah, ooh ooh..." },
  { time: 26,  text: "If you ever find yourself stuck in the middle of the sea..." },
  { time: 31,  text: "I'll sail the world to find you 🌊" },
  { time: 35,  text: "If you ever find yourself lost in the dark and you can't see..." },
  { time: 40,  text: "I'll be the light to guide you 🌟" },
  { time: 44,  text: "Find out what we're made of..." },
  { time: 48,  text: "When we are called to help our friends in need..." },
  { time: 52,  text: "You can count on me like 1, 2, 3..." },
  { time: 56,  text: "I'll be there 🎵" },
]

const WAVE_HEIGHTS = [12, 24, 18, 30, 14, 26, 20, 16, 28, 22]

function MusicModal({ onClose }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [currentLyric, setCurrentLyric] = useState(0)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef(null)
  const DURATION = 60

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(t => {
          const next = t + 0.5
          if (next >= DURATION) {
            setIsPlaying(false)
            return 0
          }

          // Update lyric
          let lyricIdx = 0
          for (let i = LYRICS.length - 1; i >= 0; i--) {
            if (next >= LYRICS[i].time) { lyricIdx = i; break }
          }
          setCurrentLyric(lyricIdx)
          setProgress((next / DURATION) * 100)
          return next
        })
      }, 500)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [isPlaying])

  const togglePlay = () => setIsPlaying(p => !p)

  const handleRestart = () => {
    setCurrentTime(0)
    setProgress(0)
    setCurrentLyric(0)
    setIsPlaying(false)
  }

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#5B9BD5]/30 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative glass-card rounded-3xl p-6 sm:p-10 w-full max-w-sm animate-[popIn_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)]">
        {/* Close */}
        <button
          id="music-modal-close"
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 text-[#5B9BD5] text-xl font-fredoka hover:bg-[#89CFF0] hover:text-white transition-all duration-200 hover:scale-110"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">📼</div>
          <h2 className="font-fredoka text-2xl text-[#5B9BD5]">Song that   reminds me of you</h2>
          <p className="font-quicksand text-[#aaa] text-xs mt-1">Bruno Mars — Count On Me</p>
        </div>

        {/* Spinning record */}
        <div className="flex justify-center mb-6">
          <div
            className={`w-36 h-36 rounded-full shadow-soft flex items-center justify-center relative ${isPlaying ? 'record-spin' : ''}`}
            style={{
              background: 'conic-gradient(from 0deg, #2c2c2c, #444, #2c2c2c, #555, #2c2c2c, #444, #2c2c2c)',
            }}
          >
            {/* Grooves */}
            {[48, 38, 28].map(r => (
              <div key={r} className="absolute rounded-full border border-white/10" style={{ width: r * 2, height: r * 2 }} />
            ))}
            {/* Center label */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#89CFF0] to-[#5B9BD5] flex items-center justify-center z-10 shadow-lg">
              <span className="text-white text-xl">🎵</span>
            </div>
          </div>
        </div>

        {/* Lyric display */}
        <div className="bg-white/70 rounded-2xl px-5 py-4 mb-5 min-h-[64px] flex items-center justify-center text-center border border-[#BFDFFF]">
          <p className="font-quicksand text-[#5B9BD5] text-sm sm:text-base font-semibold leading-relaxed transition-all duration-500">
            {LYRICS[currentLyric].text}
          </p>
        </div>

        {/* Wave bars */}
        <div className="flex items-end justify-center gap-1 h-8 mb-5">
          {WAVE_HEIGHTS.map((h, i) => (
            <div
              key={i}
              className="w-2 rounded-full wave-bar"
              style={{
                height: isPlaying ? `${h}px` : '8px',
                background: `linear-gradient(to top, #89CFF0, #5B9BD5)`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${0.6 + (i % 3) * 0.2}s`,
                transition: 'height 0.3s ease',
              }}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="mb-2">
          <div className="w-full h-2 bg-[#BFDFFF] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#89CFF0] to-[#5B9BD5] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="font-quicksand text-[#aaa] text-xs">{formatTime(currentTime)}</span>
            <span className="font-quicksand text-[#aaa] text-xs">{formatTime(DURATION)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-5">
          <button
            id="music-restart-btn"
            onClick={handleRestart}
            className="sticker-btn w-10 h-10 flex items-center justify-center rounded-full bg-white/80 border-2 border-[#BFDFFF] text-[#89CFF0] text-lg"
          >
            ↺
          </button>
          <button
            id="music-play-btn"
            onClick={togglePlay}
            className="sticker-btn w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-[#89CFF0] to-[#5B9BD5] text-white text-2xl shadow-soft"
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/80 border-2 border-[#BFDFFF] text-[#89CFF0] text-lg">
            🎧
          </div>
        </div>

        <p className="text-center mt-4 font-quicksand text-[#C5A8E0] text-xs font-semibold italic">
          "You can always count on me" 🎶
        </p>
      </div>
    </div>
  )
}

export default MusicModal
