export default function Dedicated() {
  const servers = [
    { name:'DS Starter', cpu:'Intel Xeon E3 / 4-core', ram:'16 GB DDR4', ssd:'2× 500 GB SSD', bw:'10 TB', price:89.99 },
    { name:'DS Business', cpu:'Intel Xeon E5 / 8-core', ram:'32 GB DDR4', ssd:'2× 1 TB SSD', bw:'20 TB', price:149.99, popular:true },
    { name:'DS Enterprise', cpu:'Dual Xeon / 16-core', ram:'64 GB DDR4', ssd:'4× 1 TB NVMe', bw:'Unmetered', price:249.99 },
  ];

  return (
    <div className="pt-16">
      <section className="relative py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 to-transparent" />
        <div className="relative max-w-3xl mx-auto">
          <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">Dedicated Servers</span>
          <h1 className="text-5xl md:text-6xl font-black text-white mt-3 mb-4">Uncompromising <span style={{ background:'linear-gradient(135deg,#059669,#10b981)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Performance</span></h1>
          <p className="text-gray-300 text-lg mb-8">An entire server dedicated to your business. Maximum power, security, and control.</p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {servers.map(s => (
            <div key={s.name} className={`glass rounded-2xl p-8 flex flex-col relative ${s.popular?'ring-2 ring-emerald-500/40':''}`}>
              {s.popular && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-bold px-4 py-1 rounded-full">Most Popular</div>}
              <h3 className="text-xl font-bold text-white mb-6">{s.name}</h3>
              <div className="space-y-3 flex-1 mb-8">
                {[['🖥️ CPU', s.cpu],['💾 RAM', s.ram],['💿 Storage', s.ssd],['🌐 Bandwidth', s.bw]].map(([label,val]) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-gray-400">{label}</span>
                    <span className="text-white font-medium">{val}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-3xl font-black text-white">${s.price}</span>
                <span className="text-gray-400 mb-1">/mo</span>
              </div>
              <a href="/contact" className={`w-full text-center py-3 rounded-xl text-sm font-semibold transition-all text-white ${s.popular?'bg-emerald-600 hover:bg-emerald-500':'bg-white/8 hover:bg-white/12'}`}>
                Request Quote →
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 bg-[#060912] text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-4">Need a Custom Configuration?</h2>
          <p className="text-gray-400 mb-8">Our team will build a server tailored to your exact requirements. Enterprise contracts and SLAs available.</p>
          <a href="/contact" className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-8 py-4 rounded-xl transition-all">Contact Sales →</a>
        </div>
      </section>
    </div>
  );
}
