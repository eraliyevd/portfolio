'use client'

import { Reveal } from '../ui/Reveal'

interface ContactProps { profile: { name:string; email:string; telegram:string; location:string } }

export default function Contact({ profile }: ContactProps) {
  return (
    <section id="contact" className="section" style={{ background:'var(--section)' }}>
      <div className="container-tight text-center">
        <Reveal>
          <span className="label">Contact</span>
          <h2 className="heading-lg mt-4 mb-2">Let's Connect</h2>
          <div className="divider mx-auto" />
          <p className="mt-6 mb-12 text-lg leading-relaxed" style={{ color:'var(--muted)', fontWeight:300 }}>
            Whether you're a university admissions officer, a collaborator, or just curious — I'd love to hear from you.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-12">
            <a href={`mailto:${profile.email}`}
              className="card p-6 text-center group transition-all"
              onMouseEnter={e=>(e.currentTarget.style.borderColor='var(--primary)')}
              onMouseLeave={e=>(e.currentTarget.style.borderColor='var(--border)')}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 transition-colors"
                style={{ background:'rgba(255,255,255,0.05)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </div>
              <p className="label mb-1">Email</p>
              <p className="text-sm font-medium" style={{ color:'var(--text)' }}>{profile.email}</p>
            </a>
            <a href={`https://t.me/${profile.telegram.replace('@','')}`} target="_blank" rel="noreferrer"
              className="card p-6 text-center group transition-all"
              onMouseEnter={e=>(e.currentTarget.style.borderColor='var(--primary)')}
              onMouseLeave={e=>(e.currentTarget.style.borderColor='var(--border)')}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{ background:'rgba(255,255,255,0.05)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--primary)">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"/>
                </svg>
              </div>
              <p className="label mb-1">Telegram</p>
              <p className="text-sm font-medium" style={{ color:'var(--text)' }}>{profile.telegram}</p>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-xs" style={{ color:'var(--muted)' }}>📍 {profile.location} · Available for opportunities worldwide</p>
        </Reveal>
      </div>
    </section>
  )
}
