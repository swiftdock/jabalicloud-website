import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// ── Reusable Section Reveal ───────────────────────────────────────────────────
function Reveal({ children, delay = 0 }) {
  const ref = useRef();
  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className="section-reveal" style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const [domain, setDomain] = useState('');
  const navigate = (path) => window.location.href = path;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background orbs */}
      <div className="orb w-[600px] h-[600px] bg-violet-600/20 top-[-200px] left-[-200px]" />
      <div className="orb w-[400px] h-[400px] bg-emerald-600/15 bottom-[-100px] right-[-100px]" />
      <div className="orb w-[300px] h-[300px] bg-blue-600/10 top-[30%] right-[20%]" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.3) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="relative max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 text-sm text-violet-300 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Trusted by 10,000+ websites across Africa
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight mb-6">
            Web Hosting{' '}
            <span className="grad">Built for Africa</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Blazing-fast servers, 99.9% uptime, and 24/7 human support. Launch your website today with Africa's most reliable hosting provider.
          </p>

          {/* Domain search */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-12">
            <input
              value={domain}
              onChange={e => setDomain(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && navigate(`/domains?q=${domain}`)}
              placeholder="Enter your domain name..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-400 outline-none focus:border-violet-500 transition-colors text-sm"
            />
            <Link to={`/domains?q=${domain}`} className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-violet-900/40 whitespace-nowrap">
              Search Domain →
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            {[
              { icon: '🛡️', text: 'Free SSL' },
              { icon: '⚡', text: '99.9% Uptime' },
              { icon: '🔄', text: 'Free Migration' },
              { icon: '💬', text: '24/7 Support' },
              { icon: '↩️', text: '30-Day Money Back' },
            ].map(b => (
              <div key={b.text} className="flex items-center gap-1.5">
                <span>{b.icon}</span>
                <span>{b.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Floating server card */}
        <div className="mt-20 relative max-w-3xl mx-auto">
          <div className="glass rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-xs text-gray-400">jabalicloud.com — cPanel Dashboard</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label:'CPU Usage', val:'12%', color:'bg-emerald-500' },
                { label:'RAM',       val:'2.4 GB', color:'bg-violet-500' },
                { label:'Bandwidth', val:'150 GB',  color:'bg-blue-500' },
              ].map(m => (
                <div key={m.label} className="bg-white/3 rounded-xl p-4">
                  <div className="text-xs text-gray-400 mb-1">{m.label}</div>
                  <div className="text-lg font-bold text-white">{m.val}</div>
                  <div className={`mt-2 h-1.5 rounded-full ${m.color} opacity-70`} style={{ width: '60%' }} />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -top-4 -right-4 glass rounded-xl px-4 py-2 border border-emerald-500/20 text-xs text-emerald-400 animate-float">
            ✓ Server Online — 99.9% Uptime
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Hosting Categories ────────────────────────────────────────────────────────
function HostingCategories() {
  const plans = [
    { icon: '🌐', title: 'Shared Hosting', desc: 'Perfect for blogs, portfolios and small business websites. Affordable, fast and reliable.', href: '/shared-hosting', from: '#7c3aed', to: '#8b5cf6', price: 'From $2.99/mo', features: ['Free SSL', 'cPanel Access', 'Email Accounts', '99.9% Uptime'] },
    { icon: '⚡', title: 'VPS Hosting', desc: 'Scalable resources for growing websites and apps. Full root access and guaranteed performance.', href: '/vps', from: '#0891b2', to: '#0ea5e9', price: 'From $12.99/mo', features: ['Full Root Access', 'Dedicated RAM', 'SSD Storage', '24/7 Support'] },
    { icon: '🖥️', title: 'Dedicated Servers', desc: 'Maximum power, security and control for enterprise applications and high-traffic sites.', href: '/dedicated', from: '#059669', to: '#10b981', price: 'From $89.99/mo', features: ['Full Hardware Control', 'Enterprise SSDs', 'DDoS Protection', 'Managed Options'] },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-violet-400 uppercase tracking-wider">Hosting Solutions</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-4">Choose Your Perfect Plan</h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">From personal blogs to enterprise applications — we have the right hosting solution for you.</p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <Link to={p.href} className="group block">
                <div className="glass glass-hover rounded-2xl p-8 h-full relative overflow-hidden transition-transform duration-300 group-hover:-translate-y-2">
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: `linear-gradient(90deg,${p.from},${p.to})` }} />
                  <div className="text-4xl mb-4">{p.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">{p.desc}</p>
                  <div className="text-lg font-bold mb-6" style={{ color: p.to }}>{p.price}</div>
                  <ul className="space-y-2 mb-6">
                    {p.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                        <span className="text-emerald-400">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-1 text-sm font-semibold" style={{ color: p.to }}>
                    View Plans <span className="transition-transform group-hover:translate-x-1">→</span>
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

// ── Features ──────────────────────────────────────────────────────────────────
function Features() {
  const features = [
    { icon: '⚡', title: 'LiteSpeed Servers', desc: 'Up to 6x faster than Apache. Your site loads in milliseconds, keeping visitors engaged.' },
    { icon: '🔒', title: 'Free SSL & Security', desc: 'Every plan includes Let\'s Encrypt SSL, DDoS protection, and daily malware scanning.' },
    { icon: '💬', title: '24/7 Expert Support', desc: 'Real humans available around the clock via live chat, ticket, and phone.' },
    { icon: '🔧', title: 'cPanel Control Panel', desc: 'Industry-standard control panel. Manage files, emails, databases with ease.' },
    { icon: '📦', title: 'Free Migration', desc: 'Moving from another host? We\'ll migrate your site for free with zero downtime.' },
    { icon: '💾', title: 'Daily Backups', desc: 'Automatic daily backups kept for 30 days. Restore with a single click.' },
    { icon: '🌍', title: 'African Data Centres', desc: 'Servers located in South Africa for low-latency access across the continent.' },
    { icon: '📊', title: 'One-Click Installs', desc: 'Install WordPress, Joomla, Drupal and 400+ apps in seconds with Softaculous.' },
  ];

  return (
    <section className="py-24 px-6 bg-[#060912]">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">Why JabaliCloud</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-4">Everything You Need to Succeed</h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">Enterprise-grade features at prices built for growing businesses.</p>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 50}>
              <div className="glass glass-hover rounded-xl p-6 h-full">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Pricing Preview ───────────────────────────────────────────────────────────
function PricingPreview() {
  const [annual, setAnnual] = useState(true);

  const plans = [
    { name: 'Starter', monthly: 2.99, annual: 1.99, highlight: false, features: ['1 Website', '10 GB SSD Storage', '100 GB Bandwidth', '5 Email Accounts', 'Free SSL', 'cPanel'] },
    { name: 'Business', monthly: 5.99, annual: 3.99, highlight: true, features: ['Unlimited Websites', '50 GB SSD Storage', 'Unlimited Bandwidth', 'Unlimited Email', 'Free SSL', 'Daily Backups', 'Priority Support'] },
    { name: 'Enterprise', monthly: 9.99, annual: 6.99, highlight: false, features: ['Unlimited Websites', '100 GB SSD Storage', 'Unlimited Bandwidth', 'Unlimited Email', 'Free SSL', 'Daily Backups', 'Dedicated IP', '24/7 Phone Support'] },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-violet-400 uppercase tracking-wider">Shared Hosting Plans</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-400 text-lg mb-8">No hidden fees. Cancel anytime.</p>
            {/* Toggle */}
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full p-1">
              <button onClick={() => setAnnual(false)} className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${!annual ? 'bg-white text-gray-900' : 'text-gray-400'}`}>Monthly</button>
              <button onClick={() => setAnnual(true)}  className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${annual  ? 'bg-white text-gray-900' : 'text-gray-400'}`}>
                Annual <span className="ml-1 text-xs text-emerald-500 font-bold">-33%</span>
              </button>
            </div>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 100}>
              <div className={`glass rounded-2xl p-8 relative flex flex-col h-full ${p.highlight ? 'border-violet-500/50 ring-2 ring-violet-500/30' : 'border-white/10'}`}>
                {p.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-xs font-bold px-4 py-1 rounded-full">Most Popular</div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-1">{p.name}</h3>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-black text-white">${annual ? p.annual : p.monthly}</span>
                    <span className="text-gray-400 mb-1">/mo</span>
                  </div>
                  {annual && <div className="text-xs text-emerald-400 mt-1">Billed annually</div>}
                </div>
                <ul className="space-y-2.5 flex-1 mb-8">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="text-emerald-400 flex-shrink-0">✓</span>{f}
                    </li>
                  ))}
                </ul>
                <a href="https://my.jabalicloud.com"
                  className={`w-full text-center py-3 rounded-xl text-sm font-semibold transition-all ${p.highlight ? 'bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-900/30' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}`}>
                  Get Started →
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div className="text-center mt-8">
            <Link to="/shared-hosting" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
              View all plans including VPS & Dedicated →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Domain Search ─────────────────────────────────────────────────────────────
function DomainSection() {
  const [query, setQuery]       = useState('');
  const [results, setResults]   = useState([]);
  const [searching, setSearching] = useState(false);

  const TLDS = ['.com', '.net', '.org', '.co.za', '.africa', '.io', '.store', '.online'];
  const PRICES = { '.com':'$12.99', '.net':'$10.99', '.org':'$9.99', '.co.za':'$6.99', '.africa':'$14.99', '.io':'$39.99', '.store':'$5.99', '.online':'$3.99' };

  function search() {
    if (!query.trim()) return;
    setSearching(true);
    setTimeout(() => {
      const base = query.replace(/\..+$/, '').toLowerCase();
      setResults(TLDS.map(tld => ({
        name: base + tld,
        price: PRICES[tld],
        available: Math.random() > 0.3,
      })));
      setSearching(false);
    }, 800);
  }

  return (
    <section className="py-24 px-6 bg-[#060912]">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">Domain Registration</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-4">Find Your Perfect Domain</h2>
            <p className="text-gray-400 text-lg">Search millions of domain names and claim yours today.</p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="flex gap-3 mb-8">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && search()}
              placeholder="yourbusiness.com"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 outline-none focus:border-violet-500 transition-colors text-lg"
            />
            <button onClick={search} disabled={searching}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-emerald-900/30 disabled:opacity-50">
              {searching ? 'Searching...' : 'Search'}
            </button>
          </div>
        </Reveal>

        {results.length > 0 && (
          <div className="space-y-2">
            {results.map(r => (
              <div key={r.name} className="glass rounded-xl px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${r.available ? 'bg-emerald-400' : 'bg-red-400'}`} />
                  <span className="font-medium text-white">{r.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${r.available ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                    {r.available ? 'Available' : 'Taken'}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-300 font-semibold">{r.price}/yr</span>
                  {r.available && (
                    <a href="https://my.jabalicloud.com" className="bg-violet-600 hover:bg-violet-500 text-white text-xs px-4 py-1.5 rounded-lg font-semibold transition-all">
                      Add →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <Reveal delay={200}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {TLDS.map(tld => (
              <div key={tld} className="glass rounded-lg px-4 py-2 text-sm">
                <span className="text-white font-medium">{tld}</span>
                <span className="text-gray-400 ml-2">{PRICES[tld]}/yr</span>
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
  const testimonials = [
    { name:'Sipho Dlamini', role:'E-commerce Owner, Johannesburg', text:'Switched to JabaliCloud 2 years ago and my site load time dropped by 60%. Their support team actually picks up the phone!', rating:5 },
    { name:'Amara Osei', role:'Web Developer, Accra', text:'I host 40+ client sites here. The cPanel interface is clean, uptime is rock solid, and prices are the best I\'ve found for African hosting.', rating:5 },
    { name:'Fatima Al-Hassan', role:'Blogger, Nairobi', text:'As someone non-technical, the one-click WordPress install and free migration made everything seamless. Highly recommend!', rating:5 },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-violet-400 uppercase tracking-wider">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-4">Loved by Thousands</h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <div className="glass glass-hover rounded-2xl p-7 h-full">
                <div className="flex gap-0.5 mb-4">
                  {Array(t.rating).fill(0).map((_, j) => <span key={j} className="text-yellow-400">★</span>)}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Tech Partners ─────────────────────────────────────────────────────────────
function Partners() {
  const partners = ['CloudLinux', 'LiteSpeed', "Let's Encrypt", 'cPanel', 'Softaculous', 'Cloudflare'];
  return (
    <section className="py-16 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-xs text-gray-500 uppercase tracking-widest mb-8">Powered by industry-leading technology</p>
        <div className="flex flex-wrap justify-center gap-8 items-center">
          {partners.map(p => (
            <div key={p} className="text-gray-500 hover:text-gray-300 transition-colors font-semibold text-sm">{p}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA Banner ────────────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-900/80 to-blue-900/80 border border-violet-500/20 p-12 text-center">
            <div className="orb w-72 h-72 bg-violet-600/20 top-[-80px] right-[-80px]" />
            <div className="orb w-48 h-48 bg-emerald-600/15 bottom-[-40px] left-[-40px]" />
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Start Your Journey Today</h2>
              <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">Join 10,000+ websites already running on JabaliCloud. Get started in minutes with our easy setup wizard.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://my.jabalicloud.com" className="bg-white text-gray-900 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all shadow-xl">
                  Get Started — $1.99/mo →
                </a>
                <Link to="/shared-hosting" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-all border border-white/10">
                  View All Plans
                </Link>
              </div>
              <p className="text-gray-400 text-sm mt-4">30-day money-back guarantee. No questions asked.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Home ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Hero />
      <Partners />
      <HostingCategories />
      <Features />
      <PricingPreview />
      <DomainSection />
      <Testimonials />
      <CTABanner />
    </>
  );
}
