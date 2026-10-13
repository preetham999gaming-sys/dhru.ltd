import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendOtpEmail(to: string, otp: string) {
  const from = process.env.EMAIL_FROM || 'no-reply@dhru.ltd'
  await transporter.sendMail({
    from,
    to,
    subject: 'Your dhru.ltd sign-in code',
    text: `Your sign-in code: ${otp} (valid for 10 minutes)`,
    html: `<p>Your sign-in code: <strong>${otp}</strong> <br/><small>Valid for 10 minutes</small></p>`,
  })
}
