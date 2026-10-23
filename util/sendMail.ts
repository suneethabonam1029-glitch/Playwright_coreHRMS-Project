import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

async function sendMail() {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.MAIL_TO,
    subject: 'Test mail from Playwright project',
    text: 'Hello, ee mail Playwright project nunchi vachindi.',
  });

  console.log('Email sent');
}

sendMail().catch(console.error);