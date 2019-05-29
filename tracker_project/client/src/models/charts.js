const PubSub = require('../helpers/pub_sub.js')

const Charts = function() {
  this.allData = []
  this.dates = []
  this.pounds = []
  this.units = []
}

Charts.prototype.bindEvents = function () {
  PubSub.subscribe('Booze:data-loaded', (events) => {
    this.allData = []
    this.dates = []
    this.pounds = []
    this.units = []
    this.allData = event.detail;
    this.getPriceAndUnitDataPerDay();
    const chartData = this.createDataForChart(this.dates, this.pounds, this.units)
    PubSub.publish('Charts:chart-data-ready', chartData);
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
        totalSpent += parseFloat(loggedDrink.price);
        totalUnits += loggedDrink.drinkUnits;
      }
    });

    this.dates.push(date);
    this.pounds.push(totalSpent);
    this.units.push(totalUnits);
  });
};

Charts.prototype.createDataForChart = function (dates, pounds, units) {
  const chartInfo = {
    dates: dates,
    pounds: pounds,
    units: units
  }
  return chartInfo;
};

module.exports = Charts;
