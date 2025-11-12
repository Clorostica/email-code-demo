const express = require('express');
const cors = require('cors');

const app = express();
let emailMap = {};

app.use(cors());
app.use(express.json());

app.get('/api/send-email-validation-code', (req, res) => {
  const email = req.query.email;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  const code = '123456';
  emailMap[email] = { code, sentAt: Date.now() };

  setTimeout(() => delete emailMap[email], 5 * 60 * 1000);

  res.status(200).json({});
});

app.post('/api/validate-email', (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) {
    return res.status(400).json({ error: 'Email and code are required' });
  }

  if (!emailMap[email] || emailMap[email].code !== code) {
    return res.status(400).json({ error: 'Invalid code or email' });
  }

  delete emailMap[email];
  const userId = Math.floor(1000 + Math.random() * 9000);
  res.status(200).json({ user_id: userId });
});

app.get('/api/get-products', (req, res) => {
  const products = {
    year: { price: 50, trial_days: 14 },
    monthly: { price: 5, trial_days: 7 }
  };
  res.status(200).json(products);
});

app.post('/api/start-trial', (req, res) => {
  const { user_id, plan } = req.body;
  if (!user_id || !plan) {
    return res.status(400).json({ error: 'Missing user_id or plan' });
  }

  res.status(200).json({ success: true });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));