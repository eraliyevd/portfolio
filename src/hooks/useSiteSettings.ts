'use client'

import { useEffect, useState } from 'react'
import { subscribeSettings, DEFAULT_SETTINGS, type SiteSettings } from '@/lib/settings'

function applyColors(colors: SiteSettings['colors']) {
  const r = document.documentElement
  r.style.setProperty('--primary',    colors.primary)
  r.style.setProperty('--background', colors.background)
  r.style.setProperty('--section',    colors.section)
  r.style.setProperty('--text',       colors.text)
  r.style.setProperty('--muted',      colors.muted)
  r.style.setProperty('--card',       colors.card)
  // legacy aliases kept for backward compat
  r.style.setProperty('--bg',         colors.background)
  r.style.setProperty('--accent',     colors.primary)
  r.style.setProperty('--fg',         colors.text)
  r.style.setProperty('--fg-muted',   colors.muted)
  r.style.setProperty('--bg-secondary', colors.section)
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = subscribeSettings((s) => {
      setSettings(s)
      applyColors(s.colors)
      setLoading(false)
    })
    return unsub
  }, [])

  return { settings, loading }
}
