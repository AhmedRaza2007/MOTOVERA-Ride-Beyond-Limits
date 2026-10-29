import { motion } from 'framer-motion'
import { MapPin, Mail, Phone, Clock } from 'lucide-react'
import TestRideForm from '../components/TestRideForm.jsx'
import ContactForm from '../components/ContactForm.jsx'
import FAQ from '../components/FAQ.jsx'

const INFO = [
  { icon: MapPin, title: 'SHOWROOM', text: 'MM Alam Road, Gulberg III, Lahore, Pakistan' },
  { icon: Mail, title: 'EMAIL', text: 'hello@motovera.pk' },
  { icon: Phone, title: 'PHONE', text: '+92 300 123 4567' },
  { icon: Clock, title: 'HOURS', text: 'Mon – Sat, 10 AM – 8 PM' },
]

export default function ContactTestRide() {
  return (
    <div className="pt-28">
      {/* ===== TEST RIDE ===== */}
      <section id="test-ride" className="scroll-mt-24">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="mx-auto max-w-2xl text-center">
            <p className="section-label">Test Ride</p>
            <h1 className="mt-4 font-display text-4xl font-bold md:text-6xl">
              EXPERIENCE IT IN <span className="text-accent">REAL LIFE</span>
            </h1>
            <p className="mt-4 text-silver">
              Book a slot and feel the 998cc of pure performance yourself. All fields marked * are required.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-12 max-w-4xl">
            <TestRideForm />
          </motion.div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="scroll-mt-24 border-t border-white/10 bg-graphite/40 py-28">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="section-label">Contact</p>
              <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">GET IN TOUCH</h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-silver">
                Questions about specs, pricing or availability? Send us a message and our team will respond within 24 hours.
              </p>
              <div className="mt-10 space-y-6">
                {INFO.map((item) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <p className="text-[11px] tracking-[0.3em] text-silver">{item.title}</p>
                      <p className="mt-1 text-sm text-ivory">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="scroll-mt-24 py-28">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
          <p className="section-label text-center">FAQ</p>
          <h2 className="mt-4 text-center font-display text-4xl font-bold md:text-5xl">COMMON QUESTIONS</h2>
          <div className="mt-12">
            <FAQ />
          </div>
        </div>
      </section>
    </div>
  )
}