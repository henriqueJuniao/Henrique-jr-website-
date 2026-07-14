import express from 'express';
import path from 'node:path';
import fs from 'node:fs';

const app = express();
const dist = '/home/ubuntu/henriquejr-v1/dist/public';
const assets = '/home/ubuntu/webdev-static-assets/henriquejr';

app.get('/manus-storage/:filename', (req, res) => {
  const filename = path.basename(req.params.filename);
  const localName = filename.replace(/_[0-9a-f]{8}(?=\.[^.]+$)/, '');
  const localPath = path.join(assets, localName);
  if (!fs.existsSync(localPath)) {
    res.status(404).send('Not found');
    return;
  }
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.sendFile(localPath);
});

app.get(/.*\.(?:css|js|svg)$/, (req, res, next) => {
  if (!String(req.headers['accept-encoding'] ?? '').includes('gzip')) {
    next();
    return;
  }

  const sourcePath = path.join(dist, decodeURIComponent(req.path));
  const gzipPath = `${sourcePath}.gz`;
  if (!fs.existsSync(gzipPath)) {
    next();
    return;
  }

  const extension = path.extname(sourcePath);
  const contentType = extension === '.js'
    ? 'text/javascript; charset=utf-8'
    : extension === '.css'
      ? 'text/css; charset=utf-8'
      : 'image/svg+xml';

  res.setHeader('Content-Type', contentType);
  res.setHeader('Content-Encoding', 'gzip');
  res.setHeader('Vary', 'Accept-Encoding');
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.send(fs.readFileSync(gzipPath));
});

app.use(express.static(dist, { maxAge: '1y', immutable: true, index: false }));
app.get('*', (_req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.sendFile(path.join(dist, 'index.html'));
});

const port = Number(process.env.PORT ?? 4173);
app.listen(port, '127.0.0.1', () => {
  console.log(`Audit server listening on http://127.0.0.1:${port}`);
});
