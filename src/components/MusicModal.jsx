import { useState, useEffect, useRef } from 'react'

const WAVE_HEIGHTS = [12, 24, 18, 30, 14, 26, 20, 16, 28, 22]

function MusicModal({ onClose }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnded)

    // Attempt auto-play when modal opens
    audio.play().then(() => {
      setIsPlaying(true)
    }).catch(() => {
      // Auto-play blocked by browser, user will click play button
      setIsPlaying(false)
    })

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('ended', handleEnded)
      audio.pause()
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().then(() => {
        setIsPlaying(true)
      }).catch((err) => {
        console.error("Audio playback error:", err)
      })
    }
  }

  const handleRestart = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = 0
    setCurrentTime(0)
    audio.play().then(() => {
      setIsPlaying(true)
    }).catch(() => {})
  }

  const handleProgressClick = (e) => {
    const audio = audioRef.current
    if (!audio || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const width = rect.width
    const seekTime = (clickX / width) * duration
    audio.currentTime = seekTime
    setCurrentTime(seekTime)
  }

  const formatTime = (s) => {
    if (!s || isNaN(s)) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Hidden audio element */}
      <audio ref={audioRef} src="/audio.mp3" preload="auto" />

      <div
        className="absolute inset-0 bg-[#5B9BD5]/30 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative glass-card rounded-3xl p-6 sm:p-10 w-full max-w-sm animate-[popIn_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)]">
        {/* Close */}
        <button
          id="music-modal-close"
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 text-[#5B9BD5] text-xl font-fredoka hover:bg-[#89CFF0] hover:text-white transition-all duration-200 hover:scale-110 z-10"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">📼</div>
          <h2 className="font-fredoka text-xl text-[#5B9BD5] leading-snug">
            When she thinks she not beautiful enough but this is how I describe her
          </h2>
          <p className="font-quicksand text-[#aaa] text-xs mt-1.5 font-semibold">
            Playing your special song 💙
          </p>
        </div>

        {/* Spinning record */}
        <div className="flex justify-center mb-6">
          <div
            className={`w-36 h-36 rounded-full shadow-soft flex items-center justify-center relative ${
              isPlaying ? 'record-spin' : ''
            }`}
            style={{
              background:
                'conic-gradient(from 0deg, #2c2c2c, #444, #2c2c2c, #555, #2c2c2c, #444, #2c2c2c)',
            }}
          >
            {/* Grooves */}
            {[48, 38, 28].map((r) => (
              <div
                key={r}
                className="absolute rounded-full border border-white/10"
                style={{ width: r * 2, height: r * 2 }}
              />
            ))}
            {/* Center label */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#89CFF0] to-[#5B9BD5] flex items-center justify-center z-10 shadow-lg">
              <span className="text-white text-xl animate-pulse">🎵</span>
            </div>
          </div>
        </div>

        {/* Status display */}
        <div className="bg-white/80 rounded-2xl px-4 py-3 mb-5 min-h-[56px] flex items-center justify-center text-center border border-[#BFDFFF] shadow-sm">
          <p className="font-quicksand text-[#5B9BD5] text-sm font-semibold leading-relaxed">
            {isPlaying ? '✨ Playing special birthday track...' : '⏸ Press Play to listen!'}
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
          <div
            onClick={handleProgressClick}
            className="w-full h-3 bg-[#BFDFFF]/60 rounded-full overflow-hidden cursor-pointer relative shadow-inner"
          >
            <div
              className="h-full bg-gradient-to-r from-[#89CFF0] to-[#5B9BD5] rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 px-1">
            <span className="font-quicksand text-[#aaa] text-xs font-medium">
              {formatTime(currentTime)}
            </span>
            <span className="font-quicksand text-[#aaa] text-xs font-medium">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-5 mt-4">
          <button
            id="music-restart-btn"
            onClick={handleRestart}
            title="Restart"
            className="sticker-btn w-10 h-10 flex items-center justify-center rounded-full bg-white/80 border-2 border-[#BFDFFF] text-[#89CFF0] text-lg shadow-sm hover:scale-110 transition-transform"
          >
            ↺
          </button>
          <button
            id="music-play-btn"
            onClick={togglePlay}
            title={isPlaying ? 'Pause' : 'Play'}
            className="sticker-btn w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-[#89CFF0] to-[#5B9BD5] text-white text-2xl shadow-soft hover:scale-105 transition-transform"
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          <div
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/80 border-2 border-[#BFDFFF] text-[#89CFF0] text-lg shadow-sm"
            title="Audio Playing"
          >
            🎧
          </div>
        </div>

        <p className="text-center mt-5 font-quicksand text-[#C5A8E0] text-xs font-semibold italic">
          "You're amazing, just the way you are" 🎶💙
        </p>
      </div>
    </div>
  )
}

export default MusicModal
