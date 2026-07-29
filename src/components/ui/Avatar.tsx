export function Avatar({ name, src, size = 40 }: { name?: string; src?: string; size?: number }) {
  const initials = name ? name.split(' ').map((s) => s[0]).slice(0,2).join('') : 'SA'
  return (
    <div className="avatar" style={{ width: size, height: size }} aria-hidden>
      {src ? <img src={src} alt={name ?? 'avatar'} style={{ width: '100%', height: '100%', borderRadius: '50%' }} /> : <div className="avatar-initials">{initials}</div>}
    </div>
  )
}

export default Avatar
