import { useState } from 'react'

const OPEN_WHENS = [
  {
    icon: '🌧️',
    title: '...are sad',
    content: `If you're reading this, I wish I could be physically present there with you right now. But even when I'm not beside you, remember that you always have me in your heart, and I'll always be just a message or a call away.

As you once said, "Koi bhi baat ho, ek baar ro le, but never again." And bro, that applies to you too. Cry if you need to, feel whatever you need to feel, but don't let one bad day convince you that everything is going to stay this way.

And please, if I ever hurt you, confront me. Slap me if you need to, beat me up if you have to, but never cut me off and go silent. 😭 Because yrr, I can tolerate all your dramas, your bak-bak and everything else with love, but your silence? That's genuinely hard for me to deal with.

And remember, bro, it's us.
"Let it be bro, jo hoga dekha jaega. It all will pass."

So whatever it is, don't face it alone. Come to me — even if all you have to say is "bro, I'm not okay." I'll understand. 💙`
  },
  {
    icon: '🧸',
    title: '...miss me',
    content: `Ohh, so u got time for me from your Patidev, aka my sautan? Yeah yeah, I know u don't miss me. 🙄😂

Yeah, I know I'm far away from u, but don't worry, I'm still yours. Nobody can have your residential place. 😌💙

Hey stupid, just go through our chats and the calling hours. I guess we have stored enough pictures and memories before our 12th. Just look at all those stupid conversations, our endless calls, random screenshots, silly pictures and everything we've shared. I'm pretty sure we've left enough evidence of our craziness to last us for a while. 😭

And if u still miss me after all that, then yeah… I guess I'm allowed to miss u too. 💙

Distance is just distance, bro. It doesn't change our place in each other's lives. So whenever u miss me, just remember — it's still us. Always. 🫂💙`
  },
  {
    icon: '💡',
    title: '...doubt yourself',
    content: `Hey stupid, before you start doubting yourself again, just remember who you are. I know there will be days when you feel like you're not doing enough, you're not good enough, or maybe you're falling behind — but please don't let one difficult moment decide how you see yourself.

And you know what? My Preet can do it. Anyhow, she will figure it out. I know you. Somehow, even when you have no idea what you're doing, you'll find your way through it. 😭

You've come so far, and I've seen parts of you that you probably don't even realise are worth admiring. So when your own mind starts being unfair to you, borrow my belief in you for a while. You don't have to have everything figured out right now. Take your time, make mistakes, learn, cry if you need to, and start again.

And whenever you forget your worth, come back here and let me remind you: I believe in you, even on the days you don't believe in yourself. 💙

Because it's you. My Preet can do it. Somehow, anyhow—she'll figure it out. 💙`
  },
  {
    icon: '🌌',
    title: '...forget how amazing you are',
    content: `Hey Preet, if you're reading this, I think you need a little reminder from someone who has had the privilege of knowing you for all these years. You probably don't realise how many little things about you make you special — the way you care, the way you understand people, the way you make ordinary moments fun, and the way you somehow make people feel comfortable just by being yourself.

And your beauty, girl… it's like the softness of dawn, gentle and quiet, yet somehow impossible to ignore. Like the first sunlight of a new day, warm, bright and capable of making everything around it feel a little more beautiful. So never, ever doubt your beauty, okay?

Because it's in your kindness, your laughter, your heart, your weirdness, your little habits — that's the beauty I see in you. 💙

So please don't let one bad day, one mistake, or one person's opinion make you forget your worth.
And if you ever forget how amazing you are, come back here. I'll remind you as many times as you need.
Because, girl, you are a whole universe of beautiful things—and I hope you never forget that. 💙`
  },
  {
    icon: '🫂',
    title: '...need comfort or love',
    content: `Hey, come here. Just for a moment, stop. Breathe. You are allowed to just exist without fixing everything.

I don't know what you're feeling right now — maybe it's heavy, maybe it's quiet, maybe it's something you can't even put into words. But whatever it is, I want you to know that you don't have to carry it perfectly. You don't have to be okay right now.

You are so deeply loved, Preet. Not because of what you do or how strong you are, but simply because of who you are.

So if you need a hug — here it is. A big, warm, genuine one from me to you. 🫂

And if you need to talk, I'm here. Always. No matter the time, no matter the reason. Just say the word and I'll be there.

You are never, ever alone in this. It's us, remember? 💙`
  }
]

function SafeheavenModal({ onClose }) {
  const [selectedNote, setSelectedNote] = useState(null)

  const note = selectedNote !== null ? OPEN_WHENS[selectedNote] : null

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
          <h2 className="font-fredoka text-2xl text-[#FF6B8B]">If You Ever Need Me</h2>
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
          /* Letter-style note view */
          <div className="animate-[slideUp_0.3s_ease-out]">
            <button
              onClick={() => setSelectedNote(null)}
              className="text-[#FF6B8B] font-quicksand text-sm font-bold flex items-center gap-1.5 mb-4 hover:underline"
            >
              ← Back to choices
            </button>

            {/* Letter card */}
            <div
              className="relative rounded-2xl border-2 border-[#FFB6C1] shadow-soft overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #fffaf9 0%, #fff5f7 100%)' }}
            >
              {/* Letter header / stamp area */}
              <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-dashed border-[#FFD6E0]">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{note.icon}</span>
                  <div>
                    <p className="font-fredoka text-xs text-[#FF6B8B] uppercase tracking-widest">Open when you</p>
                    <p className="font-quicksand text-sm font-bold text-[#c0607a] italic">{note.title}</p>
                  </div>
                </div>
                {/* Postage stamp */}
                <div className="w-12 h-12 rounded-md border-2 border-[#FFB6C1] flex flex-col items-center justify-center bg-white/70 rotate-2 shadow-sm">
                  <span className="text-xl">💙</span>
                  <span className="text-[8px] font-quicksand text-[#FF6B8B] font-bold tracking-tight"></span>
                </div>
              </div>

              {/* Ruled letter body */}
              <div
                className="relative px-6 py-5"
                style={{
                  backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #FFE8EE 27px, #FFE8EE 28px)',
                  backgroundPositionY: '8px'
                }}
              >
                {/* Salutation */}
                <p className="font-quicksand text-sm font-bold text-[#d05070] mb-4 italic">
                  Hey Preet, 💌
                </p>

                {/* Body — split by double newlines for paragraph spacing */}
                {note.content.split('\n\n').map((para, idx) => (
                  <p
                    key={idx}
                    className="font-comic text-sm sm:text-[15px] text-[#4a4a5a] leading-[28px] mb-4 whitespace-pre-line"
                  >
                    {para}
                  </p>
                ))}

                {/* Sign-off */}
                <div className="mt-5 text-right">
                  <p className="font-quicksand text-xs text-[#aaa] italic">With all my love,</p>
                  <p className="font-fredoka text-base text-[#FF6B8B] mt-0.5">Nibu 💙</p>
                </div>
              </div>

              {/* Decorative blobs */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFE5EC] rounded-full -translate-y-1/2 translate-x-1/2 opacity-30 blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-[#FFD6E0] rounded-full translate-y-1/2 -translate-x-1/2 opacity-30 blur-2xl pointer-events-none" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SafeheavenModal
