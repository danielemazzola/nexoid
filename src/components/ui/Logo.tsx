import "./logo.css";

/** Logo NexoID vectorial (marca + palabra), nítido en cualquier tamaño. */
interface LogoProps {
  showText?: boolean;
  size?: number;
}

const Logo = ({ showText = true, size = 30 }: LogoProps) => (
  <span className="logo">
    <svg
      className="logo_mark"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logo-g" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3ad6ff" />
          <stop offset="1" stopColor="#2f6bff" />
        </linearGradient>
      </defs>
      <g stroke="url(#logo-g)" strokeWidth="4.5" strokeLinecap="round">
        <path d="M14 14v36M50 14v36M14 21l36 29M50 14L31 31" />
      </g>
      <g fill="url(#logo-g)">
        <circle cx="14" cy="14" r="6.5" />
        <circle cx="50" cy="14" r="6.5" />
        <circle cx="14" cy="50" r="6.5" />
        <circle cx="50" cy="50" r="6.5" />
      </g>
    </svg>
    {showText && (
      <span className="logo_text">
        NEXO<span>ID</span>
      </span>
    )}
  </span>
);

export default Logo;
