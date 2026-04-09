import { readFileSync, writeFileSync } from 'fs'
import path from 'path'

const DATA_PATH = path.join(process.cwd(), 'data', 'portfolio.json')

export function getData() {
  const raw = readFileSync(DATA_PATH, 'utf-8')
  return JSON.parse(raw)
}

export function saveData(data: object) {
  writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8')
}

export type Project = {
  id: string
  title: string
  description: string
  tags: string[]
  github: string
  demo: string
  featured: boolean
}

export type Certificate = {
  id: string
  title: string
  issuer: string
  date: string
  image: string
  link: string
}

export type Profile = {
  name: string
  role: string
  tagline: string
  bio: string
  image: string
  email: string
  telegram: string
  location: string
  university_goal: string
  cv_link: string
}
