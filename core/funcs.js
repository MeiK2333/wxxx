const storage = {};

global.wx = {
  getStorageSync(key) {
    console.log(key);
    return storage[key];
  },
  setStorageSync(key, value) {
    console.log(key, value);
    storage[key] = value;
    return true;
  },
  removeStorageSync(key) {
    delete storage[key];
    return true;
  },
  getSystemInfo(params) {
    console.log(params.success.toString());
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
};
