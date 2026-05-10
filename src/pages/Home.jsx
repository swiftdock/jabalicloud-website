import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef();
  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect(); }
    }, { threshold: 0.06 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const [domain, setDomain] = useState('');

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden mesh-bg pt-20">
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,.15) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,184,148,.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

      <div className="relative max-w-7xl mx-auto px-6 py-32 w-full">
        <div className="max-w-5xl mx-auto text-center">

          {/* Eyebrow */}
          <Reveal>
            <div className="inline-flex items-center gap-2.5 mb-8">
              <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.1] backdrop-blur-sm rounded-full px-5 py-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 breathe flex-shrink-0" />
                <span className="text-sm font-medium text-white/60">10,000+ websites trust JabaliCloud</span>
              </div>
            </div>
          </Reveal>

          {/* Headline */}
          <Reveal delay={80}>
            <h1 className="font-black text-white mb-6 leading-none"
              style={{ fontSize: 'clamp(48px, 8vw, 96px)', letterSpacing: '-0.05em', lineHeight: '0.95' }}>
              Web Hosting<br />
              <span className="grad" style={{ filter: 'drop-shadow(0 0 40px rgba(37,99,235,.4))' }}>Built for Africa.</span>
            </h1>
          </Reveal>

          {/* Sub */}
          <Reveal delay={160}>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed" style={{ color: 'rgba(255,255,255,.45)' }}>
              Enterprise-grade infrastructure. Blazing-fast LiteSpeed servers. Real humans supporting you around the clock. Start in minutes.
            </p>
          </Reveal>

          {/* Domain search */}
          <Reveal delay={240}>
            <div className="max-w-2xl mx-auto mb-6">
              <div className="flex flex-col sm:flex-row gap-3 p-1.5 rounded-2xl" style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', backdropFilter: 'blur(12px)' }}>
                <input
                  value={domain}
                  onChange={e => setDomain(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') window.location.href = `/domains?q=${domain}`; }}
                  placeholder="yourbusiness.com"
                  className="flex-1 px-5 py-3.5 text-sm text-white outline-none font-medium"
                  style={{ background: 'transparent', color: 'rgba(255,255,255,.9)' }}
                />
                <Link to={`/domains?q=${domain}`} className="btn-cta text-sm px-7 py-3.5 justify-center text-center whitespace-nowrap">
                  Search Domain →
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Trust pills */}
          <Reveal delay={320}>
            <div className="flex flex-wrap justify-center gap-3 mb-20">
              {[['🔒','Free SSL'],['⚡','99.9% Uptime'],['🔄','Free Migration'],['💬','24/7 Support'],['↩️','30-Day Guarantee']].map(([icon, text]) => (
                <div key={text} className="flex items-center gap-1.5 text-xs font-medium rounded-full px-4 py-2"
                  style={{ color: 'rgba(255,255,255,.4)', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.06)' }}>
                  <span>{icon}</span><span>{text}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Cinematic metrics bar */}
          <Reveal delay={400}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden"
              style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.07)' }}>
              {[['10K+','Websites Hosted'],['99.9%','Uptime SLA'],['< 2min','Support Response'],['5.0★','Customer Rating']].map(([val, label]) => (
                <div key={label} className="flex flex-col items-center justify-center py-8 px-4"
                  style={{ background: 'rgba(3,3,8,.6)', backdropFilter: 'blur(12px)' }}>
                  <div className="text-2xl md:text-3xl font-black grad mb-1" style={{ letterSpacing: '-0.03em' }}>{val}</div>
                  <div className="text-xs font-medium" style={{ color: 'rgba(255,255,255,.35)' }}>{label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #030308)' }} />
    </section>
  );
}

// ── Logo strip ────────────────────────────────────────────────────────────────
function LogoStrip() {
  return (
    <section className="py-12 px-6" style={{ borderTop: '1px solid rgba(255,255,255,.05)', borderBottom: '1px solid rgba(255,255,255,.05)' }}>
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-xs font-semibold uppercase tracking-widest mb-8" style={{ color: 'rgba(255,255,255,.2)', letterSpacing: '.14em' }}>
          Powered by industry leaders
        </p>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
          {['CloudLinux', 'LiteSpeed', "Let's Encrypt", 'cPanel', 'Softaculous', 'Cloudflare'].map(name => (
            <span key={name} className="text-sm font-semibold transition-colors duration-200 cursor-default"
              style={{ color: 'rgba(255,255,255,.2)' }}
              onMouseEnter={e => e.target.style.color='rgba(255,255,255,.6)'}
              onMouseLeave={e => e.target.style.color='rgba(255,255,255,.2)'}>
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Hosting Plans ─────────────────────────────────────────────────────────────
function HostingPlans() {
  const plans = [
    { icon:'🌐', label:'Shared Hosting', href:'/shared-hosting', price:'From $1.99/mo',
      desc:'Perfect for blogs, portfolios and growing businesses.',
      gradient:'linear-gradient(135deg, rgba(37,99,235,.15), rgba(96,165,250,.08))',
      accent:'#60a5fa',
      features:['Free SSL & CDN','cPanel Control Panel','Unlimited Email Accounts','One-click WordPress'] },
    { icon:'⚡', label:'VPS Hosting', href:'/vps', price:'From $9.99/mo',
      desc:'Dedicated resources and full root access that scales with you.',
      gradient:'linear-gradient(135deg, rgba(139,92,246,.15), rgba(196,181,253,.08))',
      accent:'#a78bfa',
      features:['Full Root Access','Dedicated RAM & CPU','NVMe SSD Storage','DDoS Protection'] },
    { icon:'🖥️', label:'Dedicated Servers', href:'/dedicated', price:'From $89/mo',
      desc:'Bare metal power and complete isolation for enterprise workloads.',
      gradient:'linear-gradient(135deg, rgba(0,184,148,.15), rgba(52,211,153,.08))',
      accent:'#34d399',
      features:['Exclusive Hardware','Enterprise SSD RAID','Full Hardware Control','Managed Options'] },
  ];

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="mb-16">
            <div className="eyebrow mb-4">Hosting Solutions</div>
            <h2 className="font-black text-white mb-4" style={{ fontSize: 'clamp(36px,5vw,56px)', letterSpacing: '-0.03em' }}>
              Choose Your Infrastructure
            </h2>
            <p className="text-lg max-w-lg" style={{ color: 'rgba(255,255,255,.4)' }}>
              Scalable hosting from personal blogs to enterprise applications — all built on premium African infrastructure.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5">
          {plans.map((p, i) => (
            <Reveal key={p.label} delay={i * 80}>
              <Link to={p.href} className="group block h-full">
                <div className="glass-card h-full p-8 relative overflow-hidden" style={{ background: p.gradient }}>
                  {/* Top accent line */}
                  <div className="absolute top-0 left-6 right-6 h-px" style={{ background: `linear-gradient(90deg, transparent, ${p.accent}60, transparent)` }} />

                  <div className="text-3xl mb-6">{p.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{p.label}</h3>
                  <p className="text-sm mb-5 leading-relaxed" style={{ color: 'rgba(255,255,255,.45)' }}>{p.desc}</p>
                  <div className="text-base font-bold mb-7" style={{ color: p.accent }}>{p.price}</div>

                  <ul className="space-y-2.5 mb-8">
                    {p.features.map(f => (
                      <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,.55)' }}>
                        <span className="text-xs" style={{ color: p.accent }}>✦</span>{f}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-1 text-sm font-semibold transition-all duration-200 group-hover:gap-2" style={{ color: p.accent }}>
                    Explore plans <span>→</span>
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

// ── Features (Cinematic bento) ────────────────────────────────────────────────
function Features() {
  return (
    <section className="py-32 px-6" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(37,99,235,.06) 0%, transparent 70%), #03030a' }}>
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <div className="eyebrow mb-4 justify-center">Why JabaliCloud</div>
            <h2 className="font-black text-white" style={{ fontSize: 'clamp(36px,5vw,56px)', letterSpacing: '-0.03em' }}>
              Built Different. Built Better.
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {/* Large hero feature */}
          <Reveal className="md:col-span-3" delay={0}>
            <div className="glass-card h-full p-10 relative overflow-hidden" style={{ minHeight: 320, background: 'linear-gradient(135deg, rgba(37,99,235,.2) 0%, rgba(0,184,148,.12) 100%)' }}>
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full" style={{ background: 'radial-gradient(circle, rgba(37,99,235,.3) 0%, transparent 70%)', filter: 'blur(30px)' }} />
              <div className="relative">
                <div className="text-5xl mb-6">⚡</div>
                <h3 className="text-2xl font-black text-white mb-3" style={{ letterSpacing: '-0.02em' }}>LiteSpeed Powered</h3>
                <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,.5)' }}>
                  Up to 6× faster than Apache. Sub-second load times for your visitors, anywhere on the continent.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs" style={{ color: 'rgba(255,255,255,.4)' }}>
                    <span>Page load speed</span><span>0.4s avg</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,.08)' }}>
                    <div className="h-full rounded-full" style={{ width: '92%', background: 'linear-gradient(90deg, #2563eb, #00b894)' }} />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Stack right */}
          <Reveal className="md:col-span-3 grid grid-rows-2 gap-4" delay={80}>
            <div className="glass-card p-8">
              <div className="text-2xl mb-4">🔒</div>
              <h3 className="text-lg font-bold text-white mb-2">Free SSL & Security</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,.4)' }}>Let's Encrypt SSL, daily malware scanning, and DDoS protection included on every plan.</p>
            </div>
            <div className="glass-card p-8">
              <div className="text-2xl mb-4">💬</div>
              <h3 className="text-lg font-bold text-white mb-2">24/7 Human Support</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,.4)' }}>Real people, not bots. Average response time under 2 minutes via live chat, ticket, or phone.</p>
            </div>
          </Reveal>

          {/* Bottom row */}
          <Reveal className="md:col-span-2" delay={160}>
            <div className="glass-card p-8 h-full">
              <div className="text-2xl mb-4">🔧</div>
              <h3 className="text-lg font-bold text-white mb-2">cPanel Included</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,.4)' }}>Industry-standard control panel with one-click installs for WordPress and 400+ apps.</p>
            </div>
          </Reveal>

          <Reveal className="md:col-span-2" delay={200}>
            <div className="glass-card p-8 h-full">
              <div className="text-2xl mb-4">💾</div>
              <h3 className="text-lg font-bold text-white mb-2">Daily Backups</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,.4)' }}>Automated daily backups retained for 30 days. One-click restore anytime from your dashboard.</p>
            </div>
          </Reveal>

          <Reveal className="md:col-span-2" delay={240}>
            <div className="glass-card p-8 h-full" style={{ background: 'linear-gradient(135deg, rgba(0,184,148,.12), rgba(0,184,148,.05))' }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-400 breathe" />
                <span className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,.4)', letterSpacing: '.1em' }}>LIVE</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">🌍 African Data Centres</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,.4)' }}>South African primary servers. Edge nodes in Nairobi, Lagos, and Cairo for continental coverage.</p>
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
    { name:'Starter', monthly:2.99, annual:1.99,
      features:['1 Website','10 GB NVMe SSD','100 GB Bandwidth','5 Email Accounts','Free SSL Certificate','cPanel Access'] },
    { name:'Business', monthly:5.99, annual:3.99, popular:true,
      features:['Unlimited Websites','50 GB NVMe SSD','Unlimited Bandwidth','Unlimited Email Accounts','Free SSL Certificate','Daily Backups','Priority Support','Free Domain (1yr)'] },
    { name:'Enterprise', monthly:9.99, annual:6.99,
      features:['Unlimited Websites','100 GB NVMe SSD','Unlimited Bandwidth','Unlimited Email Accounts','Free SSL Certificate','Daily Backups','Dedicated IP Address','24/7 Phone Support'] },
  ];

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <div className="eyebrow mb-4 justify-center">Shared Hosting</div>
            <h2 className="font-black text-white mb-4" style={{ fontSize: 'clamp(36px,5vw,56px)', letterSpacing: '-0.03em' }}>
              Honest Pricing.<br />No Surprises.
            </h2>
            <p className="text-lg mb-10" style={{ color: 'rgba(255,255,255,.4)' }}>Cancel anytime. 30-day money-back guarantee.</p>
            <div className="inline-flex items-center rounded-full p-1" style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.08)' }}>
              <button onClick={() => setAnnual(false)}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                style={{ background: !annual ? 'rgba(255,255,255,.1)' : 'transparent', color: !annual ? '#fff' : 'rgba(255,255,255,.4)' }}>
                Monthly
              </button>
              <button onClick={() => setAnnual(true)}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                style={{ background: annual ? 'rgba(255,255,255,.1)' : 'transparent', color: annual ? '#fff' : 'rgba(255,255,255,.4)' }}>
                Annual <span className="text-emerald-400 text-xs font-bold ml-1">−33%</span>
              </button>
            </div>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <div className="relative h-full" style={{ borderRadius: 20 }}>
                {p.popular && (
                  <div className="absolute -top-px left-0 right-0 h-px rounded-t-[20px]"
                    style={{ background: 'linear-gradient(90deg, transparent, #2563eb, #00b894, transparent)' }} />
                )}
                <div className="glass-card h-full p-8 flex flex-col"
                  style={p.popular ? { background: 'rgba(37,99,235,.08)', borderColor: 'rgba(37,99,235,.25)' } : {}}>
                  {p.popular && (
                    <div className="inline-flex self-start mb-4 px-3 py-1 rounded-full text-xs font-bold"
                      style={{ background: 'linear-gradient(135deg,#2563eb,#00b894)', color: '#fff' }}>
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-white mb-4">{p.name}</h3>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-5xl font-black text-white" style={{ letterSpacing: '-0.04em' }}>${annual ? p.annual : p.monthly}</span>
                    <span className="text-sm" style={{ color: 'rgba(255,255,255,.3)' }}>/mo</span>
                  </div>
                  <ul className="space-y-3 flex-1 mb-8">
                    {p.features.map(f => (
                      <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,.5)' }}>
                        <span className="text-emerald-400 text-xs flex-shrink-0">✓</span>{f}
                      </li>
                    ))}
                  </ul>
                  <a href="https://my.jabalicloud.com"
                    className={p.popular ? 'btn-cta w-full justify-center text-sm' : 'btn-ghost w-full justify-center text-sm'}>
                    Get Started
                  </a>
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
  const [q, setQ]     = useState('');
  const [res, setRes] = useState([]);
  const [busy, setBusy] = useState(false);
  const TLDS = ['.com','.net','.org','.co.za','.africa','.io','.store','.online'];
  const P = {'.com':'$12.99','.net':'$10.99','.org':'$9.99','.co.za':'$6.99','.africa':'$14.99','.io':'$39.99','.store':'$5.99','.online':'$3.99'};

  function search() {
    if (!q.trim()) return;
    setBusy(true);
    setTimeout(() => {
      const b = q.replace(/\..+$/,'').toLowerCase();
      setRes(TLDS.map(t => ({ name: b+t, price: P[t], ok: Math.random()>.3 })));
      setBusy(false);
    }, 700);
  }

  return (
    <section className="py-32 px-6 relative overflow-hidden" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(37,99,235,.12) 0%, transparent 70%), #030308' }}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="relative max-w-4xl mx-auto text-center">
        <Reveal>
          <div className="eyebrow mb-6 justify-center">Domain Registration</div>
          <h2 className="font-black text-white mb-4" style={{ fontSize: 'clamp(36px,5vw,56px)', letterSpacing: '-0.03em' }}>
            Claim Your Domain Today
          </h2>
          <p className="text-lg mb-12" style={{ color: 'rgba(255,255,255,.4)' }}>
            Search from millions of domains. Competitive pricing, instant activation, free DNS management.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="flex gap-3 max-w-2xl mx-auto mb-8">
            <div className="flex-1 flex items-center rounded-2xl px-5" style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)' }}>
              <input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')search();}}
                placeholder="yourbusiness.com"
                className="flex-1 py-4 text-sm font-medium outline-none"
                style={{ background: 'transparent', color: '#fff' }} />
            </div>
            <button onClick={search} disabled={busy} className="btn-cta text-sm px-8 py-4 flex-shrink-0">
              {busy ? '...' : 'Search'}
            </button>
          </div>
        </Reveal>

        {res.length > 0 && (
          <Reveal>
            <div className="glass-card overflow-hidden text-left max-w-2xl mx-auto mb-10">
              {res.slice(0,6).map((r, i) => (
                <div key={r.name} className="flex items-center justify-between px-5 py-3.5 transition-colors"
                  style={{ borderBottom: i < 5 ? '1px solid rgba(255,255,255,.04)' : 'none', background: 'transparent' }}
                  onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,.03)'}
                  onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  <div className="flex items-center gap-3">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${r.ok?'bg-emerald-400':'bg-red-400'}`} />
                    <span className="text-sm font-semibold text-white">{r.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${r.ok?'bg-emerald-400/10 text-emerald-400':'bg-red-400/10 text-red-400'}`}>
                      {r.ok?'Available':'Taken'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,.5)' }}>{r.price}/yr</span>
                    {r.ok && <a href="https://my.jabalicloud.com" className="btn-cta text-xs px-3 py-1.5">Add</a>}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        <Reveal delay={200}>
          <div className="flex flex-wrap justify-center gap-2.5">
            {TLDS.map(t => (
              <div key={t} className="px-4 py-2 rounded-xl text-sm" style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)' }}>
                <span className="font-bold text-white">{t}</span>
                <span className="ml-2 text-xs" style={{ color: 'rgba(255,255,255,.35)' }}>{P[t]}/yr</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────
function Testimonials() {
  const items = [
    { name:'Sipho Dlamini',    role:'E-commerce Owner · Johannesburg', text:'Switched to JabaliCloud and my site load time dropped by 60%. Their support team picks up the phone — no bots.' },
    { name:'Amara Osei',       role:'Web Developer · Accra', text:'I host 40+ client sites here. Rock-solid uptime, clean cPanel, and best African hosting pricing I\'ve found anywhere.' },
    { name:'Fatima Al-Hassan', role:'Blogger · Nairobi', text:'One-click WordPress install and free migration made everything seamless. I was live in under an hour with zero technical knowledge.' },
    { name:'David Eze',        role:'Startup Founder · Lagos', text:'The best infrastructure decision I\'ve made. Professional grade hosting at a price that actually makes sense for our market.' },
  ];

  return (
    <section className="py-32 px-6" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(0,184,148,.06) 0%, transparent 60%), #030308' }}>
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
            <div>
              <div className="eyebrow mb-4">Customer Stories</div>
              <h2 className="font-black text-white" style={{ fontSize: 'clamp(32px,4vw,48px)', letterSpacing: '-0.03em' }}>
                Trusted Across Africa
              </h2>
            </div>
            <div className="flex items-center gap-1.5">
              {[1,2,3,4,5].map(i => <span key={i} className="text-amber-400 text-lg">★</span>)}
              <span className="ml-2 text-sm font-semibold" style={{ color: 'rgba(255,255,255,.4)' }}>4.9 out of 5</span>
            </div>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((t, i) => (
            <Reveal key={t.name} delay={i * 60}>
              <div className="glass-card p-7 h-full flex flex-col">
                <div className="flex gap-0.5 mb-5">
                  {[1,2,3,4,5].map(j => <span key={j} className="text-amber-400 text-sm">★</span>)}
                </div>
                <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: 'rgba(255,255,255,.5)' }}>
                  "{t.text}"
                </p>
                <div>
                  <div className="text-sm font-bold text-white">{t.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,.3)' }}>{t.role}</div>
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
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden p-16 text-center"
            style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0d2040 40%, #0a1e30 100%)' }}>
            {/* Gradient top edge */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #2563eb, #00b894, transparent)' }} />
            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(37,99,235,.2) 0%, transparent 70%)', filter: 'blur(40px)' }} />

            <div className="relative">
              <div className="eyebrow mb-6 justify-center" style={{ color: 'rgba(0,184,148,.7)' }}>Start Today</div>
              <h2 className="font-black text-white mb-5" style={{ fontSize: 'clamp(36px,5vw,64px)', letterSpacing: '-0.04em', lineHeight: '0.95' }}>
                Launch Your Website<br />
                <span className="grad">in Minutes.</span>
              </h2>
              <p className="text-lg max-w-lg mx-auto mb-12" style={{ color: 'rgba(255,255,255,.4)' }}>
                Join 10,000+ African businesses on JabaliCloud. Plans from $1.99/month. 30-day money-back guarantee.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://my.jabalicloud.com" className="btn-cta text-base px-10 py-4">
                  Get Started — $1.99/mo →
                </a>
                <Link to="/shared-hosting" className="btn-ghost text-base px-10 py-4">
                  Compare All Plans
                </Link>
              </div>
              <p className="text-xs mt-6" style={{ color: 'rgba(255,255,255,.25)' }}>
                No contracts · Cancel anytime · 30-day money-back guarantee
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <LogoStrip />
      <HostingPlans />
      <Features />
      <Pricing />
      <DomainSearch />
      <Testimonials />
      <CTA />
    </>
  );
}
