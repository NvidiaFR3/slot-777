const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST allowed' });

  const { username, password } = req.body;
  const file = path.join(process.cwd(), 'akun.json');
  const users = JSON.parse(fs.readFileSync(file));

  if (users.find(u => u.username === username)) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  users.push({ username, password, role: 'user', saldo: 0 });
  fs.writeFileSync(file, JSON.stringify(users, null, 2));
  res.json({ success: true });
}