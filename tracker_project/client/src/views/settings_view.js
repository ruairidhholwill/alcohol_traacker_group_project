const PubSub = require('../helpers/pub_sub.js')

const SettingsView = function(element, container) {
  this.element = element;
  this.container = container;
}

SettingsView.prototype.bindEvents = function () {
  this.element.addEventListener('click', () => {
    this.toggleSettingsView()
  })

  this.container.addEventListener('submit', (event) => {
    event.preventDefault();
    const newSettings = this.creatSettings(event.target);
    console.log(newSettings);
    PubSub.publish('SettingsView:settings-submitted', newSettings)
  })
};

SettingsView.prototype.toggleSettingsView = function () {
  const element = document.getElementById("settings");
  if (element.style.display === "none") {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
};

SettingsView.prototype.creatSettings = function (form) {
  const newSettings = {
    currentSpend: form.pounds_spending.value,
    saveAmount: form.pounds_saving.value
  }
  return newSettings;
};


module.exports = SettingsView;
