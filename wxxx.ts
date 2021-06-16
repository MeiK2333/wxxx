import express from 'express';
import path from 'path';
import fs, { promises } from 'fs';
import nunjucks from 'nunjucks';

const service = require('./core/service');

const app = express();
var expressWs = require('express-ws')(app);
app.use(express.json());
app.use(express.static('static'));
nunjucks.configure('static', { autoescape: true, express: app });
const output_path = path.join(__dirname, 'output');
const port = 8777;

app.get('/', (req, res) => {
  res.send('Hello World!');
})

//@ts-ignore
app.ws('/event', function (ws, req) {
  const page = req.query.path;
  const currentPage = service.openPage(page, ws);


  ws.send(JSON.stringify({
    "event": "reload",
    'vNode': currentPage.data,
  }));


  ws.on('message', function (msg: any) {
    const obj = JSON.parse(msg);
    if (obj.event === 'func') {
      const func = obj.func;
      const param = obj.param;
      currentPage[func](param);
    }
  });
});

app.get('/*', async (req, res) => {
  const p = path.join(output_path, req.path);
  if (!fs.existsSync(p)) {
    const f = p + '.html';
    if (fs.existsSync(f)) {
      res.set('Content-Type', 'text/html');
      const body = await promises.readFile(f);
      res.send(nunjucks.render('page.html', { body: body }));
      return;
    }
    res.status(404).send('Not found!');
    return;
  }
  res.sendFile(p);
})

app.listen(port, () => {
  console.log(`WXXX listening at http://localhost:${port}`);
})