'use client'

import { Reveal, StaggerContainer, StaggerItem } from '../ui/Reveal'

interface EducationItem { id:string; institution:string; degree:string; period:string; gpa:string; highlights:string[] }

export default function Education({ education }: { education: EducationItem[] }) {
  return (
    <section id="education" className="section" style={{ background:'var(--background)' }}>
      <div className="container-wide">
        <Reveal>
          <span className="label">Education</span>
          <h2 className="heading-lg mt-4 mb-2">Academic Background</h2>
          <div className="divider" />
        </Reveal>

        <div className="mt-16 relative">
          <div className="absolute left-4 top-0 bottom-0 w-[1px] hidden md:block" style={{ background:'var(--border)' }} />
          <StaggerContainer className="space-y-8">
            {education.map((edu) => (
              <StaggerItem key={edu.id}>
                <div className="md:pl-16 relative">
                  <div className="absolute left-[13px] top-6 w-2.5 h-2.5 rounded-full border-2 hidden md:block"
                    style={{ background:'var(--primary)', borderColor:'var(--background)' }} />
                  <div className="card p-8">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                      <div>
                        <h3 className="heading-md mb-1">{edu.institution}</h3>
                        <p style={{ color:'var(--muted)', fontWeight:300 }}>{edu.degree}</p>
                      </div>
                      <div className="flex flex-col items-start sm:items-end gap-1 flex-shrink-0">
                        <span className="label">{edu.period}</span>
                        {edu.gpa && <span className="tag">{edu.gpa}</span>}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {edu.highlights.map((h) => <span key={h} className="tag">{h}</span>)}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}
