"use client";

import { projects } from "@/lib/data";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 px-6 md:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow bracket mb-4">portofolio</p>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-mist-100 max-w-2xl">
          4 proyek, 4 jenis kebutuhan berbeda
        </h2>
        <p className="mt-4 max-w-xl text-mist-400">
          Dari sistem akademik, tools produktivitas, website bisnis, sampai platform komunitas.
        </p>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
