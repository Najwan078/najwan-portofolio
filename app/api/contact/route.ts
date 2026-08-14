import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nama, email, dan pesan wajib diisi." },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["najwanpratomo07@gmail.com"],
      replyTo: email,
      subject: `[Portfolio] Pesan dari ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #08080D; color: #EDEDF4; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #1a1a2e 0%, #12121A 100%); padding: 32px 32px 24px; border-bottom: 1px solid rgba(212,175,122,0.3);">
            <p style="margin: 0 0 4px; font-size: 11px; letter-spacing: 0.15em; color: #D4AF7A; text-transform: uppercase; font-weight: 600;">Muhammad Najwan Pratomo</p>
            <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #EDEDF4;">Pesan baru dari Portfolio</h1>
          </div>

          <!-- Body -->
          <div style="padding: 32px;">
            
            <!-- Sender Info -->
            <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-left: 3px solid #D4AF7A; border-radius: 10px; padding: 16px 20px; margin-bottom: 24px;">
              <p style="margin: 0 0 6px; font-size: 11px; letter-spacing: 0.1em; color: #9A9AB0; text-transform: uppercase;">Pengirim</p>
              <p style="margin: 0 0 4px; font-size: 16px; font-weight: 600; color: #EDEDF4;">${name}</p>
              <a href="mailto:${email}" style="color: #D4AF7A; font-size: 14px; text-decoration: none;">${email}</a>
            </div>

            <!-- Message -->
            <div style="margin-bottom: 24px;">
              <p style="margin: 0 0 10px; font-size: 11px; letter-spacing: 0.1em; color: #9A9AB0; text-transform: uppercase;">Pesan</p>
              <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 20px; font-size: 15px; line-height: 1.7; color: #EDEDF4; white-space: pre-wrap;">${message}</div>
            </div>

            <!-- Reply Button -->
            <a href="mailto:${email}?subject=Re: Pesan dari Portfolio&body=Halo ${name},%0A%0A" 
               style="display: inline-block; background: #D4AF7A; color: #08080D; font-weight: 700; font-size: 14px; padding: 12px 28px; border-radius: 100px; text-decoration: none; letter-spacing: 0.02em;">
              Balas Pesan
            </a>
          </div>

          <!-- Footer -->
          <div style="padding: 20px 32px; border-top: 1px solid rgba(255,255,255,0.06); text-align: center;">
            <p style="margin: 0; font-size: 12px; color: #9A9AB0;">Dikirim dari form kontak di <strong style="color: #D4AF7A;">najwan-portofolio.vercel.app</strong></p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Gagal mengirim email." }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
