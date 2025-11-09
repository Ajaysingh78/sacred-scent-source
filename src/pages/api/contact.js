// pages/api/contact.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, email, phone, quantity, message } = req.body || {};

  if (!name || !email) return res.status(400).json({ error: "Name and email are required" });

  // transporter using env vars
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true", // set true if using 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"Website Enquiry" <${process.env.SMTP_USER}>`,
    to: process.env.CLIENT_EMAIL, // required in env
    subject: `New Enquiry from ${name}`,
    text:
      `New enquiry received:\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone || "-"}\n` +
      `Approx. Quantity: ${quantity || "-"}\n` +
      `Message: ${message || "-"}\n\n` +
      `--\nThis email was sent from your website contact form.`,
    html:
      `<h3>New enquiry received</h3>` +
      `<p><strong>Name:</strong> ${name}</p>` +
      `<p><strong>Email:</strong> ${email}</p>` +
      `<p><strong>Phone:</strong> ${phone || "-"}</p>` +
      `<p><strong>Quantity:</strong> ${quantity || "-"}</p>` +
      `<p><strong>Message:</strong><br/>${message ? message.replace(/\n/g, "<br/>") : "-"}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Mail send error:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
