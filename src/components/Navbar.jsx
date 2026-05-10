import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV = [
  { label: 'Hosting', sub: [
    { label: 'Shared Hosting',    href: '/shared-hosting', desc: 'Websites & blogs' },
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
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  useEffect(() => { setOpen(false); setDropdown(null); }, [pathname]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#030308]/90 backdrop-blur-xl border-b border-white/[0.06]' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo — large, always visible */}
        <Link to="/" className="flex items-center flex-shrink-0">
          <img src="/logo.png" alt="JabaliCloud" className="h-11 w-auto" style={{ maxWidth: 190 }} />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV.map(item => (
            <div key={item.label} className="relative"
              onMouseEnter={() => item.sub && setDropdown(item.label)}
              onMouseLeave={() => setDropdown(null)}>
              {item.href ? (
                <Link to={item.href} className="flex items-center px-4 py-2 text-sm font-medium text-white/60 hover:text-white rounded-xl hover:bg-white/[0.05] transition-all duration-200">
                  {item.label}
                </Link>
              ) : (
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white/60 hover:text-white rounded-xl hover:bg-white/[0.05] transition-all duration-200">
                  {item.label}
                  <svg className={`w-3 h-3 transition-transform duration-200 ${dropdown===item.label?'rotate-180':''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/></svg>
                </button>
              )}
              {item.sub && dropdown === item.label && (
                <div className="absolute top-full left-0 pt-3 w-56">
                  <div className="glass-card border border-white/[0.08] overflow-hidden" style={{ background: 'rgba(8,10,20,.95)', backdropFilter: 'blur(24px)' }}>
                    {item.sub.map((s, i) => (
                      <Link key={s.href} to={s.href}
                        className="flex flex-col px-5 py-3.5 hover:bg-white/[0.05] transition-colors"
                        style={{ borderBottom: i < item.sub.length-1 ? '1px solid rgba(255,255,255,.05)' : 'none' }}>
                        <span className="text-sm font-semibold text-white">{s.label}</span>
                        <span className="text-xs text-white/40 mt-0.5">{s.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="https://my.jabalicloud.com" className="text-sm font-medium text-white/50 hover:text-white px-4 py-2 rounded-xl hover:bg-white/[0.05] transition-all duration-200">
            Sign In
          </a>
          <a href="https://my.jabalicloud.com" className="btn-cta text-sm px-5 py-2.5">
            Get Started
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden p-2 text-white/60 hover:text-white rounded-xl hover:bg-white/[0.05] transition-all" onClick={() => setOpen(!open)}>
          {open
            ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            : <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
          }
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden px-4 py-4 flex flex-col gap-1" style={{ background: 'rgba(3,3,8,.98)', borderTop: '1px solid rgba(255,255,255,.06)' }}>
          {['/shared-hosting','/vps','/dedicated','/domains','/about','/contact'].map((href, i) => {
            const labels = ['Shared Hosting','VPS Hosting','Dedicated Servers','Domains','About','Contact'];
            return <Link key={href} to={href} className="py-3 px-4 text-sm font-medium text-white/60 hover:text-white rounded-xl hover:bg-white/[0.05] transition-all">{labels[i]}</Link>;
          })}
          <div className="border-t border-white/[0.06] mt-2 pt-3 flex flex-col gap-2">
            <a href="https://my.jabalicloud.com" className="btn-ghost text-sm text-center justify-center">Sign In</a>
            <a href="https://my.jabalicloud.com" className="btn-cta text-sm text-center justify-center">Get Started</a>
          </div>
        </div>
      )}
    </nav>
  );
}
