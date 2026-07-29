import { useEffect } from 'react'
import { track } from '../services/analytics'

export function usePageView(name: string) {
  useEffect(() => {
    try { track('page_view', { page: name }) } catch {}
  }, [name])
}

export default usePageView
