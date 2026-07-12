import { useState } from 'react'

const CORRECT_PASSWORD = 'Blue'

function SecretGate({ onSuccess }) {
  const [password, setPassword] = useState('')
  const [checked, setChecked] = useState(false)
  const [error, setError] = useState('')
  const [shake, setShake] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleContinue = () => {
    if (!checked) {
      setError("Don't forget to check the box! 🐾")
      triggerShake()
      return
    }
    if (password.trim().toLowerCase() !== CORRECT_PASSWORD.toLowerCase()) {
      setError("Hmm... that's not the right word! Try again 🔑")
      triggerShake()
      return
    }
    setError('')
    setSuccess(true)
    setTimeout(onSuccess, 800)
  }

  const triggerShake = () => {
    setShake(true)
    setTimeout(() => setShake(false), 500)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleContinue()
  }

  return (
    <div className="min-h-screen bg-stripe flex items-center justify-center p-4 relative z-10">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-babyblue rounded-full opacity-30 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-softyellow rounded-full opacity-30 blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div
        className={`glass-card rounded-3xl p-8 sm:p-12 w-full max-w-md transition-all duration-300 ${
          success ? 'scale-95 opacity-0' : 'animate-[slideUp_0.6s_cubic-bezier(0.175,0.885,0.32,1.275)]'
        } ${shake ? 'animate-[wiggle_0.4s_ease-in-out]' : ''}`}
      >
        {/* Lock icon */}
        <div className="text-center mb-6">
          <div className="text-6xl animate-float inline-block">🔮</div>
          <h1 className="font-fredoka text-3xl sm:text-4xl text-[#5B9BD5] mt-3 leading-tight">
            Secret Entrance
          </h1>
          <p className="font-quicksand text-[#7aabcc] text-base sm:text-lg mt-2 font-medium">
            Enter the password to view your surprise ✨
          </p>
        </div>

        {/* Password input */}
        <div className="mb-5">
          <label className="font-quicksand text-sm font-700 text-[#5B9BD5] mb-2 block font-semibold">
            🔑 Secret Word
          </label>
          <input
            id="password-input"
            type="text"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError('') }}
            onKeyDown={handleKeyDown}
            placeholder="Type the secret word..."
            className="cute-input w-full px-5 py-4 rounded-2xl border-2 border-[#BFDFFF] bg-white/80 font-quicksand text-[#4a90c4] placeholder-[#b0d4ef] text-base font-medium transition-all duration-200 focus:border-[#89CFF0]"
          />
        </div>

        {/* Custom checkbox */}
        <div className="mb-6">
          <label
            htmlFor="not-robot-check"
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div
              onClick={() => setChecked(!checked)}
              className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                checked
                  ? 'bg-[#89CFF0] border-[#89CFF0] scale-110'
                  : 'bg-white border-[#BFDFFF] group-hover:border-[#89CFF0]'
              }`}
            >
              {checked && (
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <input
              id="not-robot-check"
              type="checkbox"
              checked={checked}
              onChange={() => setChecked(!checked)}
              className="sr-only"
            />
            <span className="font-quicksand text-[#5B9BD5] text-sm sm:text-base font-semibold leading-snug">
              I am not a robot (I'm a good friend) 🐾
            </span>
          </label>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 px-4 py-3 bg-[#FFE0E6] border-2 border-[#FFB6C1] rounded-2xl">
            <p className="font-quicksand text-[#d46080] text-sm font-semibold text-center">{error}</p>
          </div>
        )}

        {/* Continue button */}
        <button
          id="continue-btn"
          onClick={handleContinue}
          className="pill-btn w-full py-4 px-8 bg-gradient-to-r from-[#89CFF0] to-[#5B9BD5] text-white font-fredoka text-xl rounded-2xl shadow-soft hover:shadow-glow transition-all duration-200"
        >
          Continue ✨
        </button>

        <p className="text-center text-[#99c4de] text-xs mt-4 font-quicksand">
          Hint: The color you've always been in my life 💙 
        </p>
      </div>
    </div>
  )
}

export default SecretGate
