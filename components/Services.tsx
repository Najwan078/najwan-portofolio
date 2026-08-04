"use client";

import { services } from "@/lib/data";
import ServiceCard from "./ServiceCard";

export default function Services() {
  return (
    <section id="services" className="relative py-24 px-6 md:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-mist-100 max-w-2xl">
          Layanan yang saya tawarkan
        </h2>
        <p className="mt-4 max-w-xl text-mist-400">
          Jasa pembuatan landing page, website dan aplikasi.
          Cocok untuk UMKM, organisasi, sekolah, dan tim.
        </p>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.name} service={service} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
