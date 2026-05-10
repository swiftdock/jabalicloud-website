import { useState } from 'react';

const TLDS = [
  { ext:'.com',    price:'$12.99', renew:'$14.99', popular:true  },
  { ext:'.net',    price:'$10.99', renew:'$12.99', popular:true  },
  { ext:'.org',    price:'$9.99',  renew:'$11.99', popular:false },
  { ext:'.co.za',  price:'$6.99',  renew:'$8.99',  popular:true  },
  { ext:'.africa', price:'$14.99', renew:'$16.99', popular:false },
  { ext:'.io',     price:'$39.99', renew:'$44.99', popular:false },
  { ext:'.store',  price:'$5.99',  renew:'$19.99', popular:false },
  { ext:'.online', price:'$3.99',  renew:'$24.99', popular:false },
  { ext:'.shop',   price:'$4.99',  renew:'$22.99', popular:false },
  { ext:'.tech',   price:'$7.99',  renew:'$34.99', popular:false },
  { ext:'.app',    price:'$14.99', renew:'$19.99', popular:false },
  { ext:'.cloud',  price:'$9.99',  renew:'$19.99', popular:false },
];

export default function Domains() {
  const [query, setQuery]       = useState('');
  const [results, setResults]   = useState([]);
  const [searching, setSearching] = useState(false);

  function search() {
    if (!query.trim()) return;
    setSearching(true);
    setTimeout(() => {
      const base = query.replace(/\..+$/, '').toLowerCase();
      setResults(TLDS.map(t => ({ name: base + t.ext, price: t.price, available: Math.random() > 0.35 })));
      setSearching(false);
    }, 900);
  }

  return (
    <div className="pt-16">
      <section className="relative py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-900/15 to-transparent" />
        <div className="relative max-w-2xl mx-auto">
          <span className="text-sm font-semibold text-violet-400 uppercase tracking-wider">Domain Registration</span>
          <h1 className="text-5xl md:text-6xl font-black text-white mt-3 mb-4">Find Your <span className="grad">Perfect Domain</span></h1>
          <p className="text-gray-300 text-lg mb-8">Search millions of domain names and claim your corner of the internet today.</p>
          <div className="flex gap-3">
            <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key==='Enter'&&search()}
              placeholder="yourbusiness.com" className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 outline-none focus:border-violet-500 transition-colors text-lg" />
            <button onClick={search} disabled={searching} className="bg-violet-600 hover:bg-violet-500 text-white px-8 py-4 rounded-xl font-semibold transition-all disabled:opacity-50 whitespace-nowrap">
              {searching ? 'Searching...' : 'Search →'}
            </button>
          </div>
        </div>
      </section>

      {results.length > 0 && (
        <section className="px-6 pb-12">
          <div className="max-w-3xl mx-auto space-y-2">
            {results.map(r => (
              <div key={r.name} className="glass rounded-xl px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${r.available?'bg-emerald-400':'bg-red-400'}`} />
                  <span className="font-medium text-white">{r.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${r.available?'bg-emerald-500/10 text-emerald-400':'bg-red-500/10 text-red-400'}`}>{r.available?'Available':'Taken'}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-300 font-semibold text-sm">{r.price}/yr</span>
                  {r.available && <a href="https://my.jabalicloud.com" className="bg-violet-600 hover:bg-violet-500 text-white text-xs px-4 py-1.5 rounded-lg font-semibold transition-all">Add to Cart</a>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="py-20 px-6 bg-[#060912]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-white text-center mb-10">Popular Domain Extensions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {TLDS.map(t => (
              <div key={t.ext} className="glass glass-hover rounded-xl p-4 text-center">
                <div className="text-lg font-bold text-white mb-1">{t.ext}</div>
                <div className="text-emerald-400 font-semibold text-sm">{t.price}</div>
                <div className="text-xs text-gray-500 mt-0.5">Renew: {t.renew}</div>
                {t.popular && <div className="mt-2 text-xs bg-violet-500/10 text-violet-400 rounded-full px-2 py-0.5">Popular</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
