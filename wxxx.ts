import express from 'express';
import path from 'path';
import fs, { promises } from 'fs';

const service = require('./core/service');

const app = express();
var expressWs = require('express-ws')(app);
app.use(express.json());
app.use(express.static('static'));
const output_path = path.join(__dirname, 'output');
const port = 8777;

app.get('/', (req, res) => {
  res.send('Hello World!');
})

//@ts-ignore
app.ws('/event', function (ws, req) {
  ws.send(JSON.stringify({
    "event": "reload",
  }));
  ws.on('message', function (msg: any) {
    ws.send(msg);
  });
});

app.post('/wxxx/page/data', (req, res) => {
  const path: String = req.body.path;
  const { data } = service.page(path.slice(0, path.length - 5));
  res.send(data);
})

app.get('/*', async (req, res) => {
  const p = path.join(output_path, req.path);
  if (!fs.existsSync(p)) {
    res.status(404).send('Not found!');
    return;
  }
  if (p.endsWith('.html')) {
    res.set('Content-Type', 'text/html');
    const body = await promises.readFile(p);
    const temp = await promises.readFile('static/template.html');
    res.send(String(temp) + String(body));
    return;
  }
  res.sendFile(p);
})

app.listen(port, () => {
  console.log(`WXXX listening at http://localhost:${port}`);
})