const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST allowed' });

  const { username, password } = req.body;
  const file = path.join(process.cwd(), 'akun.json');
  const users = JSON.parse(fs.readFileSync(file));

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  res.json({ success: true, role: user.role });
}