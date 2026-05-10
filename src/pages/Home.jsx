import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef();
  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect(); }
    }, { threshold: 0.06 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className="reveal" style={{ transitionDelay:`${delay}ms`, ...style }}>{children}</div>;
}

const IMG = {
  hero:       'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=85&auto=format&fit=crop',
  shared:     'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80&auto=format&fit=crop',
  vps:        'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=500&q=80&auto=format&fit=crop',
  dedicated:  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&q=80&auto=format&fit=crop',
  av1:        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&auto=format&fit=crop&face',
  av2:        'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&q=80&auto=format&fit=crop&face',
  av3:        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&q=80&auto=format&fit=crop&face',
  av4:        'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80&auto=format&fit=crop&face',
};

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const [domain, setDomain] = useState('');
  return (
    <section style={{ position:'relative', background:'#f8fafc', overflow:'hidden', paddingTop:228 }}>
      <div style={{ position:'absolute', top:0, right:0, width:600, height:500, pointerEvents:'none',
        background:'radial-gradient(ellipse 70% 60% at 80% 20%, rgba(37,99,235,.08) 0%, transparent 65%)' }} />
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', opacity:.4,
        backgroundImage:'radial-gradient(circle, #cbd5e1 1px, transparent 1px)', backgroundSize:'28px 28px' }} />

      <div style={{ position:'relative', maxWidth:1280, margin:'0 auto', padding:'64px 24px 80px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}>

        {/* Left — text */}
        <div>
          <Reveal>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, marginBottom:24,
              background:'#eff6ff', border:'1px solid #bfdbfe', borderRadius:999, padding:'7px 16px' }}>
              <span style={{ width:7, height:7, borderRadius:'50%', background:'#10b981', animation:'breathe 3s ease-in-out infinite', flexShrink:0 }} />
              <span style={{ fontSize:13, fontWeight:500, color:'#1e40af' }}>10,000+ websites trust JabaliCloud</span>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <h1 style={{ fontWeight:900, color:'#0f172a', marginBottom:18, lineHeight:.93, letterSpacing:'-0.04em',
              fontSize:'clamp(40px, 5.5vw, 72px)' }}>
              Web Hosting<br />
              <span className="grad">Built for Africa.</span>
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p style={{ fontSize:18, color:'#475569', maxWidth:480, marginBottom:32, lineHeight:1.65 }}>
              Blazing-fast LiteSpeed servers, 99.9% uptime, and real humans supporting you 24/7. Start in minutes.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div style={{ display:'flex', gap:8, marginBottom:24, padding:6, background:'#fff',
              border:'1.5px solid #e2e8f0', borderRadius:16, boxShadow:'0 2px 8px rgba(15,23,42,.06)', flexWrap:'wrap' }}>
              <input value={domain} onChange={e=>setDomain(e.target.value)}
                onKeyDown={e=>{ if(e.key==='Enter') window.location.href=`/domains?q=${domain}`; }}
                placeholder="yourbusiness.com"
                style={{ flex:1, minWidth:180, padding:'12px 16px', fontSize:15, color:'#0f172a',
                  background:'transparent', border:'none', outline:'none', fontFamily:'inherit', fontWeight:500 }} />
              <Link to={`/domains?q=${domain}`} className="btn-cta" style={{ fontSize:14, padding:'11px 22px', flexShrink:0, whiteSpace:'nowrap' }}>
                Search Domain →
              </Link>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div style={{ display:'flex', flexWrap:'wrap', gap:10, marginBottom:40 }}>
              {[['🔒','Free SSL'],['⚡','99.9% Uptime'],['🔄','Free Migration'],['💬','24/7 Support'],['↩️','30-Day Guarantee']].map(([icon,text]) => (
                <div key={text} style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, fontWeight:500,
                  color:'#64748b', background:'#fff', border:'1px solid #e2e8f0', borderRadius:999, padding:'5px 12px' }}>
                  <span>{icon}</span><span>{text}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10 }}>
              {[['10K+','Websites'],['99.9%','Uptime'],['< 2min','Support'],['4.9★','Rating']].map(([val,label]) => (
                <div key={label} className="glass-card" style={{ padding:'16px 12px', textAlign:'center' }}>
                  <div className="grad" style={{ fontSize:18, fontWeight:900, letterSpacing:'-0.03em', marginBottom:3 }}>{val}</div>
                  <div style={{ fontSize:11, color:'#94a3b8', fontWeight:500 }}>{label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right — hero image */}
        <Reveal delay={100} style={{ position:'relative' }}>
          <div style={{ position:'relative' }}>
            {/* Glow behind image */}
            <div style={{ position:'absolute', inset:-24, background:'radial-gradient(ellipse, rgba(37,99,235,.12) 0%, transparent 70%)', borderRadius:32, filter:'blur(20px)' }} />
            {/* Main image card */}
            <div style={{ position:'relative', borderRadius:24, overflow:'hidden', boxShadow:'0 24px 80px rgba(15,23,42,.15)', border:'1px solid rgba(37,99,235,.15)' }}>
              <img src={IMG.hero} alt="JabaliCloud servers"
                style={{ width:'100%', height:480, objectFit:'cover', display:'block' }} />
              {/* Overlay badge */}
              <div style={{ position:'absolute', bottom:20, left:20, right:20, background:'rgba(255,255,255,.92)', backdropFilter:'blur(12px)', borderRadius:14, padding:'14px 18px', display:'flex', alignItems:'center', gap:12, boxShadow:'0 4px 20px rgba(15,23,42,.12)' }}>
                <div style={{ width:8, height:8, borderRadius:'50%', background:'#10b981', animation:'breathe 2s ease-in-out infinite', flexShrink:0 }} />
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:'#0f172a' }}>All Systems Operational</div>
                  <div style={{ fontSize:11, color:'#64748b', marginTop:1 }}>serv1.jabalicloud.com · 203.161.55.235</div>
                </div>
                <div style={{ marginLeft:'auto', fontSize:13, fontWeight:800, color:'#10b981' }}>99.9%</div>
              </div>
            </div>
            {/* Floating stat */}
            <div style={{ position:'absolute', top:-16, right:-16, background:'#fff', border:'1px solid #e2e8f0', borderRadius:16, padding:'12px 16px', boxShadow:'0 8px 24px rgba(15,23,42,.1)', animation:'float 6s ease-in-out infinite' }}>
              <div className="grad" style={{ fontSize:22, fontWeight:900, letterSpacing:'-0.03em' }}>6×</div>
              <div style={{ fontSize:11, color:'#64748b', fontWeight:500 }}>Faster than Apache</div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Mobile: stack vertically */}
      <style>{`@media(max-width:768px){.hero-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

// ── Logo strip ────────────────────────────────────────────────────────────────
function LogoStrip() {
  return (
    <section style={{ background:'#fff', borderTop:'1px solid #f1f5f9', borderBottom:'1px solid #f1f5f9', padding:'28px 24px' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <p style={{ textAlign:'center', fontSize:11, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'#cbd5e1', marginBottom:20 }}>Powered by industry leaders</p>
        <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', alignItems:'center', gap:40 }}>
          {['CloudLinux','LiteSpeed',"Let's Encrypt",'cPanel','Softaculous','Cloudflare'].map(name => (
            <span key={name} style={{ fontSize:14, fontWeight:700, color:'#94a3b8', cursor:'default', transition:'color .2s' }}
              onMouseEnter={e=>e.target.style.color='#475569'}
              onMouseLeave={e=>e.target.style.color='#94a3b8'}>{name}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Hosting Plans ─────────────────────────────────────────────────────────────
function HostingPlans() {
  const plans = [
    { icon:'🌐', label:'Shared Hosting', href:'/shared-hosting', price:'From $1.99/mo', accent:'#2563eb', bg:'#eff6ff', border:'#bfdbfe', img: IMG.shared,
      desc:'Perfect for blogs, portfolios and small businesses.',
      features:['Free SSL & CDN','cPanel Control Panel','Unlimited Email','One-click WordPress'] },
    { icon:'⚡', label:'VPS Hosting', href:'/vps', price:'From $9.99/mo', accent:'#7c3aed', bg:'#f5f3ff', border:'#ddd6fe', img: IMG.vps,
      desc:'Dedicated resources and full root access that scales.',
      features:['Full Root Access','Dedicated RAM & CPU','NVMe SSD Storage','DDoS Protection'] },
    { icon:'🖥️', label:'Dedicated Servers', href:'/dedicated', price:'From $89/mo', accent:'#0891b2', bg:'#ecfeff', border:'#a5f3fc', img: IMG.dedicated,
      desc:'Bare metal power for enterprise workloads.',
      features:['Exclusive Hardware','Enterprise SSD RAID','Full Hardware Control','Managed Options'] },
  ];
  return (
    <section style={{ background:'#fff', padding:'96px 24px' }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <Reveal>
          <div style={{ marginBottom:52 }}>
            <div className="eyebrow" style={{ marginBottom:10 }}>Hosting Solutions</div>
            <h2 style={{ fontWeight:900, color:'#0f172a', fontSize:'clamp(32px,4vw,52px)', letterSpacing:'-0.03em', marginBottom:10 }}>Choose Your Perfect Plan</h2>
            <p style={{ fontSize:18, color:'#475569', maxWidth:480 }}>From personal blogs to enterprise apps — built on premium African infrastructure.</p>
          </div>
        </Reveal>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:20 }}>
          {plans.map((p,i) => (
            <Reveal key={p.label} delay={i*80}>
              <Link to={p.href} style={{ display:'block', height:'100%', textDecoration:'none' }}>
                <div className="glass-card" style={{ overflow:'hidden', height:'100%', cursor:'pointer' }}>
                  {/* Plan image */}
                  <div style={{ height:180, overflow:'hidden', position:'relative' }}>
                    <img src={p.img} alt={p.label} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform .4s' }}
                      onMouseEnter={e=>e.target.style.transform='scale(1.05)'}
                      onMouseLeave={e=>e.target.style.transform='scale(1)'} />
                    <div style={{ position:'absolute', inset:0, background:`linear-gradient(to bottom, transparent 40%, rgba(248,250,252,.95) 100%)` }} />
                    <div style={{ position:'absolute', bottom:12, left:16 }}>
                      <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:'#fff', border:`1.5px solid ${p.border}`, borderRadius:999, padding:'4px 12px' }}>
                        <span>{p.icon}</span>
                        <span style={{ fontSize:12, fontWeight:700, color:p.accent }}>{p.label}</span>
                      </div>
                    </div>
                  </div>
                  {/* Card body */}
                  <div style={{ padding:'24px 28px 28px' }}>
                    <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg, ${p.accent}, ${p.accent}60)` }} />
                    <p style={{ fontSize:14, color:'#64748b', lineHeight:1.6, marginBottom:14 }}>{p.desc}</p>
                    <div style={{ fontSize:18, fontWeight:800, color:p.accent, marginBottom:20 }}>{p.price}</div>
                    <ul style={{ listStyle:'none', padding:0, margin:'0 0 24px', display:'flex', flexDirection:'column', gap:9 }}>
                      {p.features.map(f => (
                        <li key={f} style={{ display:'flex', alignItems:'center', gap:10, fontSize:13, color:'#475569' }}>
                          <span style={{ width:16, height:16, borderRadius:'50%', background:p.bg, border:`1.5px solid ${p.border}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, color:p.accent, flexShrink:0, fontWeight:800 }}>✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <span style={{ fontSize:13, fontWeight:700, color:p.accent }}>View plans →</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Features bento ────────────────────────────────────────────────────────────
function Features() {
  return (
    <section style={{ background:'#f8fafc', padding:'96px 24px' }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <Reveal><div style={{ textAlign:'center', marginBottom:52 }}>
          <div className="eyebrow" style={{ justifyContent:'center', marginBottom:10 }}>Why JabaliCloud</div>
          <h2 style={{ fontWeight:900, color:'#0f172a', fontSize:'clamp(32px,4vw,52px)', letterSpacing:'-0.03em' }}>Built Different. Built Better.</h2>
        </div></Reveal>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:16 }}>
          <Reveal style={{ gridColumn:'span 3' }} delay={0}>
            <div className="glass-card" style={{ padding:40, height:'100%', minHeight:300, background:'linear-gradient(135deg,#2563eb,#00b894)', border:'none', boxShadow:'0 8px 40px rgba(37,99,235,.25)', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:-40, right:-40, width:160, height:160, borderRadius:'50%', background:'rgba(255,255,255,.08)' }} />
              <div style={{ position:'absolute', bottom:-20, left:-20, width:120, height:120, borderRadius:'50%', background:'rgba(255,255,255,.05)' }} />
              <div style={{ position:'relative' }}>
                <div style={{ fontSize:40, marginBottom:18 }}>⚡</div>
                <h3 style={{ fontSize:24, fontWeight:900, color:'#fff', letterSpacing:'-0.02em', marginBottom:10 }}>LiteSpeed Powered</h3>
                <p style={{ fontSize:15, color:'rgba(255,255,255,.75)', lineHeight:1.65, marginBottom:24 }}>
                  Up to 6× faster than Apache. Sub-second page loads for every visitor, every time.
                </p>
                <div style={{ background:'rgba(255,255,255,.12)', borderRadius:12, padding:16 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, color:'rgba(255,255,255,.7)', marginBottom:8 }}>
                    <span>Average load time</span><span style={{ fontWeight:700, color:'#fff' }}>0.4s</span>
                  </div>
                  <div style={{ height:6, borderRadius:99, background:'rgba(255,255,255,.15)' }}>
                    <div style={{ height:'100%', width:'94%', borderRadius:99, background:'rgba(255,255,255,.75)' }} />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal style={{ gridColumn:'span 3', display:'grid', gridTemplateRows:'1fr 1fr', gap:16 }} delay={80}>
            <div className="glass-card" style={{ padding:32 }}>
              <div style={{ fontSize:28, marginBottom:14 }}>🔒</div>
              <h3 style={{ fontSize:17, fontWeight:800, color:'#0f172a', marginBottom:8 }}>Free SSL & Security</h3>
              <p style={{ fontSize:14, color:'#64748b', lineHeight:1.6 }}>Let's Encrypt SSL, daily malware scanning, and DDoS protection on every plan.</p>
            </div>
            <div className="glass-card" style={{ padding:32 }}>
              <div style={{ fontSize:28, marginBottom:14 }}>💬</div>
              <h3 style={{ fontSize:17, fontWeight:800, color:'#0f172a', marginBottom:8 }}>24/7 Human Support</h3>
              <p style={{ fontSize:14, color:'#64748b', lineHeight:1.6 }}>Real people, not bots. Average response under 2 minutes via chat, ticket, or phone.</p>
            </div>
          </Reveal>
          <Reveal style={{ gridColumn:'span 2' }} delay={120}>
            <div className="glass-card" style={{ padding:32 }}>
              <div style={{ fontSize:28, marginBottom:14 }}>🔧</div>
              <h3 style={{ fontSize:17, fontWeight:800, color:'#0f172a', marginBottom:8 }}>cPanel Included</h3>
              <p style={{ fontSize:14, color:'#64748b', lineHeight:1.6 }}>Industry-standard control panel with one-click WordPress and 400+ app installs.</p>
            </div>
          </Reveal>
          <Reveal style={{ gridColumn:'span 2' }} delay={160}>
            <div className="glass-card" style={{ padding:32 }}>
              <div style={{ fontSize:28, marginBottom:14 }}>💾</div>
              <h3 style={{ fontSize:17, fontWeight:800, color:'#0f172a', marginBottom:8 }}>Daily Backups</h3>
              <p style={{ fontSize:14, color:'#64748b', lineHeight:1.6 }}>Automated daily backups for 30 days. One-click restore from your dashboard.</p>
            </div>
          </Reveal>
          <Reveal style={{ gridColumn:'span 2' }} delay={200}>
            <div className="glass-card" style={{ padding:32, borderColor:'#a7f3d0', background:'linear-gradient(135deg,#ecfdf5,#fff)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14 }}>
                <span style={{ width:8, height:8, borderRadius:'50%', background:'#10b981', animation:'breathe 3s ease-in-out infinite' }} />
                <span style={{ fontSize:10, fontWeight:700, color:'#059669', letterSpacing:'.1em' }}>LIVE</span>
              </div>
              <h3 style={{ fontSize:17, fontWeight:800, color:'#0f172a', marginBottom:8 }}>🌍 African Data Centres</h3>
              <p style={{ fontSize:14, color:'#64748b', lineHeight:1.6 }}>SA primary servers with edge nodes in Nairobi, Lagos, and Cairo.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ── Pricing ───────────────────────────────────────────────────────────────────
function Pricing() {
  const [annual, setAnnual] = useState(true);
  const plans = [
    { name:'Starter', mo:2.99, yr:1.99, features:['1 Website','10 GB NVMe SSD','100 GB Bandwidth','5 Email Accounts','Free SSL','cPanel'] },
    { name:'Business', mo:5.99, yr:3.99, pop:true, features:['Unlimited Websites','50 GB NVMe SSD','Unlimited Bandwidth','Unlimited Email','Free SSL','Daily Backups','Priority Support','Free Domain'] },
    { name:'Enterprise', mo:9.99, yr:6.99, features:['Unlimited Websites','100 GB NVMe SSD','Unlimited Bandwidth','Unlimited Email','Free SSL','Daily Backups','Dedicated IP','24/7 Phone Support'] },
  ];
  return (
    <section style={{ background:'#fff', padding:'96px 24px' }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <Reveal><div style={{ textAlign:'center', marginBottom:44 }}>
          <div className="eyebrow" style={{ justifyContent:'center', marginBottom:10 }}>Shared Hosting</div>
          <h2 style={{ fontWeight:900, color:'#0f172a', fontSize:'clamp(32px,4vw,52px)', letterSpacing:'-0.03em', marginBottom:10 }}>Honest Pricing. No Surprises.</h2>
          <p style={{ fontSize:17, color:'#475569', marginBottom:24 }}>Cancel anytime · 30-day money-back guarantee</p>
          <div style={{ display:'inline-flex', background:'#f1f5f9', borderRadius:99, padding:4 }}>
            {[['Monthly',false],['Annual',true]].map(([label,val]) => (
              <button key={label} onClick={()=>setAnnual(val)}
                style={{ padding:'8px 20px', borderRadius:99, border:'none', cursor:'pointer', fontSize:13, fontWeight:600, transition:'all .2s',
                  background: annual===val ? '#fff' : 'transparent', color: annual===val ? '#0f172a' : '#64748b',
                  boxShadow: annual===val ? '0 1px 4px rgba(15,23,42,.08)' : 'none' }}>
                {label}{val && <span style={{color:'#10b981',fontSize:11,fontWeight:700}}> −33%</span>}
              </button>
            ))}
          </div>
        </div></Reveal>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:20 }}>
          {plans.map((p,i) => (
            <Reveal key={p.name} delay={i*80}>
              <div style={{ position:'relative', borderRadius:20, height:'100%' }}>
                {p.pop && <div style={{ position:'absolute', top:0, left:0, right:0, height:2, borderRadius:'20px 20px 0 0', background:'linear-gradient(90deg,#2563eb,#00b894)' }} />}
                <div className="glass-card" style={{ padding:36, height:'100%', display:'flex', flexDirection:'column',
                  ...(p.pop ? { borderColor:'rgba(37,99,235,.2)', background:'linear-gradient(135deg,#eff6ff,#ecfdf5)' } : {}) }}>
                  {p.pop && <div style={{ alignSelf:'flex-start', marginBottom:14, padding:'4px 14px', borderRadius:99, background:'linear-gradient(135deg,#2563eb,#00b894)', color:'#fff', fontSize:11, fontWeight:700 }}>Most Popular</div>}
                  <h3 style={{ fontSize:18, fontWeight:800, color:'#0f172a', marginBottom:8 }}>{p.name}</h3>
                  <div style={{ display:'flex', alignItems:'baseline', gap:4, marginBottom:24 }}>
                    <span style={{ fontSize:44, fontWeight:900, color:'#0f172a', letterSpacing:'-0.04em' }}>${annual?p.yr:p.mo}</span>
                    <span style={{ fontSize:13, color:'#94a3b8' }}>/mo</span>
                  </div>
                  <ul style={{ listStyle:'none', padding:0, margin:'0 0 24px', flex:1, display:'flex', flexDirection:'column', gap:10 }}>
                    {p.features.map(f => (
                      <li key={f} style={{ display:'flex', alignItems:'center', gap:10, fontSize:13, color:'#475569' }}>
                        <span style={{ color:'#10b981', fontSize:13, flexShrink:0 }}>✓</span>{f}
                      </li>
                    ))}
                  </ul>
                  <a href="https://my.jabalicloud.com" className={p.pop ? 'btn-cta' : 'btn-ghost'}
                    style={{ justifyContent:'center', textAlign:'center', width:'100%' }}>Get Started</a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Domain ────────────────────────────────────────────────────────────────────
function DomainSearch() {
  const [q,setQ]=useState(''); const [res,setRes]=useState([]); const [busy,setBusy]=useState(false);
  const TLDS=['.com','.net','.org','.co.za','.africa','.io','.store','.online'];
  const P={'.com':'$12.99','.net':'$10.99','.org':'$9.99','.co.za':'$6.99','.africa':'$14.99','.io':'$39.99','.store':'$5.99','.online':'$3.99'};
  function search(){if(!q.trim())return;setBusy(true);setTimeout(()=>{const b=q.replace(/\..+$/,'').toLowerCase();setRes(TLDS.map(t=>({name:b+t,price:P[t],ok:Math.random()>.3})));setBusy(false);},700);}
  return (
    <section style={{ padding:'96px 24px', background:'linear-gradient(135deg,#1e3a8a,#2563eb 40%,#00b894)' }}>
      <div style={{ maxWidth:860, margin:'0 auto', textAlign:'center' }}>
        <Reveal>
          <h2 style={{ fontWeight:900, color:'#fff', fontSize:'clamp(30px,4vw,52px)', letterSpacing:'-0.03em', marginBottom:12 }}>Claim Your Domain Today</h2>
          <p style={{ fontSize:17, color:'rgba(255,255,255,.65)', marginBottom:32 }}>Search millions of domains. Competitive prices, instant activation.</p>
        </Reveal>
        <Reveal delay={80}>
          <div style={{ display:'flex', gap:10, maxWidth:580, margin:'0 auto 20px', flexWrap:'wrap' }}>
            <input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')search();}}
              placeholder="yourbusiness.com"
              style={{ flex:1, minWidth:200, padding:'15px 20px', fontSize:15, background:'rgba(255,255,255,.15)', border:'1.5px solid rgba(255,255,255,.25)', borderRadius:12, color:'#fff', outline:'none', fontFamily:'inherit', fontWeight:500 }} />
            <button onClick={search} disabled={busy}
              style={{ padding:'15px 28px', background:'#fff', color:'#1e3a8a', border:'none', borderRadius:12, fontWeight:700, fontSize:14, cursor:'pointer', flexShrink:0 }}>
              {busy?'...':'Search'}
            </button>
          </div>
        </Reveal>
        {res.length>0 && (
          <Reveal>
            <div style={{ background:'#fff', borderRadius:16, overflow:'hidden', maxWidth:580, margin:'0 auto 20px', textAlign:'left' }}>
              {res.slice(0,5).map((r,i)=>(
                <div key={r.name} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'13px 20px', borderBottom:i<4?'1px solid #f1f5f9':'none' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <span style={{ width:7, height:7, borderRadius:'50%', background:r.ok?'#10b981':'#f87171', flexShrink:0 }} />
                    <span style={{ fontSize:14, fontWeight:600, color:'#0f172a' }}>{r.name}</span>
                    <span style={{ fontSize:11, padding:'2px 8px', borderRadius:99, fontWeight:600, background:r.ok?'#ecfdf5':'#fef2f2', color:r.ok?'#059669':'#dc2626' }}>{r.ok?'Available':'Taken'}</span>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <span style={{ fontSize:13, fontWeight:600, color:'#475569' }}>{r.price}/yr</span>
                    {r.ok && <a href="https://my.jabalicloud.com" className="btn-cta" style={{ fontSize:12, padding:'6px 14px' }}>Add</a>}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        )}
        <Reveal delay={160}>
          <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:8 }}>
            {TLDS.map(t=>(
              <div key={t} style={{ padding:'7px 14px', background:'rgba(255,255,255,.1)', border:'1px solid rgba(255,255,255,.15)', borderRadius:10 }}>
                <span style={{ fontWeight:700, color:'#fff', fontSize:13 }}>{t}</span>
                <span style={{ color:'rgba(255,255,255,.5)', fontSize:12, marginLeft:6 }}>{P[t]}/yr</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Testimonials with avatars ─────────────────────────────────────────────────
function Testimonials() {
  const items=[
    { name:'Sipho Dlamini',    role:'E-commerce Owner · Johannesburg', avatar:IMG.av1, text:'Switched to JabaliCloud and my load time dropped 60%. Their team actually picks up the phone — no bots, no wait.' },
    { name:'Amara Osei',       role:'Web Developer · Accra',           avatar:IMG.av2, text:'I host 40+ client sites here. Rock-solid uptime, clean cPanel, and best pricing for African hosting I\'ve found.' },
    { name:'Fatima Al-Hassan', role:'Blogger · Nairobi',               avatar:IMG.av3, text:'One-click WordPress and free migration — I was live in under an hour with zero technical knowledge needed.' },
    { name:'David Eze',        role:'Startup Founder · Lagos',         avatar:IMG.av4, text:'Best infrastructure decision for my startup. Professional grade hosting at a price built for our African market.' },
  ];
  return (
    <section style={{ background:'#f8fafc', padding:'96px 24px' }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <Reveal><div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:16, marginBottom:48 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom:10 }}>Customer Stories</div>
            <h2 style={{ fontWeight:900, color:'#0f172a', fontSize:'clamp(28px,3.5vw,44px)', letterSpacing:'-0.03em' }}>Trusted Across Africa</h2>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:4 }}>
            {[1,2,3,4,5].map(i=><span key={i} style={{ color:'#f59e0b', fontSize:20 }}>★</span>)}
            <span style={{ fontSize:14, fontWeight:600, color:'#94a3b8', marginLeft:8 }}>4.9 / 5</span>
          </div>
        </div></Reveal>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:16 }}>
          {items.map((t,i)=>(
            <Reveal key={t.name} delay={i*60}>
              <div className="glass-card" style={{ padding:28, height:'100%', display:'flex', flexDirection:'column' }}>
                <div style={{ display:'flex', gap:2, marginBottom:16 }}>{[1,2,3,4,5].map(j=><span key={j} style={{ color:'#f59e0b', fontSize:14 }}>★</span>)}</div>
                <p style={{ fontSize:14, color:'#475569', lineHeight:1.7, flex:1, marginBottom:20 }}>"{t.text}"</p>
                {/* Avatar + name */}
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <img src={t.avatar} alt={t.name}
                    style={{ width:44, height:44, borderRadius:'50%', objectFit:'cover', border:'2px solid #e2e8f0', flexShrink:0 }} />
                  <div>
                    <div style={{ fontSize:14, fontWeight:700, color:'#0f172a' }}>{t.name}</div>
                    <div style={{ fontSize:12, color:'#94a3b8', marginTop:1 }}>{t.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section style={{ padding:'96px 24px', background:'#fff' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <Reveal>
          <div style={{ background:'#0f172a', borderRadius:28, padding:'80px 64px', textAlign:'center', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'linear-gradient(90deg,transparent,#2563eb,#00b894,transparent)' }} />
            <div style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width:400, height:300, pointerEvents:'none',
              background:'radial-gradient(circle, rgba(37,99,235,.18) 0%, transparent 70%)', filter:'blur(30px)' }} />
            <div style={{ position:'relative' }}>
              <div className="eyebrow" style={{ justifyContent:'center', marginBottom:14, color:'#34d399' }}>Start Today</div>
              <h2 style={{ fontWeight:900, color:'#fff', fontSize:'clamp(32px,5vw,60px)', letterSpacing:'-0.04em', lineHeight:.93, marginBottom:14 }}>
                Launch Your Website<br /><span className="grad">in Minutes.</span>
              </h2>
              <p style={{ fontSize:18, color:'rgba(255,255,255,.45)', maxWidth:440, margin:'0 auto 36px', lineHeight:1.6 }}>
                Join 10,000+ African businesses on JabaliCloud. Plans from $1.99/month.
              </p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:12, justifyContent:'center' }}>
                <a href="https://my.jabalicloud.com" className="btn-cta" style={{ fontSize:16, padding:'15px 36px' }}>Get Started — $1.99/mo →</a>
                <Link to="/shared-hosting" className="btn-ghost" style={{ fontSize:16, padding:'15px 36px', color:'rgba(255,255,255,.6)', borderColor:'rgba(255,255,255,.15)' }}>Compare All Plans</Link>
              </div>
              <p style={{ fontSize:12, color:'rgba(255,255,255,.2)', marginTop:20 }}>No contracts · Cancel anytime · 30-day money-back</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (<><Hero /><LogoStrip /><HostingPlans /><Features /><Pricing /><DomainSearch /><Testimonials /><CTA /></>);
}
