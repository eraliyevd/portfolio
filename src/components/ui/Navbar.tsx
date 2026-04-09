'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { label:'About',        href:'#about' },
  { label:'Education',    href:'#education' },
  { label:'Projects',     href:'#projects' },
  { label:'Certificates', href:'#certificates' },
  { label:'Skills',       href:'#skills' },
  { label:'Contact',      href:'#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y:-20, opacity:0 }} animate={{ y:0, opacity:1 }}
        transition={{ duration:0.6, ease:[0.16,1,0.3,1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={scrolled ? {
          background:'rgba(14,36,61,0.85)',
          backdropFilter:'blur(16px)',
          borderBottom:'1px solid var(--border)',
        } : {}}>
        <div className="container-wide flex items-center justify-between h-16">
          <a href="#" style={{ fontFamily:'var(--font-display)', fontSize:'1.25rem', fontWeight:500, color:'var(--text)', textDecoration:'none' }}>
            ED.
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => <a key={item.label} href={item.href} className="nav-link">{item.label}</a>)}
          </div>
          <button onClick={() => setOpen(!open)} className="md:hidden flex flex-col gap-[5px] p-2" aria-label="Toggle menu">
            <motion.span animate={{ rotate:open?45:0, y:open?7:0 }} className="w-5 h-[1.5px] block" style={{ background:'var(--text)' }} />
            <motion.span animate={{ opacity:open?0:1 }} className="w-5 h-[1.5px] block" style={{ background:'var(--text)' }} />
            <motion.span animate={{ rotate:open?-45:0, y:open?-7:0 }} className="w-5 h-[1.5px] block" style={{ background:'var(--text)' }} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.2 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
            style={{ background:'var(--background)' }}>
            {navItems.map((item, i) => (
              <motion.a key={item.label} href={item.href} onClick={() => setOpen(false)}
                initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.05 }}
                style={{ fontSize:'1.5rem', fontFamily:'var(--font-display)', color:'var(--text)', textDecoration:'none' }}>
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
