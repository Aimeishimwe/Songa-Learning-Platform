import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`btn btn-${variant} ${className}`.trim()}
      aria-pressed={props['aria-pressed']}
    >
      {children}
    </button>
  )
}

export default Button
