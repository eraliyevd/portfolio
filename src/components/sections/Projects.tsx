'use client'

import { motion } from 'framer-motion'
import { useSiteSettings } from '@/hooks/useSiteSettings'
import { Reveal, StaggerContainer, StaggerItem } from '../ui/Reveal'

interface StaticProject { id:string; title:string; description:string; tags:string[]; github:string; demo:string; featured:boolean }

export default function Projects({ projects: staticProjects }: { projects: StaticProject[] }) {
  const { settings } = useSiteSettings()

  const projects = settings.projects.length > 0
    ? settings.projects
    : staticProjects.map(p => ({ id:p.id, title:p.title, description:p.description, tech:p.tags, github:p.github, demo:p.demo }))

  return (
    <section id="projects" className="section" style={{ background:'var(--background)' }}>
      <div className="container-wide">
        <Reveal>
          <span className="label">Projects</span>
          <h2 className="heading-lg mt-4 mb-2">Selected Work</h2>
          <div className="divider" />
          <p className="mt-4 max-w-lg" style={{ color:'var(--muted)', fontWeight:300 }}>
            A collection of projects spanning AI development, automation, and engineering tools.
          </p>
        </Reveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {projects.map((project) => (
            <StaggerItem key={project.id}>
              <motion.div whileHover={{ y:-4 }} transition={{ duration:0.2 }} className="card p-6 h-full flex flex-col">
                <h3 className="text-lg font-medium mb-3 leading-snug" style={{ fontFamily:'var(--font-display)', color:'var(--text)' }}>
                  {project.title}
                </h3>
                <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color:'var(--muted)', fontWeight:300 }}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop:'1px solid var(--border)' }}>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium transition-colors"
                      style={{ color:'var(--muted)' }}
                      onMouseEnter={e=>(e.currentTarget.style.color='var(--text)')}
                      onMouseLeave={e=>(e.currentTarget.style.color='var(--muted)')}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium transition-colors"
                      style={{ color:'var(--muted)' }}
                      onMouseEnter={e=>(e.currentTarget.style.color='var(--text)')}
                      onMouseLeave={e=>(e.currentTarget.style.color='var(--muted)')}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/>
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
