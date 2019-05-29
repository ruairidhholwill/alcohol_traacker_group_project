const PubSub = require('../helpers/pub_sub.js');

const SettingsView = function (element, container) {
  this.element = element;
  this.container = container;
  this.toggleState = false
};

SettingsView.prototype.bindEvents = function () {
  // this.toggleSettingsView()
  this.toggleLogoSettings();

  this.container.addEventListener('submit', (event) => {
    event.preventDefault();
    const newSettings = this.createSettings(event.target);
    PubSub.publish('SettingsView:settings-submitted', newSettings)
    this.hideSettingsView()
  })
};

SettingsView.prototype.toggleLogoSettings = function () {
  const checkboxElement = document.getElementById("settings-logo-toggle")
  checkboxElement.addEventListener('click', () => {

    if (this.toggleState === true) {
      document.getElementById('settings').style.display = 'block';
      document.getElementById('logo').style.display = 'none';
      this.toggleState = false;
      // PubSub.publish('DrinksListView:toggle-check');
    } else {
      document.getElementById('settings').style.display = 'none';
      document.getElementById('logo').style.display = 'block';
      this.toggleState = true;
    }
  })
};
// SettingsView.prototype.toggleSettingsView = function () {
//   const element = document.getElementById("settings");
//   if (element.style.display === "none") {
//     element.style.display = "block";
//   } else {
//     element.style.display = "none";
//   }
// };
SettingsView.prototype.hideSettingsView = function () {
  const element = document.getElementById("settings");
  element.style.display = "none";

  document.getElementById('logo').style.display = 'block';
};

SettingsView.prototype.createSettings = function (form) {
  const newSettings = {
    currentSpend: form.pounds_spending.value,
    saveAmount: form.pounds_saving.value
  }
  return newSettings;
};

module.exports = SettingsView;
