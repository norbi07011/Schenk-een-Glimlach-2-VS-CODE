const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', version: '1.0', time: new Date().toISOString() });
});

// TODO: npm i stripe
// const Stripe = require('stripe');
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
app.post('/api/checkout', async (req, res) => {
  // TODO: npm i stripe
  // const Stripe = require('stripe');
  // const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  const { amount, locale } = req.body;
  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }
  // Uncomment below after installing stripe
  /*
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card', 'ideal'],
      currency: 'eur',
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: { name: 'Donation' },
          unit_amount: Math.floor(amount * 100),
        },
        quantity: 1,
      }],
      success_url: 'http://localhost:5173/dziekujemy',
      cancel_url: 'http://localhost:5173/jak-pomoc',
      locale: locale || 'pl',
    });
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  */
  res.status(501).json({ error: 'Stripe integration not yet enabled. See TODO.' });
});

// TODO: npm i nodemailer
// const nodemailer = require('nodemailer');
app.post('/api/send-mail', async (req, res) => {
  // TODO: npm i nodemailer
  // const nodemailer = require('nodemailer');
  const { type, payload } = req.body;
  if (!payload || !payload.email) {
    return res.status(400).json({ error: 'Brak adresu e-mail.' });
  }
  const subjectMap = {
    rsvp: 'RSVP na wydarzenie',
    sponsor: 'Zapytanie o sponsoring',
    donation_in_kind: 'Darowizna rzeczowa',
    volunteer: 'Zgłoszenie wolontariusza'
  };
  const subject = subjectMap[type] || 'Wiadomość z formularza';
  try {
    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
    //   secure: false,
    //   auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASS
    //   }
    // });
    // await transporter.sendMail({
    //   from: process.env.SMTP_FROM,
    //   to: process.env.SMTP_FROM,
    //   replyTo: payload.email,
    //   subject,
    //   text: JSON.stringify(payload, null, 2)
    // });
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Błąd serwera podczas wysyłki e-mail.' });
  }
});

app.listen(PORT, () => {
  console.log(`API http://localhost:${PORT}`);
});
