import { useState } from 'react'

const OPEN_WHENS = [
  {
    icon: '🌧️',
    title: '...are having a hard day',
    content: "I'm so sorry today was tough. Close your eyes, take a deep breath, and remember that you don't have to carry everything alone. I'm always in your corner, cheering you on. Tomorrow is a fresh page. You've got this! 💪💙"
  },
  {
    icon: '🧸',
    title: '...miss me',
    content: "Hey! Close your eyes and squeeze a pillow — that's a hug from me. We might be in different places right now, but you're always in my thoughts. Just a message away! Sending you the warmest hug. 🤗✨"
  },
  {
    icon: '💡',
    title: '...need a little smile',
    content: "Remember that you are one of the bright highlights of my life. Your laughter has this magical way of making everything feel better. Smile, read this, and know you are so incredibly special to me! ☀️🌈"
  },
  {
    icon: '🌌',
    title: '...feel lonely or anxious',
    content: "Look up at the stars (even if they're hidden behind clouds) — we're looking at the same sky. You are strong, you are loved, and you are never truly alone. Wrap yourself in a cozy blanket and rest easy. 🌙✨"
  }
]

function SafeheavenModal({ onClose }) {
  const [selectedNote, setSelectedNote] = useState(null)

  return (
    <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[#FFB6C1]/30 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative glass-card rounded-3xl p-6 sm:p-10 w-full max-w-lg max-h-[90vh] overflow-y-auto animate-[popIn_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)]">
        {/* Close button */}
        <button
          id="safeheaven-modal-close"
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 text-[#FF6B8B] text-xl font-fredoka hover:bg-[#FFB6C1] hover:text-white transition-all duration-200 hover:scale-110 z-10"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">💭</div>
          <h2 className="font-fredoka text-2xl text-[#FF6B8B]">SAFEHEAVEN</h2>
          <p className="font-quicksand text-[#aaa] text-xs mt-1">Open when you need comfort or love 💙</p>
        </div>

        {selectedNote === null ? (
          /* List of choices */
          <div className="space-y-3">
            <p className="font-quicksand text-sm text-[#8a8a8a] text-center mb-4">
              Click on a situation below to open your safe haven note...
            </p>
            {OPEN_WHENS.map((note, i) => (
              <button
                key={i}
                onClick={() => setSelectedNote(i)}
                className="w-full text-left p-4 rounded-2xl bg-white/60 border-2 border-[#FFE0E6] hover:border-[#FFB6C1] hover:bg-[#FFF5F7] transition-all duration-200 flex items-center gap-4 group"
              >
                <span className="text-3xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-200">
                  {note.icon}
                </span>
                <div>
                  <h3 className="font-fredoka text-base text-[#FF6B8B] group-hover:translate-x-1 transition-transform duration-200">
                    Open when you...
                  </h3>
                  <p className="font-quicksand text-xs sm:text-sm text-[#7a7a9a] font-semibold mt-0.5">
                    {note.title}
                  </p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          /* Single note view */
          <div className="animate-[slideUp_0.3s_ease-out]">
            <button
              onClick={() => setSelectedNote(null)}
              className="text-[#FF6B8B] font-quicksand text-sm font-bold flex items-center gap-1.5 mb-4 hover:underline"
            >
              ← Back to choices
            </button>
            <div className="p-6 rounded-2xl bg-white/80 border-2 border-[#FFB6C1] shadow-soft relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFE5EC] rounded-full -translate-y-1/2 translate-x-1/2 opacity-40 blur-xl pointer-events-none" />
              <div className="text-4xl mb-3 text-center">{OPEN_WHENS[selectedNote].icon}</div>
              <h3 className="font-fredoka text-lg text-center text-[#FF6B8B] mb-1">
                Open when you...
              </h3>
              <p className="font-quicksand text-sm text-center text-[#555] font-bold mb-4 italic">
                {OPEN_WHENS[selectedNote].title}
              </p>
              <div className="w-full h-0.5 bg-[#FFE0E6] mb-4" />
              <p className="font-comic text-sm sm:text-base text-[#4a4a5a] leading-relaxed text-center whitespace-pre-line">
                {OPEN_WHENS[selectedNote].content}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SafeheavenModal
