"use client";

import { motion } from "framer-motion";
import {
  Globe2,
  MapPin,
  Users,
  Building2,
  Phone,
  Mail,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";

const countries = [
  {
    name: "Bangladesh",
    city: "Dhaka",
    stats: "HQ for APAC",
    address: "14/1, BTI Emporium Tower, Mirpur Road, Shamoli, Dhaka",
    phone: "+01894 955 494",
    email: "hello@codemoly.com",
    flagUrl: "https://flagcdn.com/w40/bd.png",
    countryCode: "BD",
  },
  {
    name: "France",
    city: "Paris",
    stats: "EU Product Hub",
    address: "78 avenue des champs élysées 75008 paris",
    phone: "+33743579692",
    email: "hello@codemoly.com",
    website: "https://fr.codemoly.com/",
    flagUrl: "https://flagcdn.com/w40/fr.png",
    countryCode: "FR",
  },
  {
    name: "Austria",
    city: "Vienna",
    stats: "Engineering",
    address: "Sonnwendgasse 30/2/11, 1100, Wien",
    phone: "+43 664 875 8864",
    email: "hello@codemoly.com",
    website: "https://austria.codemoly.com/",
    flagUrl: "https://flagcdn.com/w40/at.png",
    countryCode: "AT",
  },
];

export default function GlobalPresence() {
  const [copiedText, setCopiedText] = useState<string>("");

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(`${type}-${text}`);
      setTimeout(() => setCopiedText(""), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <section
      id="global"
      className="relative py-24 bg-black text-white overflow-hidden"
    >
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
              <div className="mt-2 text-3xl font-bold">3</div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {countries.map((c, i) => (
            <motion.div
              key={c.name}
              className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white/8 to-white/2 border border-white/20 backdrop-blur-sm hover:border-white/30 transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Enhanced background gradient */}
              <div
                className="absolute inset-0 pointer-events-none opacity-30 group-hover:opacity-40 transition-opacity duration-300"
                style={{
                  background:
                    "radial-gradient(800px 400px at 0% 0%, rgba(59,130,246,0.15), rgba(168,85,247,0.1), transparent)",
                }}
              />

              <div className="relative p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={c.flagUrl}
                      alt={`${c.name} flag`}
                      className="w-6 h-4 object-cover rounded-sm shadow-sm"
                    />
                    <div className="text-sm uppercase tracking-wider text-gray-300 font-semibold">
                      {c.name}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Website link icon for France and Austria */}
                    {c.website && (
                      <button
                        onClick={() => window.open(c.website, "_blank")}
                        className="p-2 rounded-full bg-white/10 hover:bg-blue-500/20 transition-all duration-300 group/link"
                        title={`Visit ${c.name} website`}
                      >
                        <ExternalLink className="w-4 h-4 text-blue-400 group-hover/link:text-blue-300" />
                      </button>
                    )}
                    <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                      <MapPin className="w-5 h-5 text-purple-400" />
                    </div>
                  </div>
                </div>

                {/* City and Role */}
                <div className="mb-6">
                  <div className="text-3xl font-bold mb-2 text-white">
                    {c.city}
                  </div>
                  <div className="inline-flex items-center gap-2 text-sm text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full">
                    <Building2 className="w-4 h-4" />
                    {c.stats}
                  </div>
                </div>

                {/* Contact Details */}
                <div className="space-y-4 mb-6">
                  {/* Address */}
                  <div className="group/item">
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-200">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {c.address}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="group/item">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-200">
                      <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-sm text-gray-300 flex-1">
                        {c.phone}
                      </span>
                      <button
                        onClick={() => copyToClipboard(c.phone, "phone")}
                        className="opacity-0 group-hover/item:opacity-100 p-1 rounded-md hover:bg-white/10 transition-all duration-200"
                        title="Copy phone number"
                      >
                        {copiedText === `phone-${c.phone}` ? (
                          <Check className="w-3 h-3 text-green-400" />
                        ) : (
                          <Copy className="w-3 h-3 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="group/item">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-200">
                      <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-sm text-gray-300 flex-1">
                        {c.email}
                      </span>
                      <button
                        onClick={() => copyToClipboard(c.email, "email")}
                        className="opacity-0 group-hover/item:opacity-100 p-1 rounded-md hover:bg-white/10 transition-all duration-200"
                        title="Copy email"
                      >
                        {copiedText === `email-${c.email}` ? (
                          <Check className="w-3 h-3 text-green-400" />
                        ) : (
                          <Copy className="w-3 h-3 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Animated bottom bar */}
                <div className="relative">
                  <motion.div
                    className="h-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"
                    initial={{ scaleX: 0, transformOrigin: "left" }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
