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

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <main className="relative">
      {!introDone && <IntroDoor onComplete={() => setIntroDone(true)} />}
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <CaseStudies />
      <Skills />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}
