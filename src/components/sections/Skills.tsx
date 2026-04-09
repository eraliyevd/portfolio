'use client'

import { Reveal, StaggerContainer, StaggerItem } from '../ui/Reveal'

interface Skills { engineering:string[]; programming:string[]; ai_ml:string[]; tools:string[]; languages:string[] }

export default function Skills({ skills }: { skills: Skills }) {
  const categories = [
    { key:'engineering' as const, label:'Mechanical Engineering', icon:'⚙️' },
    { key:'programming' as const, label:'Programming', icon:'💻' },
    { key:'ai_ml'       as const, label:'AI & Machine Learning', icon:'🧠' },
    { key:'tools'       as const, label:'Tools & Frameworks', icon:'🛠' },
    { key:'languages'   as const, label:'Languages', icon:'🌐' },
  ]

  return (
    <section id="skills" className="section" style={{ background:'var(--background)' }}>
      <div className="container-wide">
        <Reveal>
          <span className="label">Skills</span>
          <h2 className="heading-lg mt-4 mb-2">Expertise</h2>
          <div className="divider" />
        </Reveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {categories.map((cat) => (
            <StaggerItem key={cat.key}>
              <div className="card p-6 h-full">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xl">{cat.icon}</span>
                  <span className="label" style={{ color:'var(--text)' }}>{cat.label}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills[cat.key].map(skill => (
                    <span key={skill} className="px-3 py-1.5 rounded-lg text-sm font-medium"
                      style={{ background:'rgba(255,255,255,0.05)', color:'var(--text)', border:'1px solid var(--border)', fontSize:'0.8125rem' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
