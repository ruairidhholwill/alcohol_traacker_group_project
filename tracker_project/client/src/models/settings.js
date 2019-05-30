const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const Settings = function (url) {
  this.url = url;
  this.request = new RequestHelper(this.url);
};

Settings.prototype.bindEvents = function () {
  PubSub.subscribe('SettingsView:settings-submitted', (event) => {
    this.postSettings(event.detail);
  })
};

Settings.prototype.getData = function () {
  this.request.get()
  .then((settingDetails) => {
    PubSub.publish('Settings:data-loaded', settingDetails)
  })
  .catch(console.error)
};

Settings.prototype.postSettings = function(settingDetail){
  this.request.post(settingDetail)
  .then((settingDetails) => {
    PubSub.publish('Settings:data-loaded', settingDetails)
  })
  .catch(console.error)
};

module.exports = Settings;
