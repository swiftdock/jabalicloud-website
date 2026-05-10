import { useState } from 'react';
import { Link } from 'react-router-dom';

const PLANS = [
  {
    name: 'Starter', monthly: 2.99, annual: 1.99, color: '#8b5cf6',
    features: ['1 Website','10 GB SSD Storage','100 GB Bandwidth','5 Email Accounts','Free SSL Certificate','Weekly Backups','cPanel Access','99.9% Uptime SLA'],
  },
  {
    name: 'Business', monthly: 5.99, annual: 3.99, color: '#10b981', popular: true,
    features: ['Unlimited Websites','50 GB SSD Storage','Unlimited Bandwidth','Unlimited Email Accounts','Free SSL Certificate','Daily Backups','cPanel Access','Free Domain (1 year)','Priority Support','99.9% Uptime SLA'],
  },
  {
    name: 'Enterprise', monthly: 9.99, annual: 6.99, color: '#3b82f6',
    features: ['Unlimited Websites','100 GB SSD Storage','Unlimited Bandwidth','Unlimited Email Accounts','Free SSL Certificate','Daily Backups','cPanel Access','Free Domain (1 year)','Dedicated IP Address','Malware Scanning','Priority 24/7 Phone Support','99.9% Uptime SLA'],
  },
];

const FAQ = [
  { q:'What is shared hosting?', a:'Shared hosting means your website shares server resources with other customers. It\'s cost-effective and perfect for small to medium-sized websites.' },
  { q:'Can I upgrade my plan later?', a:'Yes! You can upgrade your plan at any time from your client portal. The price difference is prorated automatically.' },
  { q:'Do you offer a money-back guarantee?', a:'We offer a 30-day money-back guarantee on all shared hosting plans. No questions asked.' },
  { q:'Is cPanel included with all plans?', a:'Yes, all shared hosting plans include full cPanel access with one-click installers for WordPress and 400+ other apps.' },
  { q:'How long does setup take?', a:'Your hosting account is activated instantly after payment. You can start uploading files and installing apps immediately.' },
];

export default function SharedHosting() {
  const [annual, setAnnual]   = useState(true);
  const [openFAQ, setOpenFAQ] = useState(null);

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-900/20 to-transparent" />
        <div className="relative max-w-3xl mx-auto">
          <span className="text-sm font-semibold text-violet-400 uppercase tracking-wider">Shared Hosting</span>
          <h1 className="text-5xl md:text-6xl font-black text-white mt-3 mb-4">Fast, Reliable & <span className="grad">Affordable</span></h1>
          <p className="text-gray-300 text-lg mb-8">Launch your website today with cPanel, free SSL, and one-click WordPress installation.</p>
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full p-1">
            <button onClick={() => setAnnual(false)} className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${!annual?'bg-white text-gray-900':'text-gray-400'}`}>Monthly</button>
            <button onClick={() => setAnnual(true)}  className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${annual?'bg-white text-gray-900':'text-gray-400'}`}>Annual <span className="text-emerald-500 font-bold ml-1">-33%</span></button>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {PLANS.map(p => (
            <div key={p.name} className={`glass rounded-2xl p-8 flex flex-col relative ${p.popular?'ring-2 ring-violet-500/40':''}`}>
              {p.popular && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-xs font-bold px-4 py-1 rounded-full">Most Popular</div>}
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: p.color }} />
              <h3 className="text-xl font-bold text-white mb-1">{p.name}</h3>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-black text-white">${annual ? p.annual : p.monthly}</span>
                <span className="text-gray-400 mb-1">/mo</span>
              </div>
              {annual && <div className="text-xs text-emerald-400 mb-6">Billed annually — save 33%</div>}
              <ul className="space-y-2.5 flex-1 mb-8">
                {p.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="text-emerald-400">✓</span>{f}
                  </li>
                ))}
              </ul>
              <a href="https://my.jabalicloud.com"
                className="w-full text-center py-3 rounded-xl text-sm font-semibold transition-all text-white"
                style={{ background: p.popular ? p.color : 'rgba(255,255,255,.08)' }}>
                Get Started →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-[#060912]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-white text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <div key={f.q} className="glass rounded-xl overflow-hidden">
                <button onClick={() => setOpenFAQ(openFAQ===i?null:i)} className="w-full flex items-center justify-between px-6 py-4 text-left">
                  <span className="font-medium text-white text-sm">{f.q}</span>
                  <span className={`text-gray-400 transition-transform ${openFAQ===i?'rotate-180':''}`}>▼</span>
                </button>
                {openFAQ===i && <div className="px-6 pb-4 text-sm text-gray-400 leading-relaxed">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
