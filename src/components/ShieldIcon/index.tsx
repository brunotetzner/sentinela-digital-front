type ShieldIconProps = {
  size?: number
}

/** Marca do Sentinela Digital — escudo em traço, herda a cor do texto */
function ShieldIcon({ size = 48 }: ShieldIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 2.5 4.75 5.6v5.6c0 4.6 2.9 8.4 7.25 10.3 4.35-1.9 7.25-5.7 7.25-10.3V5.6L12 2.5Z" />
    </svg>
  )
}

export default ShieldIcon
