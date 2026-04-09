'use client'

import { useSiteSettings } from '@/hooks/useSiteSettings'
import { Reveal, StaggerContainer, StaggerItem } from '../ui/Reveal'

const VALUES = ['Precision', 'Curiosity', 'Impact', 'Elegance']

interface StaticAbout { headline: string; paragraphs: string[]; values: string[] }

export default function About({ about }: { about: StaticAbout }) {
  const { settings } = useSiteSettings()

  const rawText = settings.about.text || about.paragraphs.join('\n\n')
  const paragraphs = rawText.split(/\n\n+/).filter(Boolean)
  const headline   = about.headline

  return (
    <section id="about" className="section" style={{ background:'var(--section)' }}>
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <Reveal>
              <span className="label">About Me</span>
              <h2 className="heading-lg mt-4 mb-6">{headline}</h2>
              <div className="divider" />
            </Reveal>
            <div className="space-y-5 mt-6">
              {paragraphs.map((para, idx) => (
                <Reveal key={idx} delay={idx * 0.1}>
                  <p className="leading-relaxed" style={{ color:'var(--muted)', fontWeight:300 }}>{para}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <Reveal delay={0.2}>
              <p className="label mb-8">Core Values</p>
            </Reveal>
            <StaggerContainer className="grid grid-cols-2 gap-4">
              {VALUES.map((value, idx) => (
                <StaggerItem key={idx}>
                  <div className="card p-6">
                    <span className="text-4xl font-medium block mb-3"
                      style={{ fontFamily:'var(--font-display)', color:'var(--border)', opacity:0.6 }}>
                      {String(idx+1).padStart(2,'0')}
                    </span>
                    <p className="font-medium" style={{ color:'var(--text)' }}>{value}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <Reveal delay={0.4} className="mt-8">
              <div className="card p-6" style={{ borderColor:'rgba(91,155,213,0.2)', background:'rgba(91,155,213,0.04)' }}>
                <p className="text-sm leading-relaxed italic" style={{ fontFamily:'var(--font-display)', color:'var(--muted)' }}>
                  "The future belongs to those who can bridge the physical and digital worlds. I'm building that bridge, one project at a time."
                </p>
                <p className="text-xs mt-3" style={{ color:'var(--muted)', opacity:0.6 }}>— Eraliyev Doniyor</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
