'use client'

import { useState, useEffect, useRef } from 'react'
import { useSiteSettings } from '@/hooks/useSiteSettings'
import { saveSettings, type SiteSettings, type Project, type Certificate } from '@/lib/settings'
import { uploadImage } from '@/lib/upload'

const CREDS = { username: '1', password: '1' }

// ─── Helpers ────────────────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 10)

function cls(...args: (string | undefined | false)[]) {
  return args.filter(Boolean).join(' ')
}

// ─── Login ───────────────────────────────────────────────────────────────────
function Login({ onLogin }: { onLogin: () => void }) {
  const [u, setU] = useState('')
  const [p, setP] = useState('')
  const [err, setErr] = useState(false)
  const go = () => {
    if (u === CREDS.username && p === CREDS.password) onLogin()
    else { setErr(true); setTimeout(() => setErr(false), 2000) }
  }
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)' }}>
      <div className="w-full max-w-sm p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)' }}>
        <h1 className="text-2xl font-medium text-center mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}>Admin Panel</h1>
        <p className="text-xs text-center mb-8" style={{ color: 'var(--muted)' }}>Portfolio CMS · Eraliyev Doniyor</p>
        <div className="space-y-3">
          <input className="admin-input" placeholder="Username" value={u} onChange={e => setU(e.target.value)} onKeyDown={e => e.key === 'Enter' && go()} />
          <input className="admin-input" type="password" placeholder="Password" value={p} onChange={e => setP(e.target.value)} onKeyDown={e => e.key === 'Enter' && go()} />
          {err && <p className="text-xs text-red-400 text-center">Invalid credentials</p>}
          <button onClick={go} className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all mt-1"
            style={{ background: 'var(--primary)', color: '#fff' }}>Sign In</button>
        </div>
      </div>
    </div>
  )
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
      <h2 className="text-sm font-semibold mb-5" style={{ color: 'var(--text)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{title}</h2>
      {children}
    </div>
  )
}

// ─── Field ────────────────────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium" style={{ color: 'var(--muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</label>
      {children}
    </div>
  )
}

// ─── Color row ────────────────────────────────────────────────────────────────
function ColorRow({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-32 text-xs flex-shrink-0" style={{ color: 'var(--muted)' }}>{label}</span>
      <input type="color" value={value} onChange={e => onChange(e.target.value)}
        className="w-9 h-9 rounded-lg cursor-pointer border-0 bg-transparent p-0.5 flex-shrink-0"
        style={{ border: '1px solid var(--border)' }} />
      <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder="#000000"
        className="admin-input flex-1" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }} />
    </div>
  )
}

// ─── Upload button ────────────────────────────────────────────────────────────
function UploadBtn({
  label, onUrl, folder = 'profile'
}: { label: string; onUrl: (url: string) => void; folder?: 'profile' | 'certificates' }) {
  const ref = useRef<HTMLInputElement>(null)
  const [pct, setPct] = useState<number | null>(null)

  const handle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return
    setPct(0)
    try {
      const url = await uploadImage(file, folder, p => setPct(p))
      onUrl(url)
    } catch { alert('Upload failed — check Firebase Storage rules') }
    finally { setPct(null); if (ref.current) ref.current.value = '' }
  }

  return (
    <div>
      <button onClick={() => ref.current?.click()}
        className="admin-btn text-sm"
        style={{ background: 'rgba(91,155,213,0.12)', color: 'var(--primary)', border: '1px solid rgba(91,155,213,0.25)' }}>
        {pct !== null ? `Uploading… ${pct}%` : label}
      </button>
      {pct !== null && (
        <div className="mt-2 w-full h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: 'var(--primary)' }} />
        </div>
      )}
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handle} />
    </div>
  )
}

// ─── Project editor ───────────────────────────────────────────────────────────
function ProjectEditor({ project, onChange, onDelete }: {
  project: Project
  onChange: (p: Project) => void
  onDelete: () => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
      <div className="flex items-center justify-between px-4 py-3 cursor-pointer"
        style={{ background: 'rgba(255,255,255,0.03)' }}
        onClick={() => setOpen(o => !o)}>
        <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>{project.title || 'Untitled project'}</span>
        <div className="flex items-center gap-2">
          <button onClick={e => { e.stopPropagation(); onDelete() }}
            className="admin-btn text-xs" style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171' }}>
            Delete
          </button>
          <span style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>{open ? '▲' : '▼'}</span>
        </div>
      </div>
      {open && (
        <div className="p-4 space-y-3" style={{ borderTop: '1px solid var(--border)' }}>
          <Field label="Title">
            <input className="admin-input" value={project.title} onChange={e => onChange({ ...project, title: e.target.value })} />
          </Field>
          <Field label="Description">
            <textarea className="admin-input" value={project.description} onChange={e => onChange({ ...project, description: e.target.value })} />
          </Field>
          <Field label="Tech stack (comma separated)">
            <input className="admin-input" value={project.tech.join(', ')}
              onChange={e => onChange({ ...project, tech: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="GitHub URL">
              <input className="admin-input" value={project.github} onChange={e => onChange({ ...project, github: e.target.value })} />
            </Field>
            <Field label="Demo URL">
              <input className="admin-input" value={project.demo} onChange={e => onChange({ ...project, demo: e.target.value })} />
            </Field>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Certificate editor ───────────────────────────────────────────────────────
function CertEditor({ cert, onChange, onDelete }: {
  cert: Certificate
  onChange: (c: Certificate) => void
  onDelete: () => void
}) {
  return (
    <div className="rounded-xl p-4 space-y-3" style={{ border: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)' }}>
      <div className="flex items-center justify-between">
        <Field label="Title">
          <input className="admin-input" value={cert.title} onChange={e => onChange({ ...cert, title: e.target.value })} />
        </Field>
        <button onClick={onDelete} className="admin-btn text-xs ml-3 flex-shrink-0 self-end"
          style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171' }}>
          Delete
        </button>
      </div>
      <div className="flex items-start gap-3">
        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)' }}>
          {cert.image
            ? <img src={cert.image} alt="" className="w-full h-full object-cover" />
            : <span style={{ color: 'var(--muted)', fontSize: '0.65rem' }}>No image</span>
          }
        </div>
        <UploadBtn label="Upload Image" folder="certificates" onUrl={url => onChange({ ...cert, image: url })} />
      </div>
    </div>
  )
}

// ─── Main admin ───────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [auth, setAuth] = useState(false)
  const { settings } = useSiteSettings()
  const [draft, setDraft] = useState<SiteSettings>(settings)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')
  const [tab, setTab] = useState<'colors' | 'hero' | 'about' | 'projects' | 'certificates'>('colors')

  useEffect(() => { setDraft(settings) }, [settings])

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000) }

  const setColors = (k: keyof SiteSettings['colors'], v: string) =>
    setDraft(d => ({ ...d, colors: { ...d.colors, [k]: v } }))

  const setHero = (k: keyof SiteSettings['hero'], v: string) =>
    setDraft(d => ({ ...d, hero: { ...d.hero, [k]: v } }))

  const save = async () => {
    setSaving(true)
    try { await saveSettings(draft); showToast('Saved & live ✓') }
    catch { showToast('Save failed — check Firestore rules') }
    finally { setSaving(false) }
  }

  const TABS = ['colors', 'hero', 'about', 'projects', 'certificates'] as const

  if (!auth) return <Login onLogin={() => setAuth(true)} />

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>

      {/* Header */}
      <div className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between"
        style={{ background: 'rgba(14,36,61,0.9)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-center gap-3">
          <span style={{ fontFamily: 'var(--font-display)', color: 'var(--text)', fontSize: '1.2rem', fontWeight: 500 }}>ED. Admin</span>
          <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(91,155,213,0.12)', color: 'var(--primary)', border: '1px solid rgba(91,155,213,0.2)' }}>
            Firebase
          </span>
        </div>
        <div className="flex items-center gap-3">
          {saving && <span className="text-xs" style={{ color: 'var(--muted)' }}>Saving…</span>}
          <a href="/" target="_blank" className="text-xs transition-colors" style={{ color: 'var(--muted)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>← View Site</a>
          <button onClick={() => setAuth(false)} className="admin-btn text-xs"
            style={{ background: 'rgba(255,255,255,0.07)', color: 'var(--muted)' }}>Sign Out</button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl text-sm font-medium shadow-xl"
          style={{ background: 'var(--primary)', color: '#fff' }}>
          {toast}
        </div>
      )}

      <div className="max-w-3xl mx-auto p-6 space-y-5">

        {/* Tab bar */}
        <div className="flex gap-1 p-1 rounded-xl overflow-x-auto" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="admin-btn capitalize flex-shrink-0 text-xs"
              style={tab === t
                ? { background: 'var(--primary)', color: '#fff' }
                : { background: 'transparent', color: 'var(--muted)' }}>
              {t}
            </button>
          ))}
        </div>

        {/* ── COLORS ── */}
        {tab === 'colors' && (
          <Section title="Theme Colors">
            <div className="space-y-4">
              <ColorRow label="Primary / Accent" value={draft.colors.primary}    onChange={v => setColors('primary', v)} />
              <div className="h-px" style={{ background: 'var(--border)' }} />
              <ColorRow label="Background"       value={draft.colors.background} onChange={v => setColors('background', v)} />
              <div className="h-px" style={{ background: 'var(--border)' }} />
              <ColorRow label="Section / Card BG" value={draft.colors.section}   onChange={v => setColors('section', v)} />
              <div className="h-px" style={{ background: 'var(--border)' }} />
              <ColorRow label="Text"             value={draft.colors.text}       onChange={v => setColors('text', v)} />
              <div className="h-px" style={{ background: 'var(--border)' }} />
              <ColorRow label="Muted text"       value={draft.colors.muted}      onChange={v => setColors('muted', v)} />
              <div className="h-px" style={{ background: 'var(--border)' }} />
              <ColorRow label="Card background"  value={draft.colors.card}       onChange={v => setColors('card', v)} />
            </div>
            <div className="mt-6 p-4 rounded-xl" style={{ background: 'rgba(91,155,213,0.06)', border: '1px solid rgba(91,155,213,0.15)' }}>
              <p className="text-xs" style={{ color: 'var(--primary)' }}>
                Changes preview instantly via <code>onSnapshot</code>. Click Save to persist.
              </p>
            </div>
          </Section>
        )}

        {/* ── HERO ── */}
        {tab === 'hero' && (
          <Section title="Hero Section">
            <div className="space-y-4">
              <Field label="Title / Name">
                <input className="admin-input" value={draft.hero.title} onChange={e => setHero('title', e.target.value)} />
              </Field>
              <Field label="Subtitle / Role">
                <input className="admin-input" value={draft.hero.subtitle} onChange={e => setHero('subtitle', e.target.value)} />
              </Field>
              <Field label="Description / Tagline">
                <textarea className="admin-input" value={draft.hero.description} onChange={e => setHero('description', e.target.value)} />
              </Field>
              <Field label="Profile Image">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)' }}>
                    {draft.hero.image
                      ? <img src={draft.hero.image} alt="" className="w-full h-full object-cover" />
                      : <span style={{ color: 'var(--muted)', fontSize: '1.5rem', fontFamily: 'var(--font-display)' }}>ED</span>
                    }
                  </div>
                  <div className="space-y-2 flex-1">
                    <UploadBtn label="Upload Profile Image" folder="profile" onUrl={url => setHero('image', url)} />
                    <input className="admin-input text-xs" placeholder="Or paste image URL…" value={draft.hero.image}
                      onChange={e => setHero('image', e.target.value)} />
                  </div>
                </div>
              </Field>
            </div>
          </Section>
        )}

        {/* ── ABOUT ── */}
        {tab === 'about' && (
          <Section title="About Section">
            <Field label="Bio text (use double newlines for paragraphs)">
              <textarea className="admin-input" style={{ minHeight: '180px' }}
                value={draft.about.text} onChange={e => setDraft(d => ({ ...d, about: { text: e.target.value } }))} />
            </Field>
            <p className="mt-3 text-xs" style={{ color: 'var(--muted)' }}>
              Tip: separate paragraphs with a blank line (two newlines).
            </p>
          </Section>
        )}

        {/* ── PROJECTS ── */}
        {tab === 'projects' && (
          <Section title="Projects">
            <div className="space-y-3">
              {draft.projects.map((proj, idx) => (
                <ProjectEditor
                  key={proj.id}
                  project={proj}
                  onChange={p => setDraft(d => ({ ...d, projects: d.projects.map((x, i) => i === idx ? p : x) }))}
                  onDelete={() => setDraft(d => ({ ...d, projects: d.projects.filter((_, i) => i !== idx) }))}
                />
              ))}
            </div>
            <button
              onClick={() => setDraft(d => ({ ...d, projects: [...d.projects, { id: uid(), title: '', description: '', tech: [], github: '', demo: '' }] }))}
              className="mt-4 w-full py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--text)', border: '1px dashed var(--border)' }}>
              + Add Project
            </button>
          </Section>
        )}

        {/* ── CERTIFICATES ── */}
        {tab === 'certificates' && (
          <Section title="Certificates">
            <div className="space-y-3">
              {draft.certificates.map((cert, idx) => (
                <CertEditor
                  key={cert.id}
                  cert={cert}
                  onChange={c => setDraft(d => ({ ...d, certificates: d.certificates.map((x, i) => i === idx ? c : x) }))}
                  onDelete={() => setDraft(d => ({ ...d, certificates: d.certificates.filter((_, i) => i !== idx) }))}
                />
              ))}
            </div>
            {draft.certificates.length === 0 && (
              <p className="text-center py-6 text-sm" style={{ color: 'var(--muted)' }}>No certificates yet.</p>
            )}
            <button
              onClick={() => setDraft(d => ({ ...d, certificates: [...d.certificates, { id: uid(), title: '', image: '' }] }))}
              className="mt-4 w-full py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--text)', border: '1px dashed var(--border)' }}>
              + Add Certificate
            </button>
          </Section>
        )}

        {/* Save button */}
        <button onClick={save} disabled={saving}
          className="w-full py-3.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-50"
          style={{ background: 'var(--primary)', color: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}>
          {saving ? 'Saving to Firebase…' : 'Save & Apply Live →'}
        </button>

        <p className="text-center text-xs pb-6" style={{ color: 'var(--muted)', opacity: 0.6 }}>
          All changes are written to Firestore and reflected on the site within seconds.
        </p>
      </div>
    </div>
  )
}
