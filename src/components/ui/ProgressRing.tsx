export function ProgressRing({ size = 56, stroke = 6, value = 0 }: { size?: number; stroke?: number; value?: number }) {
  const radius = (size - stroke) / 2
  const circum = 2 * Math.PI * radius
  const offset = circum - (Math.max(0, Math.min(100, value)) / 100) * circum

  return (
    <svg width={size} height={size} className="progress-ring" role="img" aria-label={`Progress: ${value}%`}>
      <circle cx={size/2} cy={size/2} r={radius} stroke="var(--color-bg)" strokeWidth={stroke} fill="none" />
      <circle cx={size/2} cy={size/2} r={radius} stroke="var(--color-primary)" strokeWidth={stroke} fill="none" strokeDasharray={circum} strokeDashoffset={offset} strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`} />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="12" fill="var(--color-text)">{Math.round(value)}%</text>
    </svg>
  )
}

export default ProgressRing
