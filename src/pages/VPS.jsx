import { useState } from 'react';

const PLANS = [
  { name:'VPS 1', cpu:'2 vCPU', ram:'2 GB RAM', ssd:'40 GB SSD', bw:'2 TB', monthly:12.99, annual:9.99 },
  { name:'VPS 2', cpu:'4 vCPU', ram:'4 GB RAM', ssd:'80 GB SSD', bw:'4 TB', monthly:24.99, annual:18.99, popular:true },
  { name:'VPS 3', cpu:'6 vCPU', ram:'8 GB RAM', ssd:'160 GB SSD', bw:'8 TB', monthly:44.99, annual:34.99 },
  { name:'VPS 4', cpu:'8 vCPU', ram:'16 GB RAM', ssd:'320 GB SSD', bw:'16 TB', monthly:79.99, annual:59.99 },
];

export default function VPS() {
  const [annual, setAnnual] = useState(true);

  return (
    <div className="pt-16">
      <section className="relative py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent" />
        <div className="relative max-w-3xl mx-auto">
          <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">VPS Hosting</span>
          <h1 className="text-5xl md:text-6xl font-black text-white mt-3 mb-4">Power Without <span style={{ background:'linear-gradient(135deg,#3b82f6,#0ea5e9)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Limits</span></h1>
          <p className="text-gray-300 text-lg mb-8">Dedicated resources, full root access, and guaranteed performance. Scale as you grow.</p>
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full p-1">
            <button onClick={() => setAnnual(false)} className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${!annual?'bg-white text-gray-900':'text-gray-400'}`}>Monthly</button>
            <button onClick={() => setAnnual(true)}  className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${annual?'bg-white text-gray-900':'text-gray-400'}`}>Annual <span className="text-emerald-500 font-bold ml-1">-23%</span></button>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PLANS.map(p => (
            <div key={p.name} className={`glass rounded-2xl p-6 flex flex-col relative ${p.popular?'ring-2 ring-blue-500/40':''}`}>
              {p.popular && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">Best Value</div>}
              <h3 className="text-lg font-bold text-white mb-4">{p.name}</h3>
              <div className="space-y-2 flex-1 mb-6">
                {[['⚡',p.cpu],['💾',p.ram],['💿',p.ssd],['🌐',p.bw+' Bandwidth']].map(([icon,val]) => (
                  <div key={val} className="flex items-center gap-2 text-sm text-gray-300">
                    <span>{icon}</span>{val}
                  </div>
                ))}
              </div>
              <div className="flex items-end gap-1 mb-4">
                <span className="text-3xl font-black text-white">${annual?p.annual:p.monthly}</span>
                <span className="text-gray-400 mb-1">/mo</span>
              </div>
              <a href="https://my.jabalicloud.com" className={`w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all text-white ${p.popular?'bg-blue-600 hover:bg-blue-500':'bg-white/8 hover:bg-white/12'}`}>
                Order Now →
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 bg-[#060912]">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {[
            { icon:'🔒', title:'Full Root Access', desc:'Complete control over your server environment. Install any software, configure services, and manage everything via SSH.' },
            { icon:'⚡', title:'SSD NVMe Storage', desc:'Lightning-fast NVMe SSD storage ensures your applications load instantly and databases respond in milliseconds.' },
            { icon:'🛡️', title:'DDoS Protection', desc:'Enterprise-grade DDoS protection included with every VPS plan at no additional cost.' },
            { icon:'📊', title:'Resource Monitoring', desc:'Real-time CPU, RAM, and bandwidth monitoring available in your client portal 24/7.' },
          ].map(f => (
            <div key={f.title} className="glass rounded-xl p-6 flex gap-4">
              <span className="text-3xl">{f.icon}</span>
              <div>
                <h3 className="font-bold text-white mb-1">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
