const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, 'certs', 'local.dev.devdevdev.co.kr-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'certs', 'local.dev.devdevdev.co.kr.pem')),
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    console.log('url', req.url);

    // CORS 헤더 추가
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    handle(req, res, parsedUrl);
  }).listen(3000, () => {
    console.log('> Ready on https://local.dev.devdevdev.co.kr:3000');
  });
});
