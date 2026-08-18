"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import IntroDoor from "@/components/IntroDoor";
import CaseStudies from "@/components/CaseStudies";
import CursorSpotlight from "@/components/CursorSpotlight";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import { LanguageProvider } from "@/context/LanguageContext";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <LanguageProvider>
    <main className="relative">
      <ScrollProgressBar />
      <CursorSpotlight />

      {/* ── Intro video overlay ── */}
      {!introDone && <IntroDoor onComplete={() => setIntroDone(true)} />}

      {/* ── Konten utama: fade-in setelah intro selesai ── */}
      <div
        style={{
          opacity: introDone ? 1 : 0,
          transition: introDone ? "opacity 0.8s ease-in-out" : "none",
        }}
      >
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <CaseStudies />
        <Skills />
        <Services />
        <Contact />
        <Footer />
      </div>
    </main>
    </LanguageProvider>
  );
}