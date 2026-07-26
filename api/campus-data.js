import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const dbPath = path.resolve(process.cwd(), 'src/data/db.json');

  if (req.method === 'GET') {
    try {
      if (fs.existsSync(dbPath)) {
        const content = fs.readFileSync(dbPath, 'utf-8');
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).send(content);
      } else {
        return res.status(404).json({ error: 'Database file db.json not found' });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
      return res.status(200).json({ success: true, message: 'Saved to db.json' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
