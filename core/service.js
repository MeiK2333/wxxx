global.wxxx = {};

require('./g');
require('./funcs');
require('./structures');

require('../output/app-service');

const pageStock = [];

function getCurrentPage() {
  return pageStock.length > 0 ? pageStock[pageStock.length - 1] : null;
}

function openPage(path) {

}

function closePage(path) {

}

module.exports = {
  hello: "world",
  page: function (path) {
    if (path[0] === '/') {
      path = path.slice(1);
    }
    return global.wxxx.pages[path];
  }
};
