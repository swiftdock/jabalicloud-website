import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function Reveal({ children, delay = 0 }) {
  const ref = useRef();
  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect(); }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className="section-reveal" style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const [domain, setDomain] = useState('');
  return (
    <section className="relative pt-24 pb-16 overflow-hidden bg-white">
      {/* Gradient mesh blob */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(37,99,235,.12) 0%, rgba(0,184,148,.08) 50%, transparent 70%)' }} />
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full opacity-20 pointer-events-none" style={{ background: 'linear-gradient(135deg,#2563eb,#00b894)', filter: 'blur(60px)', animation: 'blob 8s ease-in-out infinite' }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 text-sm font-medium text-blue-700 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
            🌍 Trusted by 10,000+ websites across Africa
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-none tracking-tight mb-6" style={{ letterSpacing: '-0.03em' }}>
            The Fastest<br />
            Web Hosting<br />
            <span className="grad">in Africa.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mb-10 leading-relaxed">
            Blazing-fast LiteSpeed servers, 99.9% uptime guarantee, and real humans available 24/7. Start your website in minutes.
          </p>

          {/* Domain search */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mb-12">
            <div className="flex-1 flex items-center bg-white border-2 border-slate-200 rounded-2xl px-4 py-1 focus-within:border-blue-400 transition-colors shadow-sm">
              <span className="text-slate-400 text-sm mr-2">🔍</span>
              <input
                value={domain}
                onChange={e => setDomain(e.target.value)}
                onKeyDown={e => { if (e.key==='Enter') window.location.href=`/domains?q=${domain}`; }}
                placeholder="yourbusiness.com"
                className="flex-1 py-3 text-slate-900 placeholder-slate-400 text-sm outline-none bg-transparent font-medium"
              />
            </div>
            <Link to={`/domains?q=${domain}`} className="btn-primary text-sm px-7 py-4 justify-center text-center whitespace-nowrap">
              Search Domain →
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 text-sm text-slate-500">
            {[
              { icon:'🔒', text:'Free SSL' },
              { icon:'⚡', text:'99.9% Uptime' },
              { icon:'🔄', text:'Free Migration' },
              { icon:'💬', text:'24/7 Support' },
              { icon:'↩️', text:'30-Day Guarantee' },
            ].map(b => (
              <div key={b.text} className="flex items-center gap-1.5 font-medium">
                <span>{b.icon}</span><span>{b.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { val: '10K+',   label: 'Websites Hosted' },
            { val: '99.9%',  label: 'Uptime SLA' },
            { val: '24/7',   label: 'Expert Support' },
            { val: '5★',     label: 'Customer Rating' },
          ].map(s => (
            <div key={s.label} className="card p-6 text-center">
              <div className="text-3xl font-black grad">{s.val}</div>
              <div className="text-sm text-slate-500 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Trust logos ───────────────────────────────────────────────────────────────
function TrustLogos() {
  return (
    <section className="py-12 border-y border-slate-100 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">Powered by industry-leading technology</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {['CloudLinux', 'LiteSpeed', "Let's Encrypt", 'cPanel', 'Softaculous', 'Cloudflare'].map(p => (
            <span key={p} className="text-slate-400 hover:text-slate-600 font-semibold text-sm transition-colors cursor-default">{p}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Hosting Categories ────────────────────────────────────────────────────────
function HostingCategories() {
  const plans = [
    {
      icon: '🌐', title: 'Shared Hosting', href: '/shared-hosting',
      price: 'From $1.99/mo', color: '#2563eb', lightColor: '#eff6ff', borderColor: '#bfdbfe',
      desc: 'Perfect for blogs, portfolios and small businesses.',
      features: ['Free SSL & CDN', 'cPanel Control Panel', 'Unlimited Email Accounts', '99.9% Uptime Guarantee'],
    },
    {
      icon: '⚡', title: 'VPS Hosting', href: '/vps',
      price: 'From $9.99/mo', color: '#7c3aed', lightColor: '#f5f3ff', borderColor: '#ddd6fe',
      desc: 'Full root access and guaranteed resources that scale.',
      features: ['Full Root Access', 'Dedicated RAM & CPU', 'NVMe SSD Storage', 'DDoS Protection Included'],
    },
    {
      icon: '🖥️', title: 'Dedicated Servers', href: '/dedicated',
      price: 'From $89/mo', color: '#00b894', lightColor: '#ecfdf5', borderColor: '#a7f3d0',
      desc: 'Enterprise-grade bare metal for maximum performance.',
      features: ['Exclusive Hardware', 'Enterprise SSD RAID', 'Full Server Control', 'Managed Options Available'],
    },
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="mb-14">
            <div className="section-label mb-3">Hosting Solutions</div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4" style={{ letterSpacing: '-0.02em' }}>
              Choose Your Perfect Plan
            </h2>
            <p className="text-slate-500 text-lg max-w-xl">
              From personal blogs to enterprise applications — scalable hosting built for Africa.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <Link to={p.href} className="group block card p-8 h-full">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-5" style={{ background: p.lightColor, border: `1.5px solid ${p.borderColor}` }}>
                  {p.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{p.title}</h3>
                <p className="text-slate-500 text-sm mb-4 leading-relaxed">{p.desc}</p>
                <div className="text-lg font-black mb-6" style={{ color: p.color }}>{p.price}</div>
                <ul className="space-y-2.5 mb-6">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="w-4 h-4 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0" style={{ background: p.color }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <span className="text-sm font-semibold flex items-center gap-1 transition-transform group-hover:translate-x-1" style={{ color: p.color }}>
                  View Plans →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Features (Bento grid) ─────────────────────────────────────────────────────
function Features() {
  return (
    <section className="py-24 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <div className="section-label mb-3">Why JabaliCloud</div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900" style={{ letterSpacing: '-0.02em' }}>
              Everything You Need to Succeed Online
            </h2>
          </div>
        </Reveal>

        {/* Bento grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {/* Large card */}
          <Reveal delay={0}>
            <div className="card p-8 md:row-span-2 flex flex-col h-full" style={{ background: 'linear-gradient(135deg, #2563eb, #00b894)' }}>
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-2xl font-black text-white mb-3">LiteSpeed Powered</h3>
              <p className="text-white/80 leading-relaxed flex-1">
                Our servers run LiteSpeed Web Server — up to 6× faster than Apache. Your visitors get instant page loads on every device, every time.
              </p>
              <div className="mt-8 bg-white/10 rounded-2xl p-4">
                <div className="text-white text-sm font-semibold mb-2">Page Load Speed</div>
                <div className="flex items-end gap-1 h-10">
                  {[40,60,80,100,90,95,100].map((h,i) => (
                    <div key={i} className="flex-1 rounded-sm bg-white/30" style={{ height: `${h}%` }} />
                  ))}
                </div>
                <div className="text-white/60 text-xs mt-2">Avg 0.4s load time</div>
              </div>
            </div>
          </Reveal>

          {/* Medium cards */}
          <Reveal delay={80}>
            <div className="card p-7">
              <div className="w-11 h-11 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center text-xl mb-4">🔒</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Free SSL & Security</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Let's Encrypt SSL on every plan. Daily malware scanning, DDoS protection, and automatic security patches.</p>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="card p-7">
              <div className="w-11 h-11 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-xl mb-4">💬</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">24/7 Human Support</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Real people — not bots — available around the clock via live chat, ticket, and phone. Average response: 2 minutes.</p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="card p-7">
              <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-xl mb-4">🔧</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">cPanel Control Panel</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Industry-standard cPanel on every shared hosting plan. Manage files, databases, email, and 400+ apps in clicks.</p>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="card p-7">
              <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-xl mb-4">📦</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">One-Click Installs</h3>
              <p className="text-slate-500 text-sm leading-relaxed">WordPress, Joomla, Magento and 400+ more apps installed in seconds via Softaculous App Installer.</p>
            </div>
          </Reveal>

          {/* Wide bottom card */}
          <Reveal delay={0}>
            <div className="card p-7 md:col-span-3" style={{ background: '#0f172a' }}>
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">🌍 African Data Centres</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">Primary servers located in South Africa with CDN edge nodes across the continent. Low-latency access for African visitors.</p>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                  {[['JHB','Primary'],['CPT','Edge'],['NRB','Edge'],['LGS','Edge']].map(([city,type]) => (
                    <div key={city} className="text-center">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 mx-auto mb-1 animate-pulse" />
                      <div className="text-xs font-bold text-white">{city}</div>
                      <div className="text-xs text-slate-500">{type}</div>
                    </div>
                  ))}
                </div>
              </div>
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
    { name:'Starter',    monthly:2.99, annual:1.99, features:['1 Website','10 GB SSD','100 GB Bandwidth','5 Email Accounts','Free SSL','cPanel'] },
    { name:'Business',   monthly:5.99, annual:3.99, popular:true, features:['Unlimited Websites','50 GB SSD','Unlimited Bandwidth','Unlimited Email','Free SSL','Daily Backups','Priority Support','Free Domain'] },
    { name:'Enterprise', monthly:9.99, annual:6.99, features:['Unlimited Websites','100 GB SSD','Unlimited Bandwidth','Unlimited Email','Free SSL','Daily Backups','Dedicated IP','Phone Support'] },
  ];
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <div className="section-label mb-3">Shared Hosting Plans</div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4" style={{ letterSpacing: '-0.02em' }}>Simple, Transparent Pricing</h2>
            <p className="text-slate-500 mb-8">No hidden fees. Cancel anytime. 30-day money-back guarantee.</p>
            <div className="inline-flex items-center bg-slate-100 rounded-full p-1">
              <button onClick={() => setAnnual(false)} className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all ${!annual ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>Monthly</button>
              <button onClick={() => setAnnual(true)}  className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all ${annual  ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>
                Annual <span className="ml-1 text-emerald-600 font-bold text-xs">Save 33%</span>
              </button>
            </div>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <div className={`rounded-2xl p-8 flex flex-col h-full relative ${p.popular ? 'text-white' : 'card'}`}
                style={p.popular ? { background: 'linear-gradient(135deg, #2563eb, #00b894)' } : {}}>
                {p.popular && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-4 py-1.5 rounded-full">Most Popular</div>}
                <h3 className={`text-xl font-bold mb-1 ${p.popular ? 'text-white' : 'text-slate-900'}`}>{p.name}</h3>
                <div className="flex items-end gap-1 mb-6">
                  <span className={`text-4xl font-black ${p.popular ? 'text-white' : 'text-slate-900'}`}>${annual ? p.annual : p.monthly}</span>
                  <span className={`mb-1 ${p.popular ? 'text-white/70' : 'text-slate-400'}`}>/mo</span>
                </div>
                <ul className="space-y-2.5 flex-1 mb-8">
                  {p.features.map(f => (
                    <li key={f} className={`flex items-center gap-2 text-sm ${p.popular ? 'text-white/90' : 'text-slate-600'}`}>
                      <span className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-xs ${p.popular ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-600'}`}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="https://my.jabalicloud.com"
                  className={`w-full text-center py-3 rounded-xl text-sm font-semibold transition-all ${p.popular ? 'bg-white text-blue-600 hover:bg-blue-50' : 'btn-primary'}`}>
                  Get Started →
                </a>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={300}>
          <p className="text-center mt-8 text-sm text-slate-500">
            Need VPS or Dedicated?{' '}
            <Link to="/vps" className="text-blue-600 font-semibold hover:underline">View all plans →</Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ── Domain search ─────────────────────────────────────────────────────────────
function DomainSection() {
  const [query, setQuery]   = useState('');
  const [results, setResults] = useState([]);
  const [busy, setBusy]     = useState(false);
  const TLDS = ['.com', '.net', '.org', '.co.za', '.africa', '.io', '.store', '.online'];
  const PRICES = { '.com':'$12.99', '.net':'$10.99', '.org':'$9.99', '.co.za':'$6.99', '.africa':'$14.99', '.io':'$39.99', '.store':'$5.99', '.online':'$3.99' };

  function search() {
    if (!query.trim()) return;
    setBusy(true);
    setTimeout(() => {
      const base = query.replace(/\..+$/, '').toLowerCase();
      setResults(TLDS.map(t => ({ name: base+t, price: PRICES[t], available: Math.random()>.3 })));
      setBusy(false);
    }, 700);
  }

  return (
    <section className="py-24 px-6" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 40%, #00b894 100%)' }}>
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <div className="inline-flex items-center bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium text-white/90 mb-6">
            🔍 Domain Registration
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
            Find Your Perfect Domain
          </h2>
          <p className="text-white/70 text-lg mb-10">Search millions of domains and claim yours today. Competitive prices, instant activation.</p>
        </Reveal>
        <Reveal delay={100}>
          <div className="flex gap-3 max-w-2xl mx-auto mb-8">
            <input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==='Enter'&&search()}
              placeholder="yourbusiness.com"
              className="flex-1 bg-white/15 border border-white/30 backdrop-blur-sm rounded-2xl px-5 py-4 text-white placeholder-white/50 outline-none focus:border-white/60 text-sm font-medium" />
            <button onClick={search} disabled={busy} className="btn-white text-sm px-7 py-4 font-bold flex-shrink-0">
              {busy ? '...' : 'Search'}
            </button>
          </div>
        </Reveal>
        {results.length > 0 && (
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden text-left max-w-2xl mx-auto mb-8">
            {results.slice(0,5).map(r => (
              <div key={r.name} className="flex items-center justify-between px-5 py-3.5 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${r.available?'bg-emerald-500':'bg-red-400'}`} />
                  <span className="font-semibold text-slate-900 text-sm">{r.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${r.available?'bg-emerald-50 text-emerald-700':'bg-red-50 text-red-600'}`}>
                    {r.available?'Available':'Taken'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-600 font-semibold text-sm">{r.price}/yr</span>
                  {r.available && <a href="https://my.jabalicloud.com" className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg font-bold transition-colors">Add</a>}
                </div>
              </div>
            ))}
          </div>
        )}
        <Reveal delay={200}>
          <div className="flex flex-wrap justify-center gap-3">
            {TLDS.map(t => (
              <div key={t} className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-sm">
                <span className="text-white font-bold">{t}</span>
                <span className="text-white/60 ml-1.5">{PRICES[t]}/yr</span>
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
    { name:'Sipho Dlamini',    role:'E-commerce Owner, JHB', rating:5, text:'Switched to JabaliCloud and my site load time dropped by 60%. Their support team actually picks up the phone!' },
    { name:'Amara Osei',       role:'Web Developer, Accra',  rating:5, text:'I host 40+ client sites here. Rock-solid uptime, clean cPanel, and the best pricing for African hosting I\'ve found.' },
    { name:'Fatima Al-Hassan', role:'Blogger, Nairobi',      rating:5, text:'The one-click WordPress install and free migration made everything seamless. I was live in under an hour!' },
    { name:'David Eze',        role:'Startup Founder, Lagos', rating:5, text:'Best decision I made for my startup. Professional hosting at a price that makes sense for African markets.' },
  ];
  return (
    <section className="py-24 px-6 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <div className="section-label mb-3">Customer Stories</div>
              <h2 className="text-4xl font-black text-slate-900" style={{ letterSpacing: '-0.02em' }}>Loved Across Africa</h2>
            </div>
            <div className="flex items-center gap-1">
              {'★★★★★'.split('').map((s,i) => <span key={i} className="text-amber-400 text-xl">{s}</span>)}
              <span className="ml-2 text-slate-500 text-sm font-medium">4.9 / 5</span>
            </div>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((t, i) => (
            <Reveal key={t.name} delay={i * 70}>
              <div className="card p-6 h-full">
                <div className="flex gap-0.5 mb-4">
                  {'★★★★★'.split('').map((s,j) => <span key={j} className="text-amber-400 text-sm">{s}</span>)}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{t.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA Banner ────────────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="rounded-3xl p-12 md:p-16 text-center relative overflow-hidden" style={{ background: '#0f172a' }}>
            {/* Gradient glow */}
            <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(ellipse at 50% 0%, #2563eb 0%, transparent 60%)' }} />
            <div className="relative">
              <div className="section-label mb-4" style={{ color: '#00b894' }}>START TODAY</div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-4" style={{ letterSpacing: '-0.03em' }}>
                Launch Your Website<br />in Minutes
              </h2>
              <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10">
                Join 10,000+ African businesses already running on JabaliCloud. Plans from just $1.99/month.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://my.jabalicloud.com" className="btn-primary text-base px-8 py-4">
                  Get Started — $1.99/mo →
                </a>
                <Link to="/shared-hosting" className="btn-white-outline text-base px-8 py-4">
                  Compare All Plans
                </Link>
              </div>
              <p className="text-slate-500 text-sm mt-5">30-day money-back guarantee · No contracts · Cancel anytime</p>
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
      <TrustLogos />
      <HostingCategories />
      <Features />
      <Pricing />
      <DomainSection />
      <Testimonials />
      <CTABanner />
    </>
  );
}
