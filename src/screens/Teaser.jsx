import { useState } from 'react'

function Teaser({ onYes }) {
  const [noCount, setNoCount] = useState(0)
  const [showGrumpy, setShowGrumpy] = useState(false)
  const [leaving, setLeaving] = useState(false)

  const handleYes = () => {
    setLeaving(true)
    setTimeout(onYes, 700)
  }

  const handleNo = () => {
    setNoCount(c => c + 1)
    setShowGrumpy(true)
  }

  const handleBack = () => {
    setShowGrumpy(false)
    setNoCount(0)
  }

  const noMessages = [
    'SERIOUSLY!? How dare you hmph 😤',
    "You clicked 'No' AGAIN!? That's just rude! 🙅",
    "Ok, I'm done talking to you... Just kidding, please say Yes! 🥺",
    "Fine. Be that way. I made this with LOVE you know 💔",
    '...are you testing me? Because I will keep waiting. 👀',
  ]

  return (
    <div
      className={`min-h-screen bg-stars flex items-center justify-center p-4 relative z-10 transition-all duration-700 ${
        leaving ? 'opacity-0 scale-95' : 'opacity-100'
      }`}
    >
      {/* Blobs */}
      <div className="absolute top-10 right-10 w-48 h-48 bg-lavender rounded-full opacity-40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-56 h-56 bg-paleyellow rounded-full opacity-40 blur-3xl pointer-events-none" />

      <div className="glass-card rounded-3xl p-8 sm:p-12 w-full max-w-sm text-center animate-[popIn_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)]">
        {!showGrumpy ? (
          <>
            {/* Dog with flower */}
            <div className="animate-float inline-block mb-4">
              <img
                src="/dog_flower.png"
                alt="Cute dog holding flowers"
                className="w-48 h-48 sm:w-56 sm:h-56 object-contain mx-auto drop-shadow-lg"
              />
            </div>

            <h2 className="font-fredoka text-3xl sm:text-4xl bg-gradient-to-r from-[#8B5CF6] to-[#5B9BD5] bg-clip-text text-transparent mb-3">
              Hey there! 🌸
            </h2>
            <p className="font-quicksand text-[#7B6B96] text-base sm:text-lg font-semibold mb-8 leading-relaxed">
              I made something special just for you.<br />
              <span className="text-[#C5A8E0]">Do you wanna see it?</span> 🎁
            </p>

            <div className="flex gap-4 justify-center">
              <button
                id="yes-btn"
                onClick={handleYes}
                className="pill-btn px-10 py-4 bg-gradient-to-r from-[#89CFF0] to-[#5B9BD5] text-white font-fredoka text-xl rounded-full shadow-soft"
              >
                Yes! 🎉
              </button>
              <button
                id="no-btn"
                onClick={handleNo}
                className="pill-btn px-10 py-4 bg-white border-2 border-[#BFDFFF] text-[#5B9BD5] font-fredoka text-xl rounded-full shadow-card"
              >
                No 😐
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Grumpy dog */}
            <div className="animate-[wiggle_0.5s_ease-in-out_3] inline-block mb-4">
              <img
                src="/dog_grumpy.png"
                alt="Grumpy dog"
                className="w-44 h-44 sm:w-52 sm:h-52 object-contain mx-auto drop-shadow-lg"
              />
            </div>

            <h2 className="font-fredoka text-2xl sm:text-3xl text-[#d46080] mb-3">
              {noMessages[Math.min(noCount - 1, noMessages.length - 1)]}
            </h2>

            <p className="font-quicksand text-[#aaa] text-sm mb-6 font-medium">
              (Click No: {noCount} time{noCount !== 1 ? 's' : ''}... really? 😒)
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <button
                id="grumpy-yes-btn"
                onClick={handleYes}
                className="pill-btn px-8 py-3 bg-gradient-to-r from-[#89CFF0] to-[#5B9BD5] text-white font-fredoka text-lg rounded-full shadow-soft"
              >
                Ok ok, Yes! 🥰
              </button>
              <button
                id="go-back-btn"
                onClick={handleBack}
                className="pill-btn px-8 py-3 bg-white border-2 border-[#FFB6C1] text-[#d46080] font-fredoka text-lg rounded-full shadow-card"
              >
                Go Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Teaser
