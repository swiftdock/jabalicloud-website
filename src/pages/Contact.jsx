import { useState } from 'react';

export default function Contact() {
  const [form, setForm]   = useState({ name:'', email:'', subject:'', message:'' });
  const [sent, setSent]   = useState(false);
  const [busy, setBusy]   = useState(false);

  function handle(e) { setForm(p => ({ ...p, [e.target.name]: e.target.value })); }

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    await new Promise(r => setTimeout(r, 1200));
    setSent(true);
    setBusy(false);
  }

  return (
    <div className="pt-16">
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/15 to-transparent" />
        <div className="relative max-w-2xl mx-auto text-center">
          <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">Contact Us</span>
          <h1 className="text-5xl md:text-6xl font-black text-white mt-3 mb-4">We're Here to <span className="grad">Help</span></h1>
          <p className="text-gray-300 text-lg">Get in touch with our expert support team. We typically respond within 1 hour.</p>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10">
          {/* Contact info */}
          <div className="space-y-4">
            {[
              { icon:'💬', title:'Live Chat', desc:'Available 24/7 for instant support', action:'Start Chat', onClick:()=>window.Tawk_API?.toggle() },
              { icon:'📧', title:'Email', desc:'support@jabalicloud.com', action:'Send Email', href:'mailto:support@jabalicloud.com' },
              { icon:'📞', title:'Phone', desc:'+27 10 000 0000', action:'Call Now', href:'tel:+27100000000' },
              { icon:'🎫', title:'Support Ticket', desc:'Track your issue with a ticket', action:'Open Ticket', href:'https://my.jabalicloud.com' },
            ].map(c => (
              <div key={c.title} className="glass rounded-xl p-5">
                <div className="text-2xl mb-2">{c.icon}</div>
                <div className="font-semibold text-white text-sm mb-1">{c.title}</div>
                <div className="text-xs text-gray-400 mb-3">{c.desc}</div>
                {c.href
                  ? <a href={c.href} className="text-xs text-violet-400 hover:text-violet-300 font-medium">{c.action} →</a>
                  : <button onClick={c.onClick} className="text-xs text-violet-400 hover:text-violet-300 font-medium">{c.action} →</button>
                }
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="md:col-span-2 glass rounded-2xl p-8">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-400 text-sm">We'll get back to you within 1 hour. Check your email for confirmation.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-6">Send us a message</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block">Full Name</label>
                    <input name="name" value={form.name} onChange={handle} required placeholder="John Smith"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-violet-500 transition-colors text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block">Email Address</label>
                    <input name="email" type="email" value={form.email} onChange={handle} required placeholder="john@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-violet-500 transition-colors text-sm" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1.5 block">Subject</label>
                  <select name="subject" value={form.subject} onChange={handle} required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-violet-500 transition-colors text-sm">
                    <option value="" className="bg-gray-900">Select a subject...</option>
                    <option value="sales" className="bg-gray-900">Sales Enquiry</option>
                    <option value="support" className="bg-gray-900">Technical Support</option>
                    <option value="billing" className="bg-gray-900">Billing</option>
                    <option value="other" className="bg-gray-900">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1.5 block">Message</label>
                  <textarea name="message" value={form.message} onChange={handle} required rows={5} placeholder="Tell us how we can help..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-violet-500 transition-colors text-sm resize-none" />
                </div>
                <button type="submit" disabled={busy}
                  className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold py-3.5 rounded-xl transition-all disabled:opacity-60">
                  {busy ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
