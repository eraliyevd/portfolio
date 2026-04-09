'use client'

import { useSiteSettings } from '@/hooks/useSiteSettings'

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  useSiteSettings()
  return <>{children}</>
}
