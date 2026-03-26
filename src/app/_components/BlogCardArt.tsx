export function BlogCardArt({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: '3/2', backgroundColor: '#D4A017' }}
    >
      <svg
        viewBox="0 0 630 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Main stem */}
        <path
          d="M200 820 C220 700, 260 620, 280 560 C300 500, 290 460, 300 420 C310 380, 330 340, 340 300 C350 260, 340 220, 350 180"
          stroke="#F63F34"
          strokeWidth="28"
          strokeLinecap="round"
          fill="none"
        />
        {/* Bottom-left large leaf */}
        <path
          d="M200 780 C120 720, 40 680, -20 640 C-60 620, -80 580, -40 540 C0 500, 80 520, 140 560 C200 600, 220 660, 210 740 Z"
          fill="#F63F34"
        />
        {/* Left mid leaf (round) */}
        <path
          d="M260 580 C200 540, 140 520, 100 480 C60 440, 80 380, 130 370 C180 360, 220 400, 240 450 C260 500, 260 550, 260 580 Z"
          fill="#F63F34"
        />
        {/* Left upper cherry/oval */}
        <path
          d="M290 440 C240 400, 200 350, 190 300 C180 250, 210 210, 250 220 C290 230, 300 280, 300 330 C300 380, 290 420, 290 440 Z"
          fill="#F63F34"
        />
        {/* Right large leaf (sweeping up-right) */}
        <path
          d="M340 340 C380 280, 420 200, 460 120 C480 80, 520 20, 560 -20 C600 -60, 640 -20, 640 40 C640 100, 600 180, 540 260 C480 340, 400 380, 340 360 Z"
          fill="#F63F34"
        />
        {/* Right lower cherry/oval */}
        <path
          d="M320 480 C360 440, 420 400, 480 390 C540 380, 560 420, 540 460 C520 500, 460 520, 400 530 C340 540, 320 520, 320 480 Z"
          fill="#F63F34"
        />
        {/* Bottom-right large cherry */}
        <path
          d="M280 640 C320 580, 380 540, 440 520 C500 500, 560 520, 560 580 C560 640, 520 700, 460 730 C400 760, 320 740, 280 700 Z"
          fill="#F63F34"
        />
      </svg>
    </div>
  );
}
