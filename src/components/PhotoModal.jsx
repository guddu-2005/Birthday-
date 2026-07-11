const MEMORIES = [
  {
    img: '/memory1.png',
    caption: 'Our best picnic ever 🌸',
    date: 'Summer 2023',
    rotate: '-3deg',
  },
  {
    img: '/memory2.png',
    caption: 'That coffee date ☕',
    date: 'Autumn 2023',
    rotate: '2deg',
  },
  {
    img: '/memory3.png',
    caption: 'Birthday chaos, best day! 🎉',
    date: 'Your last birthday',
    rotate: '-2deg',
  },
]

function PhotoModal({ onClose }) {
  return (
    <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[#7B6B96]/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative glass-card rounded-3xl p-6 sm:p-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-[popIn_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)]">
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
          <h2 className="font-fredoka text-3xl text-[#5B9BD5]">Memory Lane</h2>
          <p className="font-quicksand text-[#aaa] text-sm mt-1">Our little adventures together 💛</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-items-center">
          {MEMORIES.map((mem, i) => (
            <div
              key={i}
              className="polaroid cursor-pointer"
              style={{ transform: `rotate(${mem.rotate})`, animationDelay: `${i * 0.1}s` }}
            >
              <img
                src={mem.img}
                alt={mem.caption}
                className="w-full h-40 sm:h-36 object-cover rounded-sm"
              />
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
  )
}

export default PhotoModal
