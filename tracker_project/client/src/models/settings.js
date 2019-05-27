const PubSub = require('../helpers/pub_sub.js')
const RequestHelper = require('../helpers/request_helper.js')

const Settings = function (url) {
  this.url = url;
  this.request = new RequestHelper(this.url);
  this.allSettingsData = []
}

Settings.prototype.bindEvents = function () {
  PubSub.subscribe('SettingsView:settings-submitted', (event) => {
    this.postSettings(event.detail);
  })
}

Settings.prototype.getData = function () {
    this.request.get()
      .then((settingDetails) => {
        PubSub.publish('Settings:data-loaded', settingDetails)
        this.allSettingsData = settingDetails
      })
      .catch(console.error)
  }

// Settings.prototype.


Settings.prototype.postSettings = function(settingDetail){
    // console.log('post boozeDetails', boozeDetail)
    this.request.post(settingDetail)
    }

module.exports = Settings;
