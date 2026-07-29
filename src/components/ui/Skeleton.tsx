import React from 'react'
import '../../styles/skeleton.css'

export type SkeletonProps = {
  width?: number | string
  height?: number | string
  circle?: boolean
  className?: string
}

export function Skeleton({ width = '100%', height = '1rem', circle = false, className = '' }: SkeletonProps) {
  const style: React.CSSProperties = {
    width,
    height,
    borderRadius: circle ? '50%' : 6,
  }

  const classes = `skeleton ${circle ? 'avatar' : 'text'} ${className}`.trim()

  return <div className={classes} style={style} aria-hidden="true" />
}

export default Skeleton
