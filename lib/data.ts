export type Project = {
  id: string;
  index: string;
  category: string;
  title: string;
  description: string;
  stack: string[];
  image?: string;
  liveUrl?: string;
  codeUrl?: string;
  status: "live" | "in-progress";
};

export const projects: Project[] = [
  {
    id: "technova",
    index: "01",
    category: "sistem basis data",
    title: "TechNova University — Sistem Manajemen Mahasiswa",
    description:
      "Sistem manajemen mahasiswa full-stack dengan dashboard analitik, kalender akademik, dan chatbot AI. Tema cyberpunk / glassmorphism, dilengkapi visualisasi algoritma sorting & searching real-time.",
    stack: ["React", "TypeScript", "Flask", "Python", "Recharts"],
    image: "/projects/technova.png",
    liveUrl: "https://project-tech-nova-web-bnn4.vercel.app",
    status: "live",
  },
  {
    id: "organize-it",
    index: "02",
    category: "productivity tool",
    title: "Organize It",
    description:
      "Mini Kanban board untuk manajemen tugas drag and drop antar kolom, tambah/edit/hapus task secara instan, dibangun dengan komponen React yang reusable.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    image: "/projects/organize-it.png",
    liveUrl: "https://organize-it-kappa.vercel.app",
    status: "live",
  },
  {
    id: "brewcraft",
    index: "03",
    category: "project mandiri",
    title: "BrewCraft — Coffee Shop Website",
    description:
      "Website coffee shop premium: landing page dengan storytelling, menu interaktif dengan filter kategori, keranjang belanja, galeri proses dari kebun ke cangkir, dan form pemesanan.",
    stack: ["HTML", "CSS", "JavaScript"],
    image: "/projects/brewcraft.png",
    liveUrl: "https://brewcraft-coffe.netlify.app",
    status: "live",
  },
  {
    id: "annadzom",
    index: "04",
    category: "sistem basis data",
    title: "Masjid An-Nadzom — Sistem Manajemen Digital",
    description:
      "Platform digital masjid terintegrasi jadwal sholat & Jumat otomatis, informasi hari raya, baca Al-Qur'an online, dan pengelolaan informasi organisasi masjid dalam satu sistem.",
    stack: ["Django", "Tailwind CSS", "HTML"],
    image: "/projects/annadzom.png",
    liveUrl: "https://masjid-annadzom.vercel.app",
    status: "live",
  },
];

export type SkillGroup = {
  category: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  { category: "frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { category: "backend", items: ["Python", "Flask", "Django"] },
  { category: "ai-creative", items: ["Prompt Engineering", "Claude AI", "Data Annotation"] },
  { category: "tools", items: ["Git", "Vercel", "CapCut", "Canva"] },
];

export type Service = {
  name: string;
  price: string;
  description: string;
  featured?: boolean;
  deliverables: string[];
};

export const services: Service[] = [
  {
    name: "Paket Basic",
    price: "Rp 150rb – 300rb",
    description: "Landing Page / Profil.",
    deliverables: ["1 halaman penuh", "Form kontak fungsional", "Optimasi mobile", "Revisi 2x"],
  },
  {
    name: "Paket Premium",
    price: "Rp 400rb – 800rb",
    description: "Website Interaktif.",
    featured: true,
    deliverables: ["Multi-section interaktif", "Filter & kategori", "Desain responsif penuh", "Revisi 3x"],
  },
  {
    name: "Paket Gold",
    price: "Rp 900rb – 2jt+",
    description: "Aplikasi web dengan sistem database.",
    deliverables: ["Database custom", "Panel admin", "Dashboard analitik", "Support pasca-launch"],
  },
];

export const contact = {
  whatsapp: "6282112115282",
  whatsappDisplay: "+62 821-1211-5282",
  email: "najwanpratomo07@gmail.com",
  linkedin: "https://www.linkedin.com/in/muhammad-najwan-pratomo-354379196",
  instagram: "https://www.instagram.com/najwanprr_/",
  github: "https://github.com/Najwan078",
  location: "Tangerang, Indonesia",
};

export const status = {
  semester: 4,
  focus: "Struktur data, teori graf & sistem backend",
  available: true,
};
