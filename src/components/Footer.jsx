import { Link } from 'react-router-dom';

const COLS = {
  'Hosting':  [['Shared Hosting','/shared-hosting'],['VPS Hosting','/vps'],['Dedicated Servers','/dedicated']],
  'Services': [['Domain Registration','/domains'],['SSL Certificates','/shared-hosting'],['Free Migration','/contact']],
  'Company':  [['About Us','/about'],['Contact','/contact'],['Client Portal','https://my.jabalicloud.com']],
  'Legal':    [['Privacy Policy','#'],['Terms of Service','#'],['Acceptable Use','#']],
};

export default function Footer() {
  return (
    <footer style={{ background: '#02020a', borderTop: '1px solid rgba(255,255,255,.05)' }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2 md:col-span-1">
            <Link to="/"><img src="/logo.png" alt="JabaliCloud" className="h-10 w-auto mb-5" /></Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,.3)' }}>
              Reliable, fast web hosting built for Africa. Enterprise infrastructure at African prices.
            </p>
          </div>
          {Object.entries(COLS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,.25)', letterSpacing: '.12em' }}>{title}</h4>
              <ul className="space-y-3">
                {links.map(([label, href]) => (
                  <li key={label}>
                    {href.startsWith('http') || href === '#'
                      ? <a href={href} className="text-sm transition-colors" style={{ color: 'rgba(255,255,255,.35)' }}
                          onMouseEnter={e=>e.target.style.color='rgba(255,255,255,.7)'}
                          onMouseLeave={e=>e.target.style.color='rgba(255,255,255,.35)'}>{label}</a>
                      : <Link to={href} className="text-sm transition-colors" style={{ color: 'rgba(255,255,255,.35)' }}
                          onMouseEnter={e=>e.target.style.color='rgba(255,255,255,.7)'}
                          onMouseLeave={e=>e.target.style.color='rgba(255,255,255,.35)'}>{label}</Link>
                    }
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,.05)' }}>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,.2)' }}>© {new Date().getFullYear()} JabaliCloud. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm" style={{ color: 'rgba(255,255,255,.2)' }}>
            <span>🇿🇦 South Africa</span><span>·</span><span>99.9% Uptime SLA</span><span>·</span><span>24/7 Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
