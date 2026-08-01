import { contact } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-6 md:px-10">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-mist-400 eyebrow">
        <p>Muhammad Najwan Pratomo · Portofolio {new Date().getFullYear()}</p>
        <p>{contact.location}</p>
      </div>
    </footer>
  );
}
