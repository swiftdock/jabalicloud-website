import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV = [
  { label: 'Hosting', sub: [
    { label: 'Shared Hosting', href: '/shared-hosting', desc: 'Perfect for websites & blogs' },
    { label: 'VPS Hosting', href: '/vps', desc: 'Scalable virtual private servers' },
    { label: 'Dedicated Servers', href: '/dedicated', desc: 'Maximum power & control' },
  ]},
  { label: 'Domains', href: '/domains' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [open, setOpen]           = useState(false);
  const [dropdown, setDropdown]   = useState(null);
  const { pathname }              = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => { setOpen(false); setDropdown(null); }, [pathname]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0e1a]/95 backdrop-blur-md shadow-lg shadow-black/30 border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-emerald-500 flex items-center justify-center text-white font-bold text-sm">J</div>
          <span className="font-bold text-white text-lg tracking-tight">Jabali<span className="text-violet-400">Cloud</span></span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV.map(item => (
            <div key={item.label} className="relative"
              onMouseEnter={() => item.sub && setDropdown(item.label)}
              onMouseLeave={() => setDropdown(null)}>
              {item.href ? (
                <Link to={item.href} className="px-4 py-2 text-sm text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-all">
                  {item.label}
                </Link>
              ) : (
                <button className="flex items-center gap-1 px-4 py-2 text-sm text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-all">
                  {item.label}
                  <svg className={`w-3.5 h-3.5 transition-transform ${dropdown===item.label?'rotate-180':''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                </button>
              )}
              {item.sub && dropdown === item.label && (
                <div className="absolute top-full left-0 pt-2 w-64">
                  <div className="bg-[#111827] border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden">
                    {item.sub.map(s => (
                      <Link key={s.href} to={s.href} className="flex flex-col px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                        <span className="text-sm font-medium text-white">{s.label}</span>
                        <span className="text-xs text-gray-400 mt-0.5">{s.desc}</span>
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
          <a href="https://my.jabalicloud.com" className="text-sm text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 transition-all">
            Client Login
          </a>
          <a href="https://my.jabalicloud.com" className="text-sm font-semibold bg-violet-600 hover:bg-violet-500 text-white px-5 py-2 rounded-lg transition-all shadow-lg shadow-violet-900/30">
            Get Started
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden p-2 text-gray-400" onClick={() => setOpen(!open)}>
          {open
            ? <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            : <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
          }
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-[#0d1120] border-t border-white/5 px-6 py-4 flex flex-col gap-2">
          <Link to="/shared-hosting" className="py-2.5 text-sm text-gray-300 border-b border-white/5">Shared Hosting</Link>
          <Link to="/vps" className="py-2.5 text-sm text-gray-300 border-b border-white/5">VPS Hosting</Link>
          <Link to="/dedicated" className="py-2.5 text-sm text-gray-300 border-b border-white/5">Dedicated Servers</Link>
          <Link to="/domains" className="py-2.5 text-sm text-gray-300 border-b border-white/5">Domains</Link>
          <Link to="/about" className="py-2.5 text-sm text-gray-300 border-b border-white/5">About</Link>
          <Link to="/contact" className="py-2.5 text-sm text-gray-300 border-b border-white/5">Contact</Link>
          <a href="https://my.jabalicloud.com" className="mt-2 w-full text-center bg-violet-600 text-white py-3 rounded-lg text-sm font-semibold">Get Started</a>
        </div>
      )}
    </nav>
  );
}
