'use client'

export default function Footer() {
  return (
    <footer className="py-10" style={{ borderTop:'1px solid var(--border)', background:'var(--background)' }}>
      <div className="container-wide flex flex-col sm:flex-row items-center justify-between gap-4">
        <span style={{ fontFamily:'var(--font-display)', fontSize:'1.25rem', fontWeight:500, color:'var(--text)' }}>ED.</span>
        <p className="text-xs" style={{ color:'var(--muted)' }}>
          © {new Date().getFullYear()} Eraliyev Doniyor · Built with Next.js & Firebase
        </p>
        <a href="#" className="text-xs transition-colors" style={{ color:'var(--muted)' }}
          onMouseEnter={e=>(e.currentTarget.style.color='var(--text)')}
          onMouseLeave={e=>(e.currentTarget.style.color='var(--muted)')}>
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}
