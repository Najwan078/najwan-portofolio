export type Project = {
  id: string;
  index: string;
  category: string;
  categoryEn?: string;
  title: string;
  description: string;
  descriptionEn?: string;
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
    categoryEn: "database system",
    title: "TechNova University — Sistem Manajemen Mahasiswa",
    description:
      "Sistem manajemen mahasiswa full-stack dengan dashboard analitik, kalender akademik, dan chatbot AI. Tema cyberpunk / glassmorphism, dilengkapi visualisasi algoritma sorting & searching real-time.",
    descriptionEn:
      "Full-stack student management system with analytics dashboard, academic calendar, and AI chatbot. Cyberpunk/glassmorphism theme, complete with real-time sorting & searching algorithm visualization.",
    stack: ["React", "TypeScript", "Flask", "Python", "Recharts"],
    image: "/projects/technova.png",
    liveUrl: "https://project-tech-nova-web-bnn4.vercel.app",
    status: "live",
  },
  {
    id: "organize-it",
    index: "02",
    category: "productivity tool",
    categoryEn: "productivity tool",
    title: "Organize It",
    description:
      "Mini Kanban board untuk manajemen tugas drag and drop antar kolom, tambah/edit/hapus task secara instan, dibangun dengan komponen React yang reusable.",
    descriptionEn:
      "Mini Kanban board for task management with drag-and-drop between columns, instant add/edit/delete tasks, built with reusable React components.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    image: "/projects/organize-it.png",
    liveUrl: "https://organize-it-kappa.vercel.app",
    status: "live",
  },
  {
    id: "brewcraft",
    index: "03",
    category: "project mandiri",
    categoryEn: "self-initiated",
    title: "BrewCraft — Coffee Shop Website",
    description:
      "Website coffee shop premium: landing page dengan storytelling, menu interaktif dengan filter kategori, keranjang belanja, galeri proses dari kebun ke cangkir, dan form pemesanan.",
    descriptionEn:
      "Premium coffee shop website: storytelling landing page, interactive menu with category filters, shopping cart, farm-to-cup gallery, and order form.",
    stack: ["HTML", "CSS", "JavaScript"],
    image: "/projects/brewcraft.png",
    liveUrl: "https://brewcraft-coffe.netlify.app",
    status: "live",
  },
  {
    id: "annadzom",
    index: "04",
    category: "sistem basis data",
    categoryEn: "database system",
    title: "Masjid An-Nadzom — Sistem Manajemen Digital",
    description:
      "Platform digital masjid terintegrasi jadwal sholat & Jumat otomatis, informasi hari raya, baca Al-Qur'an online, dan pengelolaan informasi organisasi masjid dalam satu sistem.",
    descriptionEn:
      "Integrated mosque digital platform with automatic prayer & Friday schedules, holiday information, online Quran reading, and mosque organization management in one system.",
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
  nameEn?: string;
  price: string;
  description: string;
  descriptionEn?: string;
  featured?: boolean;
  deliverables: string[];
  deliverablesEn?: string[];
};

export const services: Service[] = [
  {
    name: "Paket Basic",
    nameEn: "Basic Package",
    price: "Rp 150rb – 300rb",
    description: "Landing Page / Profil.",
    descriptionEn: "Landing Page / Profile.",
    deliverables: ["1 halaman penuh", "Form kontak fungsional", "Optimasi mobile", "Revisi 2x"],
    deliverablesEn: ["1 full page", "Functional contact form", "Mobile optimization", "2x revision"],
  },
  {
    name: "Paket Premium",
    nameEn: "Premium Package",
    price: "Rp 400rb – 800rb",
    description: "Website Interaktif.",
    descriptionEn: "Interactive Website.",
    featured: true,
    deliverables: ["Multi-section interaktif", "Filter & kategori", "Desain responsif penuh", "Revisi 3x"],
    deliverablesEn: ["Multi-section interactive", "Filters & categories", "Fully responsive design", "3x revision"],
  },
  {
    name: "Paket Gold",
    nameEn: "Gold Package",
    price: "Rp 900rb – 2jt+",
    description: "Aplikasi web dengan sistem database.",
    descriptionEn: "Web application with database system.",
    deliverables: ["Database custom", "Panel admin", "Dashboard analitik", "Support pasca-launch"],
    deliverablesEn: ["Custom database", "Admin panel", "Analytics dashboard", "Post-launch support"],
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
