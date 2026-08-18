"use client";

import { motion } from "framer-motion";

interface WordRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span";
}

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09 },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export default function WordReveal({ text, className, as: Tag = "span" }: WordRevealProps) {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={wordVariants}
          className="inline-block"
          style={{ marginRight: i < words.length - 1 ? "0.28em" : 0 }}
        >
          {w}
        </motion.span>
      ))}
    </motion.span>
  );
}
