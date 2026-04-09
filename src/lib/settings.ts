import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore'
import { db } from './firebase'

export type SiteColors = {
  primary: string
  background: string
  section: string
  text: string
  muted: string
  card: string
}

export type HeroData = {
  title: string
  subtitle: string
  description: string
  image: string
}

export type AboutData = {
  text: string
}

export type Project = {
  id: string
  title: string
  description: string
  tech: string[]
  github: string
  demo: string
}

export type Certificate = {
  id: string
  title: string
  image: string
}

export type SiteSettings = {
  colors: SiteColors
  hero: HeroData
  about: AboutData
  projects: Project[]
  certificates: Certificate[]
}

export const DEFAULT_SETTINGS: SiteSettings = {
  colors: {
    primary:    '#5b9bd5',
    background: '#0e243d',
    section:    '#0a1e34',
    text:       '#e8edf2',
    muted:      '#8a9bb0',
    card:       'rgba(255,255,255,0.05)',
  },
  hero: {
    title:       'Eraliyev Doniyor',
    subtitle:    'Mechanical Engineering Student & AI Developer',
    description: 'Building intelligent systems at the intersection of engineering and technology.',
    image:       '',
  },
  about: {
    text: "I'm a Mechanical Engineering student who fell in love with the elegance of code. What started as curiosity about automation grew into a full commitment to AI and bot development — building systems that think, adapt, and solve real problems.\n\nMy work spans physical simulation, intelligent automation, and conversational AI. I believe the future belongs to engineers who can speak both the language of machines and the language of algorithms.",
  },
  projects: [
    {
      id: 'p1',
      title: 'AI Study Assistant Bot',
      description: 'A Telegram bot powered by GPT-4 that helps students organize study plans, answer engineering questions, and generate quizzes.',
      tech: ['Python', 'Telegram API', 'GPT-4', 'FastAPI'],
      github: 'https://github.com/doniyor/study-assistant-bot',
      demo: '',
    },
    {
      id: 'p2',
      title: 'Mechanical Simulation Dashboard',
      description: 'A web dashboard for visualizing FEA simulation results. Engineers can upload data and instantly view stress distribution maps.',
      tech: ['Next.js', 'TypeScript', 'D3.js', 'Python'],
      github: 'https://github.com/doniyor/mech-sim-dashboard',
      demo: 'https://mech-sim.vercel.app',
    },
  ],
  certificates: [],
}

const REF = () => doc(db, 'siteSettings', 'main')

export async function getSettings(): Promise<SiteSettings> {
  try {
    const snap = await getDoc(REF())
    if (snap.exists()) return deepMerge(DEFAULT_SETTINGS, snap.data() as Partial<SiteSettings>)
    return DEFAULT_SETTINGS
  } catch {
    return DEFAULT_SETTINGS
  }
}

export async function saveSettings(s: SiteSettings): Promise<void> {
  await setDoc(REF(), s)
}

export function subscribeSettings(cb: (s: SiteSettings) => void): () => void {
  return onSnapshot(
    REF(),
    (snap) => cb(snap.exists() ? deepMerge(DEFAULT_SETTINGS, snap.data() as Partial<SiteSettings>) : DEFAULT_SETTINGS),
    () => cb(DEFAULT_SETTINGS),
  )
}

function deepMerge<T>(base: T, override: Partial<T>): T {
  const result = { ...base }
  for (const key in override) {
    const v = override[key]
    if (v !== undefined && v !== null) {
      if (typeof v === 'object' && !Array.isArray(v) && typeof base[key] === 'object' && !Array.isArray(base[key])) {
        (result as Record<string, unknown>)[key] = deepMerge(base[key] as object, v as Partial<object>)
      } else {
        (result as Record<string, unknown>)[key] = v
      }
    }
  }
  return result
}
