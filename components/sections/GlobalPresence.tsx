"use client";

import { motion } from "framer-motion";
import { Globe2, MapPin, Users, Building2 } from "lucide-react";

const countries = [
  { name: "Bangladesh", city: "Dhaka", stats: "HQ for APAC" },
  { name: "France", city: "Paris", stats: "EU Product Hub" },
  { name: "Austria", city: "Vienna", stats: "Engineering" },
  { name: "United Kingdom", city: "London", stats: "Go-to-Market" },
];

export default function GlobalPresence() {
  return (
    <section id="global" className="relative py-24 bg-black text-white overflow-hidden">
      {/* Background globe and dotted grid feel */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />
        <motion.div
          className="absolute -top-40 right-1/2 translate-x-1/2 w-[900px] h-[900px] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(59,130,246,0.25), rgba(168,85,247,0.1), transparent)",
          }}
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 grid lg:grid-cols-2 gap-8 items-end">
          <div>
            <p className="text-sm tracking-widest text-emerald-400 font-semibold mb-3">
              OUR PRESENCE
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Building on a global scale
            </h2>
            <p className="mt-4 text-gray-300 max-w-2xl">
              We operate across strategic regions to stay close to our community
              and customers, ensuring faster iteration, better reliability, and
              local impact.
            </p>
          </div>

          {/* Quick info cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
              <div className="flex items-center gap-3">
                <Globe2 className="w-5 h-5 text-emerald-400" />
                <span className="text-sm text-gray-300">Countries</span>
              </div>
              <div className="mt-2 text-3xl font-bold">4</div>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-gray-300">Local teams</span>
              </div>
              <div className="mt-2 text-3xl font-bold">Multi‑disciplinary</div>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {countries.map((c, i) => (
            <motion.div
              key={c.name}
              className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-6 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 pointer-events-none opacity-20"
                   style={{ background: "radial-gradient(1200px 300px at 0% 0%, rgba(59,130,246,0.2), transparent)" }} />

              <div className="flex items-center justify-between">
                <div className="text-sm uppercase tracking-wider text-gray-300">
                  {c.name}
                </div>
                <MapPin className="w-5 h-5 text-purple-400" />
              </div>

              <div className="mt-8">
                <div className="text-3xl font-bold">{c.city}</div>
                <div className="mt-2 inline-flex items-center gap-2 text-sm text-gray-300">
                  <Building2 className="w-4 h-4" />
                  {c.stats}
                </div>
              </div>

              <div className="mt-8">
                <motion.div
                  className="h-1.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
                  initial={{ scaleX: 0, transformOrigin: "left" }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

