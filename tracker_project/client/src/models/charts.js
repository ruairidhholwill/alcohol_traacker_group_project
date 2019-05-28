const PubSub = require('../helpers/pub_sub.js')

const Charts = function() {
  this.allData = []
  this.allDayInfo = []
}

Charts.prototype.bindEvents = function () {
  PubSub.subscribe('Booze:data-loaded', (events) => {
    this.allData = event.detail;
    this.getPriceAndUnitDataPerDay();
    console.log(this.allDayInfo);
    PubSub.publish('Charts:day-data-ready', this.allDayInfo);
  });
};

Charts.prototype.getUniqDates = function () {
  return this.allData.map((date) => {
    return date.date;
  })
  .filter((date, index, array) => {
    return array.indexOf(date) === index;
  });
};

Charts.prototype.getPriceAndUnitDataPerDay = function () {
  const uniqDates = this.getUniqDates();

  uniqDates.forEach((date) => {
    let totalSpent = 0;
    let totalUnits = 0;
    this.allData.forEach((loggedDrink) => {
      if(loggedDrink.date === date) {
        totalSpent += loggedDrink.price;
        totalUnits += loggedDrink.drinkUnits;
      }
    });
    const dayInfo = this.createDayInfo(date, totalSpent, totalUnits);
    this.allDayInfo.push(dayInfo);
  });
};

Charts.prototype.createDayInfo = function (date, totalSpent, totalUnits) {
  const dayInfo = {
    date: date,
    totalSpent: totalSpent,
    totalUnits: totalUnits
  };
  return dayInfo
};

module.exports = Charts;
