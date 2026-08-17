import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-ink-950 bg-grid-fade flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="eyebrow bracket mb-6 text-gold-400">error 404</p>
        <h1 className="font-display font-bold text-6xl sm:text-7xl text-mist-100 mb-4">
          Halaman <span className="text-gradient-gold">Hilang</span>
        </h1>
        <p className="text-mist-400 leading-relaxed mb-9">
          Sepertinya kamu nyasar — halaman yang kamu cari nggak ada atau udah
          dipindah. Yuk balik ke halaman utama.
        </p>
        <Link
          href="/"
          className="inline-flex items-center rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-ink-950 hover:bg-gold-400 transition-colors shadow-glow"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}
