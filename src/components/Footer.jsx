import { Link } from 'react-router-dom';

const COLS = {
  'Hosting':  [['Shared Hosting','/shared-hosting'],['VPS Hosting','/vps'],['Dedicated Servers','/dedicated']],
  'Services': [['Domain Registration','/domains'],['SSL Certificates','/shared-hosting'],['Free Migration','/contact']],
  'Company':  [['About Us','/about'],['Contact','/contact'],['Client Portal','https://my.jabalicloud.com']],
  'Legal':    [['Privacy Policy','#'],['Terms of Service','#'],['Acceptable Use','#']],
};

export default function Footer() {
  return (
    <footer style={{ background:'#0f172a', borderTop:'1px solid rgba(255,255,255,.06)' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'64px 24px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr', gap:40, marginBottom:48, flexWrap:'wrap' }}>
          <div>
            {/* Logo on dark — full color, pops perfectly */}
            <Link to="/"><img src="/logo.png" alt="JabaliCloud" style={{ height:44, width:'auto', maxWidth:200, display:'block', marginBottom:20 }} /></Link>
            <p style={{ fontSize:14, color:'rgba(255,255,255,.35)', lineHeight:1.7, maxWidth:260 }}>
              Reliable, fast web hosting built for Africa. Enterprise infrastructure at African prices.
            </p>
          </div>
          {Object.entries(COLS).map(([title, links]) => (
            <div key={title}>
              <h4 style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'.12em', color:'rgba(255,255,255,.25)', marginBottom:16 }}>{title}</h4>
              <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:12 }}>
                {links.map(([label,href]) => (
                  <li key={label}>
                    {href.startsWith('http')||href==='#'
                      ? <a href={href} style={{ fontSize:14, color:'rgba(255,255,255,.4)', textDecoration:'none', transition:'color .15s' }}
                          onMouseEnter={e=>e.target.style.color='rgba(255,255,255,.8)'}
                          onMouseLeave={e=>e.target.style.color='rgba(255,255,255,.4)'}>{label}</a>
                      : <Link to={href} style={{ fontSize:14, color:'rgba(255,255,255,.4)', textDecoration:'none', transition:'color .15s' }}
                          onMouseEnter={e=>e.target.style.color='rgba(255,255,255,.8)'}
                          onMouseLeave={e=>e.target.style.color='rgba(255,255,255,.4)'}>{label}</Link>
                    }
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop:'1px solid rgba(255,255,255,.06)', paddingTop:24, display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'center', gap:12 }}>
          <p style={{ fontSize:13, color:'rgba(255,255,255,.2)' }}>© {new Date().getFullYear()} JabaliCloud. All rights reserved.</p>
          <div style={{ display:'flex', alignItems:'center', gap:20, fontSize:13, color:'rgba(255,255,255,.2)' }}>
            <span>🇿🇦 South Africa</span><span>·</span><span>99.9% Uptime SLA</span><span>·</span><span>24/7 Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
