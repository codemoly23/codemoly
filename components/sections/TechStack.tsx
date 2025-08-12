"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

// All technologies in a single array for sliding carousel
const allTechnologies = [
  { name: "Next.js", logo: "/api/placeholder/60/60" },
  { name: "React", logo: "/api/placeholder/60/60" },
  { name: "Vue.js", logo: "/api/placeholder/60/60" },
  { name: "Angular", logo: "/api/placeholder/60/60" },
  { name: "TypeScript", logo: "/api/placeholder/60/60" },
  { name: "Tailwind CSS", logo: "/api/placeholder/60/60" },
  { name: "Node.js", logo: "/api/placeholder/60/60" },
  { name: "Laravel", logo: "/api/placeholder/60/60" },
  { name: "Django", logo: "/api/placeholder/60/60" },
  { name: "Spring Boot", logo: "/api/placeholder/60/60" },
  { name: "Express.js", logo: "/api/placeholder/60/60" },
  { name: "FastAPI", logo: "/api/placeholder/60/60" },
  { name: "PostgreSQL", logo: "/api/placeholder/60/60" },
  { name: "MongoDB", logo: "/api/placeholder/60/60" },
  { name: "MySQL", logo: "/api/placeholder/60/60" },
  { name: "Redis", logo: "/api/placeholder/60/60" },
  { name: "Elasticsearch", logo: "/api/placeholder/60/60" },
  { name: "Firebase", logo: "/api/placeholder/60/60" },
  { name: "AWS", logo: "/api/placeholder/60/60" },
  { name: "Google Cloud", logo: "/api/placeholder/60/60" },
  { name: "Docker", logo: "/api/placeholder/60/60" },
  { name: "Kubernetes", logo: "/api/placeholder/60/60" },
  { name: "Vercel", logo: "/api/placeholder/60/60" },
  { name: "Netlify", logo: "/api/placeholder/60/60" },
  { name: "React Native", logo: "/api/placeholder/60/60" },
  { name: "Flutter", logo: "/api/placeholder/60/60" },
  { name: "Expo", logo: "/api/placeholder/60/60" },
  { name: "Swift", logo: "/api/placeholder/60/60" },
  { name: "Kotlin", logo: "/api/placeholder/60/60" },
  { name: "Ionic", logo: "/api/placeholder/60/60" },
  { name: "OpenAI API", logo: "/api/placeholder/60/60" },
  { name: "n8n", logo: "/api/placeholder/60/60" },
  { name: "Zapier", logo: "/api/placeholder/60/60" },
  { name: "TensorFlow", logo: "/api/placeholder/60/60" },
  { name: "LangChain", logo: "/api/placeholder/60/60" },
  { name: "Pinecone", logo: "/api/placeholder/60/60" },
];

// Duplicate the array for seamless infinite scroll
const duplicatedTechnologies = [...allTechnologies, ...allTechnologies];

const TechStack: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollSpeed = 1; // Adjust speed as needed

    const scroll = () => {
      scrollAmount += scrollSpeed;
      if (scrollAmount >= scrollContainer.scrollWidth / 2) {
        scrollAmount = 0;
      }
      scrollContainer.scrollLeft = scrollAmount;
    };

    const intervalId = setInterval(scroll, 20);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/10 to-cyan-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/5 to-pink-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Code2 className="w-4 h-4" />
            TECHNOLOGY EXPERTISE
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Modern Tech Stack &{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Partners
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We leverage cutting-edge technologies and proven frameworks to build
            scalable, high-performance solutions that drive your business
            forward.
          </p>
        </motion.div>

        {/* Sliding Technology Carousel */}
        <motion.div
          className="relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent dark:from-gray-900 dark:via-gray-900/80 dark:to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent dark:from-gray-900 dark:via-gray-900/80 dark:to-transparent z-10" />

          {/* Scrolling container */}
          <div
            ref={scrollRef}
            className="flex gap-8 py-8 overflow-hidden"
            style={{ scrollBehavior: "auto" }}
          >
            {duplicatedTechnologies.map((tech, index) => (
              <motion.div
                key={`${tech.name}-${index}`}
                className="flex-shrink-0 group"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col items-center gap-3 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 min-w-[120px]">
                  {/* Tech Logo */}
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors duration-300">
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      className="w-8 h-8 object-contain"
                    />
                  </div>

                  {/* Tech Name */}
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white text-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {tech.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
