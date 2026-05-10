import { Link } from 'react-router-dom';

const LINKS = {
  'Hosting': [
    { label: 'Shared Hosting', href: '/shared-hosting' },
    { label: 'VPS Hosting', href: '/vps' },
    { label: 'Dedicated Servers', href: '/dedicated' },
  ],
  'Services': [
    { label: 'Domain Registration', href: '/domains' },
    { label: 'SSL Certificates', href: '/shared-hosting' },
    { label: 'Website Migration', href: '/contact' },
  ],
  'Company': [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Client Portal', href: 'https://my.jabalicloud.com' },
  ],
  'Legal': [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Acceptable Use', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#060912] border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-emerald-500 flex items-center justify-center text-white font-bold text-sm">J</div>
              <span className="font-bold text-white text-lg">Jabali<span className="text-violet-400">Cloud</span></span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Reliable web hosting built for Africa. Fast servers, 24/7 support, and enterprise-grade security.
            </p>
            <div className="flex gap-3">
              {['twitter','facebook','linkedin','instagram'].map(s => (
                <a key={s} href="#" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-violet-600/20 border border-white/10 hover:border-violet-500/30 flex items-center justify-center transition-all text-gray-400 hover:text-violet-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(l => (
                  <li key={l.label}>
                    {l.href.startsWith('http') ? (
                      <a href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">{l.label}</a>
                    ) : (
                      <Link to={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">{l.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} JabaliCloud. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <span>🇿🇦 South Africa</span>
            <span>•</span>
            <span>99.9% Uptime SLA</span>
            <span>•</span>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
