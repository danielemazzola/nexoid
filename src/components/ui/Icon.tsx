/**
 * Iconos lineales propios (24x24, stroke). Uso: <Icon name="shield" />
 */

const paths = {
  shield: (
    <>
      <path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6L12 3z" />
      <path d="M8.8 12.2l2.2 2.2 4.3-4.6" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </>
  ),
  radar: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 12l6-6" />
    </>
  ),
  clipboard: (
    <>
      <rect x="5" y="4.5" width="14" height="16.5" rx="2.5" />
      <path d="M9 4.5h6v2.5H9zM8.5 12h7M8.5 16h4.5" />
    </>
  ),
  bolt: <path d="M13 2.5L4.5 13.5H11l-1 8 8.5-11H12l1-8z" />,
  terminal: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <path d="M7 9.5l3 2.5-3 2.5M12.5 15H17" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="M11 12l9-9M16.5 6.5l2.5 2.5M14 9l2 2" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3.5" />
      <path d="M2.5 20c.6-3.4 3.2-5.5 6.5-5.5s5.9 2.1 6.5 5.5" />
      <path d="M15.5 5.2a3.5 3.5 0 010 6.6M18 14.8c1.9.7 3.2 2.5 3.5 5.2" />
    </>
  ),
  cloud: (
    <>
      <path d="M7 18.5a4.5 4.5 0 01-.6-9A6 6 0 0118 8.2a4.2 4.2 0 01-.5 10.3H7z" />
    </>
  ),
  chat: (
    <>
      <path d="M4 5.5h16v11H9.5L5 20v-3.5H4z" />
      <path d="M8.5 10h7M8.5 13h4" />
    </>
  ),
  calculator: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2.5" />
      <path d="M8.5 7h7M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01M8.5 15h.01M12 15h.01M15.5 15h.01M8.5 18h.01M12 18h.01M15.5 18h.01" />
    </>
  ),
  pulse: <path d="M3 12h4l2.5-6 5 12 2.5-6h4" />,
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" />
    </>
  ),
  scale: (
    <>
      <path d="M12 3.5v17M7 20.5h10M5 7.5h14" />
      <path d="M5 7.5L2.5 13a2.8 2.8 0 005 0L5 7.5zM19 7.5L16.5 13a2.8 2.8 0 005 0L19 7.5z" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2.5" />
      <path d="M9 7V5h6v2M3 12.5h18" />
    </>
  ),
  building: (
    <>
      <path d="M4 20.5V5.5l8-2.5v17.5M12 8h8v12.5M2.5 20.5h19" />
      <path d="M7.5 8.5h.01M7.5 12h.01M7.5 15.5h.01M15.5 12h.01M15.5 15.5h.01" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3.5 6.5L12 13l8.5-6.5" />
    </>
  ),
  sparkle: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16z" />,
  code: <path d="M8.5 7L3.5 12l5 5M15.5 7l5 5-5 5M13.5 4.5l-3 15" />,
  fingerprint: (
    <>
      <path d="M6.5 5.5A8 8 0 0120 12v1.5M4 9.5A8 8 0 004 12v3" />
      <path d="M8 19.5c1-1.8 1.5-4 1.5-6.5a2.5 2.5 0 015 0v1.5M12 13c0 3.3-.8 6-2.3 8M17 17.5c-.3 1.3-.7 2.5-1.3 3.5M7 15.5c0-1 .2-2 .5-3" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10.5" rx="2.5" />
      <path d="M8 10.5V7.5a4 4 0 018 0v3M12 14.5v2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
};

export type IconName = keyof typeof paths;

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

const Icon = ({ name, size = 22, className = "", strokeWidth = 1.6 }: IconProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {paths[name]}
  </svg>
);

export default Icon;
