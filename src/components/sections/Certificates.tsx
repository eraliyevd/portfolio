'use client'

import { motion } from 'framer-motion'
import { useSiteSettings } from '@/hooks/useSiteSettings'
import { Reveal, StaggerContainer, StaggerItem } from '../ui/Reveal'

interface StaticCert { id:string; title:string; issuer:string; date:string; image:string; link:string }

export default function Certificates({ certificates: staticCerts }: { certificates: StaticCert[] }) {
  const { settings } = useSiteSettings()

  const certs = settings.certificates.length > 0
    ? settings.certificates
    : staticCerts.map(c => ({ id:c.id, title:c.title, image:c.image }))

  return (
    <section id="certificates" className="section" style={{ background:'var(--section)' }}>
      <div className="container-wide">
        <Reveal>
          <span className="label">Certificates</span>
          <h2 className="heading-lg mt-4 mb-2">Credentials</h2>
          <div className="divider" />
          <p className="mt-4 max-w-lg" style={{ color:'var(--muted)', fontWeight:300 }}>
            Verified certifications from leading institutions and platforms.
          </p>
        </Reveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {certs.map((cert) => (
            <StaggerItem key={cert.id}>
              <motion.div whileHover={{ y:-3 }} transition={{ duration:0.2 }} className="card overflow-hidden flex flex-col">
                <div className="relative h-48 overflow-hidden flex items-center justify-center"
                  style={{ background:'var(--background)' }}>
                  {cert.image
                    ? <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
                    : (
                      <div className="flex flex-col items-center gap-2 opacity-30">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1">
                          <circle cx="12" cy="8" r="6"/>
                          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
                        </svg>
                        <span className="text-xs" style={{ color:'var(--muted)' }}>Certificate</span>
                      </div>
                    )
                  }
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-medium mb-2 leading-snug"
                    style={{ fontFamily:'var(--font-display)', fontSize:'1rem', color:'var(--text)' }}>
                    {cert.title}
                  </h3>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {certs.length === 0 && (
          <div className="text-center py-20">
            <p style={{ color:'var(--muted)' }}>No certificates yet. Add them from the admin panel.</p>
          </div>
        )}
      </div>
    </section>
  )
}
