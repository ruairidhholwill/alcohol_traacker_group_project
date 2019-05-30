const PubSub = require('../helpers/pub_sub.js');

const DailyChart = function (container) {
  this.container = container;
  this.dates = []
  this.pounds = []
  this.units = []
};

  // subdcribe to chart model
  DailyChart.prototype.bindEvents = function () {
    PubSub.subscribe('Charts:chart-data-ready', (event) => {
      const dates = event.detail.dates;
      const pounds = event.detail.pounds;
      const units = event.detail.units;
      this.renderChart(dates, pounds, units);
      PubSub.subscribe('DrinksListView:toggle-check', () => {
        this.renderChart(dates, pounds, units);
      })
    })
  };

  DailyChart.prototype.renderChart = function (dates, pounds, units) {
    Highcharts.chart('chart-view', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Spending / Units Intake'
      },
      xAxis: {
        categories: dates
      },
      yAxis: {
        title: {
          text: '£ / Units'
        }
      },
      series: [{
        name: 'Pounds',
        data: pounds
      }, {
        name: 'Units',
        data: units
      }]
    });
  };

module.exports = DailyChart;
