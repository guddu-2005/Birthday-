const LETTER_LINES = [
  { text: 'Dear You,', style: 'font-fredoka text-2xl text-[#8B5CF6] mb-2' },
  { text: '' },
  { text: "Today is your special day — and I couldn't let it pass without telling you how incredibly wonderful you are. 🌸", style: 'mb-2' },
  { text: '' },
  { text: "You light up every room you walk into. Your laugh is contagious, your heart is golden, and your kindness makes the world a softer place. ✨", style: 'mb-2' },
  { text: '' },
  { text: "I've been so lucky to have you in my life. Every moment with you feels like sunshine — even the rainy days. ☀️🌧️", style: 'mb-2' },
  { text: '' },
  { text: "On your birthday, I wish you all the joy, all the cake, and all the adventures you deserve. May this year be your most magical one yet! 🎂🌟", style: 'mb-2' },
  { text: '' },
  { text: "Always remember: you are loved more than you know.", style: 'mb-2' },
  { text: '' },
  { text: "With all the stars and all the love,", style: 'text-[#C5A8E0] italic mb-1' },
  { text: "Your Biggest Fan 🐾💌", style: 'font-fredoka text-xl text-[#89CFF0]' },
]

function LetterModal({ onClose }) {
  return (
    <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[#C5A8E0]/30 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto animate-[popIn_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)]">
        {/* Paper shadow */}
        <div className="absolute inset-0 bg-[#e8e0b0] rounded-2xl translate-x-2 translate-y-2" />

        {/* Notebook paper */}
        <div className="relative notebook-paper rounded-2xl p-6 sm:p-10 border-2 border-[#d4c870]/50 shadow-yellow">
          {/* Red margin line */}
          <div className="absolute left-16 top-0 bottom-0 border-l-2 border-[#FFB6C1]/60 pointer-events-none" />

          {/* Hole punches */}
          <div className="absolute left-5 top-10 w-5 h-5 rounded-full bg-[#FFF9C4] border-2 border-[#d4c870]/50 shadow-inner" />
          <div className="absolute left-5 top-1/2 w-5 h-5 rounded-full bg-[#FFF9C4] border-2 border-[#d4c870]/50 shadow-inner" />
          <div className="absolute left-5 bottom-10 w-5 h-5 rounded-full bg-[#FFF9C4] border-2 border-[#d4c870]/50 shadow-inner" />

          {/* Close button */}
          <button
            id="letter-modal-close"
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 text-[#8B5CF6] text-xl font-fredoka hover:bg-[#C5A8E0] hover:text-white transition-all duration-200 hover:scale-110 z-10"
          >
            ✕
          </button>

          <div className="text-center mb-6 mt-2">
            <div className="text-4xl mb-1 animate-pulse-soft inline-block">💌</div>
          </div>

          <div className="pl-10 pr-4 font-comic text-[#444] text-sm sm:text-base leading-[29px] space-y-0">
            {LETTER_LINES.map((line, i) => (
              <p
                key={i}
                className={`leading-[29px] ${line.style || ''}`}
                style={{ minHeight: '29px' }}
              >
                {line.text || '\u00A0'}
              </p>
            ))}
          </div>

          {/* Doodle decoration */}
          <div className="text-right mt-4 text-2xl pr-4">🌸 ⭐ 🌙</div>
        </div>
      </div>
    </div>
  )
}

export default LetterModal
