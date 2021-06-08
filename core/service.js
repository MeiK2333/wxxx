global.wxxx = {};

require('./g');
require('./funcs');
require('./structures');

require('../output/app-service');

module.exports = {
  hello: "world",
  page: function (path) {
    if (path[0] === '/') {
      path = path.slice(1);
    }
    return global.wxxx.pages[path];
  }
};
