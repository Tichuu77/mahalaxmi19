import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY || "re_qBbqYpjv_MGVbXuumshB5BNMSxWawpkwh")

export async function POST(req: Request) {
  try {
    const { name, email, phone, subject, message } = await req.json()

    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>", // you can use a custom domain later
      to: "anil.kakde2016@gmail.com", // your destination email
      subject: `New Contact Message: ${subject}`,
      html: `
        <h2>New Message from Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error("Resend error:", error)
    return Response.json({ success: false, error }, { status: 500 })
  }
}
