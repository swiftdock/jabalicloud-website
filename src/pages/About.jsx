export default function About() {
  const stats = [
    { val:'10,000+', label:'Websites Hosted' },
    { val:'99.9%',  label:'Uptime Guaranteed' },
    { val:'24/7',   label:'Expert Support' },
    { val:'5+',     label:'Years of Excellence' },
  ];

  return (
    <div className="pt-16">
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-900/15 to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="text-sm font-semibold text-violet-400 uppercase tracking-wider">About Us</span>
          <h1 className="text-5xl md:text-6xl font-black text-white mt-3 mb-6">Africa's Hosting <span className="grad">Partner</span></h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
            JabaliCloud was founded with a single mission: to provide African businesses with world-class web hosting at prices that make sense for our market. We believe every business deserves a fast, secure, and reliable online presence.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#060912]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map(s => (
            <div key={s.label} className="glass rounded-xl p-6">
              <div className="text-4xl font-black grad mb-2">{s.val}</div>
              <div className="text-sm text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-black text-white mb-4">Our Mission</h2>
            <p className="text-gray-400 leading-relaxed mb-4">We exist to democratise web hosting across Africa. Too many brilliant ideas never make it online because hosting is too expensive, too complicated, or too unreliable.</p>
            <p className="text-gray-400 leading-relaxed">JabaliCloud changes that. Our infrastructure is built specifically for African connectivity, our support team understands local business needs, and our pricing reflects local economic realities.</p>
          </div>
          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">Why Choose Us</h3>
            {[
              '🌍 African-focused infrastructure',
              '⚡ LiteSpeed powered servers',
              '🔒 Enterprise security included',
              '💬 Local support team',
              '💰 Competitive African pricing',
              '🔄 Free migrations always',
            ].map(item => (
              <div key={item} className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0 text-sm text-gray-300">{item}</div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
