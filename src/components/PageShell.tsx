import type { ReactNode } from 'react'

type PageShellProps = {
  title: string
  subtitle?: string
  children?: ReactNode
}

export function PageShell({ title, subtitle, children }: PageShellProps) {
  return (
    <section className="page-shell">
      <div className="page-heading">
        <div>
          <h1>{title}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      </div>
      {children}
    </section>
  )
}
