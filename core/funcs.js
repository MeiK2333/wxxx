const storage = {};

global.wx = {
  getStorageSync(key) {
    return storage[key];
  },
  setStorageSync(key, value) {
    storage[key] = value;
    return true;
  },
  removeStorageSync(key) {
    delete storage[key];
    return true;
  },
  getSystemInfo(params) {
    params.success({ system: 'android' })
  },
  getSystemInfoSync() {
    return {
      windowWidth: 320
    }
  },
  request(params) {
  },
  canIUse() {
    return false;
  },
  reportAnalytics() {

  },
  getRecorderManager() {

  },
  createInnerAudioContext() { },
  getBackgroundAudioManager() { },
};
