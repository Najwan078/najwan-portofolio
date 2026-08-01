"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 px-6 md:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow bracket mb-4">tools &amp; keahlian</p>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-mist-100 mb-12">
          Yang saya pakai untuk membangun
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-2xl p-5"
            >
              <p className="eyebrow text-gold-500 mb-4">category: {group.category}</p>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-mist-300 flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-violet-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
