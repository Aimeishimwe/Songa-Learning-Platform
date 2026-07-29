import React from 'react'

type CardProps = React.HTMLAttributes<HTMLDivElement>

export function Card({ className = '', children, ...props }: CardProps) {
  return (
    <div className={`card ${className}`.trim()} {...props}>
      {children}
    </div>
  )
}

export default Card
