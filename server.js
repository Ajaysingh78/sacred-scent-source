// server.js
import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // loads .env.local

const app = express();
app.use(express.json());

app.post("/api/contact", async (req, res) => {
  const { name, email, phone, quantity, message } = req.body || {};
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email required" });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.verify();
  } catch (err) {
    console.error("SMTP verify failed:", err);
    return res.status(500).json({ error: "SMTP verify failed", details: String(err) });
  }

  const mailOptions = {
    from: `"Website Enquiry" <${process.env.SMTP_USER}>`,
    to: process.env.CLIENT_EMAIL,
    subject: `New Enquiry from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "-"}\nQuantity: ${quantity || "-"}\nMessage:\n${message || "-"}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info);
    return res.status(200).json({ ok: true, info });
  } catch (err) {
    console.error("SendMail error:", err);
    return res.status(500).json({ error: "Failed to send email", details: String(err) });
  }
});

// ✅ Run on different port to not conflict with Vite
const PORT = 5000;
app.listen(PORT, () => console.log(`📩 Mail server running on http://localhost:${PORT}`));
