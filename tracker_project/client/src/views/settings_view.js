const PubSub = require('../helpers/pub_sub.js')

const SettingsView = function(container ) {
  this.container = container;
}

SettingsView.prototype.bindEvents = function () {
  this.container.addEventListener('submit', (event) => {
    event.preventDefault();
    const newSettings = this.creatSettings(event.target);
    console.log(newSettings);
    PubSub.publish('SettingsView:settings-submitted', newSettings)
  })
};

SettingsView.prototype.creatSettings = function (form) {
  const newSettings = {
    currentSpend: form.pounds_spending.value,
    saveAmount: form.pounds_saving.value
  }
  return newSettings;
};


module.exports = SettingsView;
