import { Link } from 'react-router-dom';

const LINKS = {
  'Hosting': [
    { label: 'Shared Hosting',    href: '/shared-hosting' },
    { label: 'VPS Hosting',       href: '/vps' },
    { label: 'Dedicated Servers', href: '/dedicated' },
  ],
  'Services': [
    { label: 'Domain Registration', href: '/domains' },
    { label: 'SSL Certificates',    href: '/shared-hosting' },
    { label: 'Website Migration',   href: '/contact' },
  ],
  'Company': [
    { label: 'About Us',     href: '/about' },
    { label: 'Contact',      href: '/contact' },
    { label: 'Client Portal', href: 'https://my.jabalicloud.com' },
  ],
  'Legal': [
    { label: 'Privacy Policy',  href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Acceptable Use',  href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/">
              <img src="/logo.png" alt="JabaliCloud" className="h-10 w-auto mb-4" />
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed mb-5">
              Reliable web hosting built for Africa. Fast servers, 24/7 support, and enterprise-grade security.
            </p>
            <div className="flex gap-2.5">
              {['T','F','L','I'].map((s,i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all text-xs font-bold">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(l => (
                  <li key={l.label}>
                    {l.href.startsWith('http') ? (
                      <a href={l.href} className="text-sm text-slate-500 hover:text-slate-900 transition-colors">{l.label}</a>
                    ) : (
                      <Link to={l.href} className="text-sm text-slate-500 hover:text-slate-900 transition-colors">{l.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">© {new Date().getFullYear()} JabaliCloud. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <span>🇿🇦 South Africa</span>
            <span>·</span>
            <span>99.9% Uptime SLA</span>
            <span>·</span>
            <span>24/7 Expert Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
