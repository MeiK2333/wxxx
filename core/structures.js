global.wxxx.app = undefined;

global.App = (app) => {
  global.wxxx.app = app;
};
global.getApp = () => {
  return global.wxxx.app;
}
global.getCurrentPages = undefined;

global.__wxAppCurrentFile__ = null;
global.wxxx.components = {};
global.wxxx.pages = {};
global.wxxx.behavior = {};
global.define = function (path, func) {
  __wxAppCurrentFile__ = path.slice(0, path.length - 3);
}
global.Component = (component) => {
  global.wxxx.components[__wxAppCurrentFile__] = component;
}
global.Page = (page) => {
  global.wxxx.pages[__wxAppCurrentFile__] = page;
}
global.Behavior = function (behavior) {
  global.wxxx.pages[__wxAppCurrentFile__] = behavior;
}