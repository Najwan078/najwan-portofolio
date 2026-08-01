# Portofolio Najwan v2 — Setup

## 1. Install

```bash
npx create-next-app@latest najwan-portfolio --typescript --tailwind --app --no-src-dir
cd najwan-portfolio
npm install framer-motion lucide-react
```

Lalu copy semua file dari folder ini (app/, components/, lib/) ke project yang baru dibuat, timpa (overwrite) file yang sudah ada.

## 2. Taruh foto profil

Ambil file foto profesional kamu (yang formal, kemeja putih, background kantor — itu bagus, terang, dan wajah jelas), rename jadi:

```
profile.jpg
```

Taruh di:

```
public/profile.jpg
```

Komponen `Hero.tsx` sudah otomatis me-load dari path itu, jadi begitu file ada di sana, foto langsung muncul. Tidak perlu ubah kode apa pun.

## 3. Font

Project ini pakai `Plus Jakarta Sans` (display/headline) + `Inter` (body) + `JetBrains Mono` (label/eyebrow, tag teknologi). Semua di-load lewat `next/font/google` di `app/layout.tsx` — tidak perlu install manual.

## 4. Jalankan

```bash
npm run dev
```

Buka `http://localhost:3000`.

## 5. Ganti data proyek / harga / kontak

Semua konten (proyek, skills, harga jasa, link kontak) ada di satu file: `lib/data.ts`. Tidak perlu sentuh komponen untuk update teks — cukup edit file itu.

## 6. Deploy

```bash
vercel --prod
```

atau connect repo GitHub-nya ke Vercel dashboard seperti versi lama.
