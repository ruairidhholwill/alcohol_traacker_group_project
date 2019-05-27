const PubSub = require('../helpers/pub_sub.js')

const Charts = function() {
  this.allData = []
}

Charts.prototype.bindEvents = function () {
  PubSub.subscribe('Booze:data-loaded', (events) => {
    this.allData = event.detail
    console.log(this.getUniqDates())
  })
};

Charts.prototype.getUniqDates = function () {
  return this.allData.map((date) => {
    return date.date;
  })
  .filter((date, index, array) => {
    return array.indexOf(date) === index;
  })
};

module.exports = Charts;
