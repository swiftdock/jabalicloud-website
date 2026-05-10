import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV = [
  { label: 'Hosting', sub: [
    { label: 'Shared Hosting', href: '/shared-hosting', desc: 'Perfect for websites & blogs' },
    { label: 'VPS Hosting',    href: '/vps',            desc: 'Scalable virtual private servers' },
    { label: 'Dedicated Servers', href: '/dedicated',   desc: 'Maximum power & control' },
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
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => { setOpen(false); setDropdown(null); }, [pathname]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 bg-white ${scrolled ? 'shadow-md' : 'border-b border-slate-100'}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo — large and prominent */}
        <Link to="/" className="flex items-center flex-shrink-0">
          <img src="/logo.png" alt="JabaliCloud" className="h-12 w-auto" style={{ maxWidth: 180 }} />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV.map(item => (
            <div key={item.label} className="relative"
              onMouseEnter={() => item.sub && setDropdown(item.label)}
              onMouseLeave={() => setDropdown(null)}>
              {item.href ? (
                <Link to={item.href} className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-all">
                  {item.label}
                </Link>
              ) : (
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-all">
                  {item.label}
                  <svg className={`w-3.5 h-3.5 transition-transform ${dropdown===item.label?'rotate-180':''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                </button>
              )}
              {item.sub && dropdown===item.label && (
                <div className="absolute top-full left-0 pt-2 w-64">
                  <div className="bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden">
                    {item.sub.map(s => (
                      <Link key={s.href} to={s.href} className="flex flex-col px-4 py-3.5 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
                        <span className="text-sm font-semibold text-slate-900">{s.label}</span>
                        <span className="text-xs text-slate-500 mt-0.5">{s.desc}</span>
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
          <a href="https://my.jabalicloud.com" className="text-sm font-medium text-slate-600 hover:text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-50 transition-all">
            Client Login
          </a>
          <a href="https://my.jabalicloud.com" className="btn-primary text-sm px-5 py-2.5">
            Get Started
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50" onClick={() => setOpen(!open)}>
          {open
            ? <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            : <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
          }
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-1">
          <Link to="/shared-hosting" className="py-2.5 px-3 text-sm font-medium text-slate-700 rounded-lg hover:bg-slate-50">Shared Hosting</Link>
          <Link to="/vps"            className="py-2.5 px-3 text-sm font-medium text-slate-700 rounded-lg hover:bg-slate-50">VPS Hosting</Link>
          <Link to="/dedicated"      className="py-2.5 px-3 text-sm font-medium text-slate-700 rounded-lg hover:bg-slate-50">Dedicated Servers</Link>
          <Link to="/domains"        className="py-2.5 px-3 text-sm font-medium text-slate-700 rounded-lg hover:bg-slate-50">Domains</Link>
          <Link to="/about"          className="py-2.5 px-3 text-sm font-medium text-slate-700 rounded-lg hover:bg-slate-50">About</Link>
          <Link to="/contact"        className="py-2.5 px-3 text-sm font-medium text-slate-700 rounded-lg hover:bg-slate-50">Contact</Link>
          <div className="border-t border-slate-100 mt-2 pt-3 flex flex-col gap-2">
            <a href="https://my.jabalicloud.com" className="py-2.5 px-3 text-sm font-medium text-slate-700 text-center border border-slate-200 rounded-xl hover:bg-slate-50">Client Login</a>
            <a href="https://my.jabalicloud.com" className="btn-primary text-sm text-center justify-center">Get Started</a>
          </div>
        </div>
      )}
    </nav>
  );
}
