import { useState, useRef, useCallback } from 'react'

const MEMORIES = [
  {
    img: '/IMG-20260823-WA0000.jpg.jpeg',
    caption: '✨ Us 💕',
    date: '👆 Tap to see',
    rotate: '-3deg',
  },
  {
    img: '/IMG-20260822-WA0042.jpg.jpeg',
    caption: '🥰 Together always',
    date: '👆 Tap to see',
    rotate: '2deg',
  },
  {
    img: '/ChatGPT Image Aug 23, 2026, 12_49_08 PM.png',
    caption: '🔔 Important Message 📢',
    date: '👆 Tap to see',
    rotate: '-2deg',
  },
  {
    img: '/778122745_1958862438117892_8875757110087973408_n.jpg',
    caption: '🌸 Precious Moment ✨',
    date: '👆 Tap to see',
    rotate: '3deg',
  },
]

/* ── Fullscreen Lightbox ── */
function Lightbox({ mem, onClose }) {
  const [scale, setScale] = useState(1)
  const MIN = 0.5
  const MAX = 5

  const zoom = useCallback((delta) => {
    setScale((s) => Math.min(MAX, Math.max(MIN, +(s + delta).toFixed(2))))
  }, [])

  // mouse-wheel zoom
  const onWheel = useCallback(
    (e) => {
      e.preventDefault()
      zoom(e.deltaY < 0 ? 0.15 : -0.15)
    },
    [zoom]
  )

  // close on backdrop click (not on image click)
  const backdropRef = useRef(null)
  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) onClose()
  }

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(0,0,0,0.92)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeIn 0.25s ease',
      }}
    >
      {/* Top bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)',
        }}
      >
        <span
          style={{
            color: '#fff',
            fontFamily: 'Quicksand, sans-serif',
            fontWeight: 700,
            fontSize: '1rem',
          }}
        >
          {mem.caption} &nbsp;·&nbsp;
          <span style={{ fontWeight: 400, opacity: 0.7 }}>{mem.date}</span>
        </span>

        <button
          onClick={onClose}
          style={{
            background: 'rgba(255,255,255,0.15)',
            border: 'none',
            borderRadius: '50%',
            width: 38,
            height: 38,
            cursor: 'pointer',
            color: '#fff',
            fontSize: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.3)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
          title="Close"
        >
          ✕
        </button>
      </div>

      {/* Image */}
      <div
        onWheel={onWheel}
        style={{
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '90vw',
          maxHeight: '80vh',
          cursor: scale > 1 ? 'grab' : 'default',
        }}
      >
        <img
          src={mem.img}
          alt={mem.caption}
          draggable={false}
          style={{
            maxWidth: '88vw',
            maxHeight: '78vh',
            objectFit: 'contain',
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            transition: 'transform 0.2s ease',
            borderRadius: 8,
            boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
            userSelect: 'none',
          }}
        />
      </div>

      {/* Zoom Controls */}
      <div
        style={{
          position: 'absolute',
          bottom: 28,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(8px)',
          borderRadius: 40,
          padding: '8px 20px',
        }}
      >
        <button
          onClick={() => zoom(-0.25)}
          title="Zoom Out"
          style={zoomBtnStyle}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.25)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          –
        </button>

        <span
          style={{
            color: '#fff',
            fontFamily: 'Quicksand, sans-serif',
            fontWeight: 700,
            fontSize: '0.9rem',
            minWidth: 48,
            textAlign: 'center',
          }}
        >
          {Math.round(scale * 100)}%
        </span>

        <button
          onClick={() => zoom(0.25)}
          title="Zoom In"
          style={zoomBtnStyle}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.25)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          +
        </button>

        <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.2)' }} />

        <button
          onClick={() => setScale(1)}
          title="Reset"
          style={{ ...zoomBtnStyle, fontSize: '0.75rem', padding: '4px 10px', borderRadius: 20 }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.25)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          Reset
        </button>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
    </div>
  )
}

const zoomBtnStyle = {
  background: 'transparent',
  border: 'none',
  color: '#fff',
  fontSize: '1.4rem',
  fontWeight: 700,
  width: 36,
  height: 36,
  borderRadius: '50%',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background 0.2s',
}

/* ── Main Photo Modal ── */
function PhotoModal({ onClose }) {
  const [lightbox, setLightbox] = useState(null) // stores the clicked memory object

  return (
    <>
      <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-[#7B6B96]/40 backdrop-blur-sm"
          onClick={onClose}
        />

        <div className="relative glass-card rounded-3xl p-6 sm:p-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-[popIn_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)]">
          {/* Close button */}
          <button
            id="photo-modal-close"
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 text-[#5B9BD5] text-xl font-fredoka hover:bg-[#89CFF0] hover:text-white transition-all duration-200 hover:scale-110"
          >
            ✕
          </button>

          <div className="text-center mb-6">
            <div className="text-5xl mb-2">📷</div>
            <p className="font-quicksand text-[#7aabcc] text-lg font-semibold mt-2">
              This is how I will always remember us
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
            {MEMORIES.map((mem, i) => (
              <div
                key={i}
                className="polaroid cursor-pointer"
                style={{
                  transform: `rotate(${mem.rotate})`,
                  animationDelay: `${i * 0.1}s`,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onClick={() => setLightbox(mem)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'rotate(0deg) scale(1.05)'
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.25)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = `rotate(${mem.rotate}) scale(1)`
                  e.currentTarget.style.boxShadow = ''
                }}
                title="Click to view full screen"
              >
                <img
                  src={mem.img}
                  alt={mem.caption}
                  className="w-full h-40 sm:h-36 object-cover rounded-sm"
                />
                {/* Magnifier hint */}
                <div
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    background: 'rgba(255,255,255,0.75)',
                    borderRadius: '50%',
                    width: 26,
                    height: 26,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.85rem',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                  }}
                >
                  🔍
                </div>
                <div className="mt-3 text-center">
                  <p className="font-comic text-[#555] text-sm font-bold">{mem.caption}</p>
                  <p className="font-comic text-[#aaa] text-xs mt-1">{mem.date}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center mt-8 font-quicksand text-[#C5A8E0] text-sm font-semibold">
            Here's to making a million more memories! 🌟
          </p>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && <Lightbox mem={lightbox} onClose={() => setLightbox(null)} />}
    </>
  )
}

export default PhotoModal
