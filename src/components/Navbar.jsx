import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV = [
  { label: 'Hosting', sub: [
    { label: 'Shared Hosting',    href: '/shared-hosting', desc: 'For websites & blogs' },
    { label: 'VPS Hosting',       href: '/vps',            desc: 'Scalable virtual servers' },
    { label: 'Dedicated Servers', href: '/dedicated',      desc: 'Full server control' },
  ]},
  { label: 'Domains', href: '/domains' },
  { label: 'About',   href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [open,      setOpen]      = useState(false);
  const [dropdown,  setDropdown]  = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  useEffect(() => { setOpen(false); setDropdown(null); }, [pathname]);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? 'rgba(248,250,252,.92)' : 'rgba(248,250,252,.8)',
      backdropFilter: 'blur(20px)',
      borderBottom: scrolled ? '1px solid #e2e8f0' : '1px solid transparent',
      boxShadow: scrolled ? '0 1px 16px rgba(15,23,42,.06)' : 'none',
      transition: 'all .3s',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', height: 76, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo — large and fully visible on white */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <img src="/logo.png" alt="JabaliCloud"
            style={{ height: 64, width: 'auto', maxWidth: 220, display: 'block' }} />
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'none', alignItems: 'center', gap: 4 }} className="lg-flex">
          {NAV.map(item => (
            <div key={item.label} style={{ position: 'relative' }}
              onMouseEnter={() => item.sub && setDropdown(item.label)}
              onMouseLeave={() => setDropdown(null)}>
              {item.href ? (
                <Link to={item.href} style={{ display: 'flex', alignItems: 'center', padding: '8px 16px', fontSize: 14, fontWeight: 500, color: '#475569', borderRadius: 10, textDecoration: 'none', transition: 'all .15s' }}
                  onMouseEnter={e => { e.currentTarget.style.color='#0f172a'; e.currentTarget.style.background='#f1f5f9'; }}
                  onMouseLeave={e => { e.currentTarget.style.color='#475569'; e.currentTarget.style.background='transparent'; }}>
                  {item.label}
                </Link>
              ) : (
                <button style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '8px 16px', fontSize: 14, fontWeight: 500, color: '#475569', borderRadius: 10, background: 'none', border: 'none', cursor: 'pointer', transition: 'all .15s' }}
                  onMouseEnter={e => { e.currentTarget.style.color='#0f172a'; e.currentTarget.style.background='#f1f5f9'; }}
                  onMouseLeave={e => { e.currentTarget.style.color='#475569'; e.currentTarget.style.background='transparent'; }}>
                  {item.label}
                  <svg style={{ width:12, height:12, transition:'transform .2s', transform: dropdown===item.label ? 'rotate(180deg)' : 'none' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/></svg>
                </button>
              )}
              {item.sub && dropdown === item.label && (
                <div style={{ position: 'absolute', top: '100%', left: 0, paddingTop: 8, width: 220 }}>
                  <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, boxShadow: '0 8px 32px rgba(15,23,42,.1)', overflow: 'hidden' }}>
                    {item.sub.map((s, i) => (
                      <Link key={s.href} to={s.href}
                        style={{ display: 'flex', flexDirection: 'column', padding: '14px 20px', textDecoration: 'none', borderBottom: i < item.sub.length-1 ? '1px solid #f1f5f9' : 'none', transition: 'background .15s' }}
                        onMouseEnter={e => e.currentTarget.style.background='#f8fafc'}
                        onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{s.label}</span>
                        <span style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{s.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'none', alignItems: 'center', gap: 12 }} className="lg-flex">
          <a href="https://my.jabalicloud.com" style={{ fontSize: 14, fontWeight: 500, color: '#475569', padding: '8px 16px', borderRadius: 10, textDecoration: 'none', transition: 'all .15s' }}
            onMouseEnter={e => { e.currentTarget.style.color='#0f172a'; e.currentTarget.style.background='#f1f5f9'; }}
            onMouseLeave={e => { e.currentTarget.style.color='#475569'; e.currentTarget.style.background='transparent'; }}>
            Sign In
          </a>
          <a href="https://my.jabalicloud.com" className="btn-cta" style={{ fontSize: 13, padding: '10px 20px' }}>
            Get Started
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} style={{ display: 'flex', padding: 8, color: '#475569', background: 'none', border: 'none', cursor: 'pointer', borderRadius: 10 }}
          className="lg-hide">
          {open
            ? <svg style={{width:22,height:22}} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            : <svg style={{width:22,height:22}} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
          }
        </button>
      </div>

      {/* Responsive CSS */}
      <style>{`
        @media(min-width:1024px){ .lg-flex{display:flex!important} .lg-hide{display:none!important} }
      `}</style>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: '#fff', borderTop: '1px solid #e2e8f0', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {[['Shared Hosting','/shared-hosting'],['VPS Hosting','/vps'],['Dedicated Servers','/dedicated'],['Domains','/domains'],['About','/about'],['Contact','/contact']].map(([label,href]) => (
            <Link key={href} to={href} style={{ padding: '10px 12px', fontSize: 14, fontWeight: 500, color: '#475569', borderRadius: 10, textDecoration: 'none' }}>{label}</Link>
          ))}
          <div style={{ borderTop: '1px solid #e2e8f0', marginTop: 8, paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a href="https://my.jabalicloud.com" className="btn-ghost" style={{ justifyContent:'center', textAlign:'center' }}>Sign In</a>
            <a href="https://my.jabalicloud.com" className="btn-cta" style={{ justifyContent:'center', textAlign:'center' }}>Get Started</a>
          </div>
        </div>
      )}
    </nav>
  );
}
