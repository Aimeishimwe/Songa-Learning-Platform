export function track(event: string, payload?: Record<string, any>) {
  // Minimal analytics stub — replace with real provider later
  console.log('[analytics]', event, payload ?? {})
}

export default { track }
