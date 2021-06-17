global.wxxx = {};

require('./g');
require('./funcs');
require('./structures');

require('../output/app-service');

const fs = require('fs');
const path = require('path');
global.wxxx.appConfigJson = JSON.parse(fs.readFileSync('./output/app-config.json').toString());
if ('subPackages' in global.wxxx.appConfigJson) {
  for (const packages of global.wxxx.appConfigJson.subPackages) {
    const p = path.join('../output', packages.root, 'app-service');
    if (fs.existsSync(path.join('output', packages.root, 'app-service.js'))) {
      require(p);
    }
  }
}


class Page {
  constructor(page, socket) {
    for (const [key, value] of Object.entries(page)) {
      this[key] = value;
    }
    this.data = JSON.parse(JSON.stringify(page.data));
    this.socket = socket;
  }
  setData(data) {
    this.data = {
      ...this.data,
      ...data,
    }
    this.socket.send(JSON.stringify({
      "event": "reload",
      'vNode': this.data,
    }));
  }
}

function openPage(path, socket) {
  if (path[0] === '/') {
    path = path.slice(1);
  }
  const page = new Page(global.wxxx.pages[path], socket);
  return page;
}

module.exports = {
  hello: "world",
  page: function (path) {
    if (path[0] === '/') {
      path = path.slice(1);
    }
    return global.wxxx.pages[path];
  },
  openPage,
  subPackages: function() {
    if ('subPackages' in wxxx.appConfigJson) {
      return wxxx.appConfigJson.subPackages;
    }
    return [];
  }
};
