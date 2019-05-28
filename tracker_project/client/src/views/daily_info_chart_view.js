const DailyChart = function (container){
  this.container = container;


  // subdcribe to chart model 

  Highcharts.chart('container', {
         chart: {
             type: 'column'
         },
         title: {
             text: 'Fruit Consumption'
         },
         xAxis: {
             categories: ['Apples', 'Bananas', 'Oranges']
         },
         yAxis: {
             title: {
                 text: '£ / Units'
             }
         },
         series: [{
             name: 'Pounds',
             data: [1, 0, 4]
         }, {
             name: 'Units',
             data: [5, 7, 3]
         }]
     });
}




module.exports = DailyChart;
