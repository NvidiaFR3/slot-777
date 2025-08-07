const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST allowed' });

  const { username, amount } = req.body;
  const akunPath = path.join(process.cwd(), 'akun.json');
  const users = JSON.parse(fs.readFileSync(akunPath));

  const user = users.find(u => u.username === username);
  if (!user) return res.status(404).json({ error: 'User not found' });

  user.saldo = Number(amount);
  fs.writeFileSync(akunPath, JSON.stringify(users, null, 2));

  res.json({ success: true });
}