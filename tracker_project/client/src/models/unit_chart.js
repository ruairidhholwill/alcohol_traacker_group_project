PubSub = require('../helpers/pub_sub');

const UnitChart = function(container){
  this.container = container;
  this.units = 0
  this.colour = "yellow"
  this.statement = "The NHS recommend the max alcohol unit consumption(student exemptions apply) as"
};

UnitChart.prototype.bindEvents = function(){
  PubSub.subscribe('Results:total-units-calculated', (event)=>{
    units = event.detail
    this.render(units);
  })
};

UnitChart.prototype.changeSegmentColour = function(){
  if (units <= 15){
    this.colour = "green"
  }
  else if(units > 15 && units < 35){
    this.colour = "orange"
  }
  else if(units > 35 && units < 56){
    this.colour = "red"
  }
};

UnitChart.prototype.render = function(units){

  this.changeSegmentColour();

  var chart = new CanvasJS.Chart("unitChartContainer", {

    animationEnabled: true,
    title: {
      text: "Alcohol Unit Tracker"

    },
    data: [{
      type: "pie",
      startAngle: -90,
      indexLabel: "{label} {y}",


      dataPoints: [
        {label:"Consumed alcohol units", y: `${units}`,  color: `${this.colour}`},
        {y:56, label:`${this.statement}`,   color: "beige"}

      ]
    }]
  });
  chart.render()

};

module.exports = UnitChart;
