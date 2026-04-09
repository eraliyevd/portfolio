'use client'

import { motion } from 'framer-motion'
import { useSiteSettings } from '@/hooks/useSiteSettings'

const c = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const i = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16,1,0.3,1] } } }

interface StaticProfile {
  name: string; role: string; tagline: string; image: string
  email: string; telegram: string; university_goal: string
}

export default function Hero({ profile }: { profile: StaticProfile }) {
  const { settings } = useSiteSettings()

  const title       = settings.hero.title       || profile.name
  const subtitle    = settings.hero.subtitle    || profile.role
  const description = settings.hero.description || profile.tagline
  const imgSrc      = settings.hero.image       || profile.image

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20"
      style={{ background: 'var(--background)' }}>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'var(--primary)', opacity: 0.07 }} />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full blur-2xl"
          style={{ background: 'var(--primary)', opacity: 0.04 }} />
      </div>

      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh] py-16">

          <motion.div variants={c} initial="hidden" animate="show" className="order-2 lg:order-1">
            <motion.div variants={i}>
              <span className="label">{profile.university_goal}</span>
            </motion.div>

            <motion.h1 variants={i} className="heading-xl mt-4 mb-6">
              {title.split(' ').map((w, idx) => (
                <span key={idx} className={idx === 1 ? 'italic' : ''}>{idx > 0 ? ' ' : ''}{w}</span>
              ))}
            </motion.h1>

            <motion.p variants={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.06em', color: 'var(--muted)' }} className="mb-3">
              {subtitle}
            </motion.p>

            <motion.div variants={i} className="divider" />

            <motion.p variants={i} className="text-lg max-w-md leading-relaxed mb-10" style={{ color: 'var(--muted)', fontWeight: 300 }}>
              {description}
            </motion.p>

            <motion.div variants={i} className="flex flex-wrap gap-3">
              <a href="#projects" className="btn-primary">
                View My Work
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#contact" className="btn-secondary">Get in Touch</a>
            </motion.div>

            <motion.div variants={i} className="flex flex-wrap items-center gap-6 mt-10">
              <a href={`mailto:${profile.email}`} className="text-sm flex items-center gap-2 transition-colors"
                style={{ color: 'var(--muted)' }}
                onMouseEnter={e=>(e.currentTarget.style.color='var(--text)')}
                onMouseLeave={e=>(e.currentTarget.style.color='var(--muted)')}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                {profile.email}
              </a>
              <a href={`https://t.me/${profile.telegram.replace('@','')}`} target="_blank" rel="noreferrer"
                className="text-sm flex items-center gap-2 transition-colors"
                style={{ color: 'var(--muted)' }}
                onMouseEnter={e=>(e.currentTarget.style.color='var(--text)')}
                onMouseLeave={e=>(e.currentTarget.style.color='var(--muted)')}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"/>
                </svg>
                {profile.telegram}
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16,1,0.3,1] }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl" style={{ border: '1px solid var(--border)' }} />
              <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-2xl" style={{ border: '1px solid var(--border)', background: 'var(--section)' }} />
              <div className="relative w-72 h-80 sm:w-80 sm:h-96 lg:w-96 lg:h-[480px] rounded-2xl overflow-hidden flex items-center justify-center"
                style={{ background: 'var(--section)' }}>
                {imgSrc
                  ? <img src={imgSrc} alt={title} className="w-full h-full object-cover absolute inset-0" />
                  : <span style={{ fontFamily: 'var(--font-display)', color: 'var(--primary)', fontSize: '4rem', opacity: 0.25, fontWeight: 500 }}>ED</span>
                }
              </div>
              <motion.div initial={{ opacity:0,x:20 }} animate={{ opacity:1,x:0 }} transition={{ delay:0.8,duration:0.6 }}
                className="absolute -left-8 top-1/3 rounded-xl px-4 py-3 shadow-lg"
                style={{ background:'rgba(10,30,52,0.9)', border:'1px solid var(--border)', backdropFilter:'blur(12px)' }}>
                <p className="text-xs mb-1" style={{ color:'var(--muted)', letterSpacing:'0.08em' }}>FOCUS AREA</p>
                <p className="text-sm font-medium" style={{ color:'var(--text)' }}>AI & Mechanical</p>
                <p className="text-sm font-medium" style={{ color:'var(--text)' }}>Engineering</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="label text-[10px]">Scroll</span>
        <motion.div animate={{ y:[0,6,0] }} transition={{ repeat:Infinity,duration:1.5,ease:'easeInOut' }}
          className="w-[1px] h-8" style={{ background:'linear-gradient(to bottom, var(--muted), transparent)' }} />
      </motion.div>
    </section>
  )
}
