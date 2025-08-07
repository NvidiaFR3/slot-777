const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST allowed' });

  const { username, amount } = req.body;
  const akunPath = path.join(process.cwd(), 'akun.json');
  const historyPath = path.join(process.cwd(), 'history.json');

  const users = JSON.parse(fs.readFileSync(akunPath));
  const history = JSON.parse(fs.readFileSync(historyPath));

  const user = users.find(u => u.username === username);
  if (!user) return res.status(404).json({ error: 'User not found' });

  user.saldo += Number(amount);
  history.push({ username, amount, date: new Date().toISOString() });

  fs.writeFileSync(akunPath, JSON.stringify(users, null, 2));
  fs.writeFileSync(historyPath, JSON.stringify(history, null, 2));

  res.json({ success: true, saldo: user.saldo });
}