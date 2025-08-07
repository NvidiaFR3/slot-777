const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  const users = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'akun.json')));
  res.json(users.map(u => ({ username: u.username, saldo: u.saldo })));
}