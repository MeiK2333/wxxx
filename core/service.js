global.wxxx = {};

require('./g');
require('./funcs');
require('./structures');

require('../output/app-service');
require('../output/packageComponent/app-service');


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
};
