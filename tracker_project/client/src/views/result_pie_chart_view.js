const PubSub = require('../helpers/pub_sub.js')

const ResultPieChart = function () {}

ResultPieChart.prototype.bindEvents = function () {
  PubSub.subscribe('Result:pie-data-ready', (event) => {
    goal = event.detail.goal;
    remaining = event.detail.remaining;
    spent = event.detail.spent;
  })

  this.renderChart();


};

ResultPieChart.prototype.renderChart = function () {
  Highcharts.chart('result-chart-view', {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false
    },
    title: {
      text: '£',
      align: 'center',
      verticalAlign: 'middle',
      y: 40
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: -25,
          style: {
            fontWeight: 'bold',
            color: 'white'
          }
        },
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '75%'],
        size: '100%'
      }
    },
    series: [{
      type: 'pie',
      name: 'Monthly Spend',
      innerSize: '75%',
      data: [
        ['Spent', 50],
        ['Remaining', 30],
        ['Saving Goal', 20]
      ]
    }]
  });
};

module.exports = ResultPieChart;
