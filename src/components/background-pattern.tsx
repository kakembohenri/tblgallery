export function BackgroundPattern() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-10">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <defs>
          <pattern
            id="pattern"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 0L40 40ZM40 0L0 40Z"
              stroke="rgba(220, 38, 38, 0.2)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pattern)" />
      </svg>
    </div>
  );
}
