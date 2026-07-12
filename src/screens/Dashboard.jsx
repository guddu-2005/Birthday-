import { useState } from 'react'
import PhotoModal from '../components/PhotoModal'
import LetterModal from '../components/LetterModal'
import MusicModal from '../components/MusicModal'
import SafeheavenModal from '../components/SafeheavenModal'

const GIFTS = [
  {
    id: 'photo',
    emoji: '📷',
    label: 'Pieces of US',
    sublabel: 'Our moments together',
    gradient: 'from-[#89CFF0] to-[#5B9BD5]',
    shadow: 'shadow-soft',
    bgLight: 'bg-[#EAF6FF]',
    rotate: '-2deg',
  },
  {
    id: 'letter',
    emoji: '💌',
    label: 'Words I Could Never Say Out Loud',
    sublabel: 'Echo of my heart',
    gradient: 'from-[#C5A8E0] to-[#8B5CF6]',
    shadow: 'shadow-[0_8px_32px_rgba(197,168,224,0.4)]',
    bgLight: 'bg-[#F5EEFF]',
    rotate: '1.5deg',
  },
  {
    id: 'music',
    emoji: '📼',
    label: 'Song that   reminds me of you',
    sublabel: "This One's for u",
    gradient: 'from-[#FFE082] to-[#FFB300]',
    shadow: 'shadow-yellow',
    bgLight: 'bg-[#FFFDE7]',
    rotate: '-1deg',
  },
  {
    id: 'safeheaven',
    emoji: '💭',
    label: 'If You Ever Need Me',
    sublabel: 'Open when you ......',
    gradient: 'from-[#FFB6C1] to-[#FF6B8B]',
    shadow: 'shadow-[0_8px_32px_rgba(255,182,193,0.4)]',
    bgLight: 'bg-[#FFEBF0]',
    rotate: '2deg',
  },
]

// Animated birthday text letters
const BDAY_TEXT = "HAPPY BIRTHDAY"

function Dashboard() {
  const [activeModal, setActiveModal] = useState(null)

  return (
    <div className="min-h-screen bg-stars flex flex-col items-center justify-start pb-12 pt-10 px-4 relative z-10">
      {/* Decorative top blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-lavender rounded-full opacity-30 blur-3xl -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute top-20 right-0 w-60 h-60 bg-paleyellow rounded-full opacity-30 blur-3xl translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 w-80 h-60 bg-babyblue rounded-full opacity-25 blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* Happy Birthday title */}
      <div className="mb-6 animate-[slideUp_0.6s_cubic-bezier(0.175,0.885,0.32,1.275)]">
        <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
          {BDAY_TEXT.split('').map((char, i) => (
            <span
              key={i}
              className="font-fredoka text-3xl sm:text-5xl inline-block animate-bounce-slow"
              style={{
                animationDelay: `${i * 0.08}s`,
                color: ['#89CFF0', '#FFE082', '#FFB6C1', '#C5A8E0', '#B8F0D4'][i % 5],
                textShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
        <p className="text-center font-fredoka text-xl sm:text-2xl text-[#89CFF0] mt-1 animate-pulse-soft">
          🎂 To my "SAFEHEAVEN" 🎂
        </p>
      </div>

      {/* Profile picture */}
      <div className="animate-[popIn_0.5s_0.3s_cubic-bezier(0.175,0.885,0.32,1.275)_backwards] mb-6">
        <div className="relative">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-white shadow-soft animate-float">
            <img
              src="/birthday_person.png"
              alt="Birthday person"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Sparkle ring */}
          <div className="absolute -inset-2 rounded-full border-4 border-dashed border-[#89CFF0]/50 animate-spin-slow pointer-events-none" />
          {/* Crown */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-3xl animate-bounce-slow">👑</div>
        </div>
      </div>

      {/* Subtitle */}
      <p className="font-quicksand text-[#7aabcc] text-base sm:text-lg font-semibold mb-10 text-center animate-[fadeIn_0.6s_0.5s_ease-out_backwards]">
        Click on each item to open your gifts! 🎁
      </p>

      {/* Gift cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
        {GIFTS.map((gift, i) => (
          <button
            key={gift.id}
            id={`gift-${gift.id}`}
            onClick={() => setActiveModal(gift.id)}
            className={`sticker-btn glass-card rounded-3xl p-6 flex flex-col items-center gap-3 text-center ${gift.shadow} animate-[slideUp_0.5s_${0.2 + i * 0.15}s_cubic-bezier(0.175,0.885,0.32,1.275)_backwards]`}
            style={{
              transform: `rotate(${gift.rotate})`,
              animationDelay: `${0.2 + i * 0.15}s`,
            }}
          >
            {/* Emoji icon */}
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gift.gradient} flex items-center justify-center text-4xl shadow-lg`}>
              {gift.emoji}
            </div>
            <div>
              <p className="font-fredoka text-xl text-[#4a4a6a]">{gift.label}</p>
              <p className="font-quicksand text-[#aaa] text-xs font-medium mt-0.5">{gift.sublabel}</p>
            </div>
            <div className={`px-4 py-1.5 rounded-full bg-gradient-to-r ${gift.gradient} text-white font-quicksand text-xs font-bold shadow-md`}>
              Tap to open! ✨
            </div>
          </button>
        ))}
      </div>

      {/* Bottom message */}
      <div className="mt-12 glass-card rounded-2xl px-6 py-4 max-w-sm text-center animate-[fadeIn_1s_1s_ease-out_backwards]">
        <p className="font-quicksand text-[#5B9BD5] text-sm font-semibold leading-relaxed">
          🌟 You deserve all the love in the galaxy and beyond. Have the most magical birthday! 🌙✨
        </p>
      </div>

      {/* Balloon decorations */}
      {['🎈', '🎀', '🎊', '🌸'].map((em, i) => (
        <div
          key={i}
          className="fixed text-3xl pointer-events-none animate-float"
          style={{
            left: `${[5, 88, 10, 85][i]}%`,
            top: `${[20, 15, 65, 70][i]}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${3 + i * 0.5}s`,
            zIndex: 5,
          }}
        >
          {em}
        </div>
      ))}

      {/* Modals */}
      {activeModal === 'photo' && <PhotoModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'letter' && <LetterModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'music' && <MusicModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'safeheaven' && <SafeheavenModal onClose={() => setActiveModal(null)} />}
    </div>
  )
}

export default Dashboard
