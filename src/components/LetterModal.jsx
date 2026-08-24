import React from 'react'

const ENGLISH_PARAS = [
  "I don't think I'll ever find enough words to explain what you mean to me, but today I'll try.",
  "Thank you for being the person who made me feel safe without ever asking me to be anyone else. Thank you for understanding my messy thoughts, my random messages, my silence, and even the feelings I couldn't explain. Somehow, you always understood what I meant, even when I couldn't find the right words.",
  "You never judged me for being emotional, overthinking, or having bad days. Instead, you stayed. And sometimes, just knowing you were there was enough to make everything feel a little lighter.",
  "Every memory we've made, whether it was something big or just a random conversation, has become a part of me. I don't know if you realize it, but you've given me comfort in ways you probably never even noticed.",
  "You're not just my best friend. You're my safe place, my comfort, and my blue person—the one who brings peace when life feels too loud.",
  "I hope this birthday reminds you how loved you are, not just today, but every single day. I hope you always believe in yourself the way I believe in you. I hope your dreams find you, your smile never fades, and life is always kind to you.",
  "No matter where life takes us, I hope we never become strangers. I hope years from now we'll still laugh over the same silly things, celebrate each other's victories, and be there through the difficult days too.",
  "Thank you for choosing to stay in my life. Thank you for being you.",
  "Happy Birthday once again, my kuchu puchu. 💙",
  "I hope this year brings you everything your heart has been quietly wishing for."
]

const HINDI_STANZAS = [
  `कभी-कभी कुछ रिश्तों को नाम देने की ज़रूरत नहीं होती,
बस उनका होना ही काफ़ी होता है।
और तू मेरे लिए वही रिश्ता है—
जिसे समझाने बैठूँ तो शायद शब्द कम पड़ जाएँ,
और महसूस करूँ तो दिल भर आए।`,

  `मेरी अधूरी बातों को पूरा समझ लेना,
मेरी खामोशी में भी मुझे पढ़ लेना,
मैं शब्दों में उलझती रही,
और तूने बिना पूछे सब समझ लिया।
शायद यही तो तू है—
मेरी अनकही बातों का सबसे खूबसूरत जवाब।`,

  `कुछ लोग ज़िंदगी में आते हैं,
कुछ पल साथ चलते हैं और फिर याद बन जाते हैं।
लेकिन कुछ लोग ऐसे होते हैं
जो याद नहीं बनते,
ज़िंदगी का हिस्सा बन जाते हैं।
तू उन्हीं में से एक है।`,

  `और अगर कभी ज़िंदगी मुझसे पूछे—
“सबसे खूबसूरत संयोग कौन-सा था?”
तो शायद मैं बस मुस्कुराकर कहूँगी—
“एक लड़की मिली थी,
जो मेरी आधी-अधूरी बातों में भी
मेरा पूरा मतलब समझ जाती थी।”`,

  `कुछ रिश्ते किस्मत से मिलते हैं,
कुछ दुआओं से,
और कुछ…
बस यूँ ही मिल जाते हैं,
जैसे ज़िंदगी ने चुपके से
हमारे लिए पहले ही कुछ लिख रखा हो।`,

  `शायद तू भी मेरी ज़िंदगी का
वही लिखा हुआ हिस्सा है—
जिसे मैंने माँगा नहीं था,
पर आज खोने का ख्याल भी अच्छा नहीं लगता।`
]

function LetterModal({ onClose }) {
  return (
    <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[#C5A8E0]/30 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto animate-[popIn_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)]">
        {/* Paper shadow */}
        <div className="absolute inset-0 bg-[#e8e0b0] rounded-2xl translate-x-2 translate-y-2" />

        {/* Notebook paper */}
        <div className="relative notebook-paper rounded-2xl p-6 sm:p-10 border-2 border-[#d4c870]/50 shadow-yellow">
          {/* Red margin line */}
          <div className="absolute left-12 sm:left-16 top-0 bottom-0 border-l-2 border-[#FFB6C1]/60 pointer-events-none" />

          {/* Hole punches */}
          <div className="absolute left-4 sm:left-5 top-10 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#FFF9C4] border-2 border-[#d4c870]/50 shadow-inner" />
          <div className="absolute left-4 sm:left-5 top-1/2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#FFF9C4] border-2 border-[#d4c870]/50 shadow-inner" />
          <div className="absolute left-4 sm:left-5 bottom-10 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#FFF9C4] border-2 border-[#d4c870]/50 shadow-inner" />

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

          <div className="pl-8 sm:pl-12 pr-2 font-comic text-[#444] text-sm sm:text-base leading-[28px]">
            {/* Title */}
            <h2 className="font-fredoka text-2xl sm:text-3xl text-[#5B9BD5] mb-6">
              Happy Birthday, PREET. 💙
            </h2>

            {/* English Letter Paragraphs */}
            <div className="space-y-4 mb-8">
              {ENGLISH_PARAS.map((para, idx) => (
                <p key={idx} className="text-[#333] font-medium leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {/* Sign-off */}
            <div className="mb-10 text-right pr-4">
              <p className="font-fredoka text-lg text-[#5B9BD5]">💙 Yours, Nibu</p>
            </div>

            {/* Decorative Divider */}
            <div className="my-8 border-t-2 border-dashed border-[#C5A8E0]/40 pt-6 text-center">
              <p className="font-quicksand italic text-xs sm:text-sm text-[#8B5CF6] font-semibold bg-[#FFF5F7] py-2 px-3 rounded-xl border border-[#FFB6C1]/40 inline-block shadow-sm">
                "Itna acha nahi par kuch likha he apke लिए dill ki panon se ....." ✨
              </p>
            </div>

            {/* Hindi Poem Stanzas */}
            <div className="space-y-6 text-[#2c2c3e] font-quicksand font-semibold text-base sm:text-lg leading-relaxed bg-[#FFFDE7]/60 p-4 sm:p-6 rounded-2xl border border-[#FFE082]/60 shadow-sm">
              {HINDI_STANZAS.map((stanza, idx) => (
                <div key={idx} className="whitespace-pre-line border-b border-dashed border-[#C5A8E0]/20 pb-4 last:border-b-0 last:pb-0">
                  {stanza}
                </div>
              ))}
            </div>

            {/* Ending doodle */}
            <div className="text-center mt-8 text-2xl">
              🌸 ⭐ 💙 🌙 ✨
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LetterModal
