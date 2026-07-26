import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.resolve(__dirname, 'src/data/db.json');

app.use(express.json({ limit: '50mb' }));

// 1. GET Campus File Database
app.get('/api/campus-data', (req, res) => {
  try {
    if (fs.existsSync(DB_PATH)) {
      const content = fs.readFileSync(DB_PATH, 'utf-8');
      res.setHeader('Content-Type', 'application/json');
      res.send(content);
    } else {
      res.status(404).json({ error: 'Database file db.json not found on disk' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. POST Update Campus File Database on Disk
app.post('/api/campus-data', (req, res) => {
  try {
    const updatedData = req.body;
    fs.writeFileSync(DB_PATH, JSON.stringify(updatedData, null, 2), 'utf-8');
    res.json({ success: true, message: 'Campus dataset saved permanently to db.json on disk!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Serve Production Build Dist Assets
app.use(express.static(path.resolve(__dirname, 'dist')));

// Fallback to index.html for Single Page Application routing
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 RNS Campus File Database Server running at http://localhost:${PORT}`);
});
