import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'file-database-api-plugin',
      configureServer(server) {
        server.middlewares.use('/api/campus-data', (req, res) => {
          const dbPath = path.resolve(__dirname, 'src/data/db.json');

          if (req.method === 'GET') {
            try {
              if (fs.existsSync(dbPath)) {
                const content = fs.readFileSync(dbPath, 'utf-8');
                res.setHeader('Content-Type', 'application/json');
                res.end(content);
              } else {
                res.statusCode = 404;
                res.end(JSON.stringify({ error: 'Database file not found' }));
              }
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          } else if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
              body += chunk.toString();
            });
            req.on('end', () => {
              try {
                const parsed = JSON.parse(body);
                fs.writeFileSync(dbPath, JSON.stringify(parsed, null, 2), 'utf-8');
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, message: 'Campus database file updated successfully on disk!' }));
              } catch (err) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: err.message }));
              }
            });
          }
        });
      }
    }
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
  }
});
