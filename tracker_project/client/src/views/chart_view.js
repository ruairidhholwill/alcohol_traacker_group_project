const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const ChartView = function(container, data){
  this.container = container
  this.goal = 0
  this.calcSpend = 0
  this.currentSpend = 0
  this.graphTotalMinusGoal = 0
  this.overage = 0
  this.reduceGoal = 0
};

ChartView.prototype.bindEvents = function () {

  PubSub.subscribe('Results:saving-goal', (event) => {
    this.goal = event.detail
  })

  PubSub.subscribe('Results:current-spend-amount', (event) => {
    this.currentSpend = event.detail
  })

  PubSub.subscribe('Results:total-spent-calculated', (event) => {
    this.calcSpend = event.detail
    this.render(this.calcSpend, this.goal, this.currentSpend)
  })
};

////////CIRCULAR CHART/////////////////////////////////////////////////////////////

ChartView.prototype.graphNumberNonLogic = function(data, goal, spend){

  this.graphTotalMinusGoal = spend - goal

  if ( this.graphTotalMinusGoal - data <= 0) {

    this.overage = this.graphTotalMinusGoal  - data
    this.reduceGoal = (parseFloat(goal) + parseFloat(this.overage));
    data = (parseFloat(data) + parseFloat(this.overage))
    goal = this.reduceGoal
  }
  return {"goal": goal, "data": data}; //this has been made into an object as it is returning
  //more than one item. We make this function equal to 'const formattedNumbers' where it
  //is being called and the object keys can then be called.
  //This works because when the if statement is not actioned the it just returns the
  //original data in the object.
  //
};

ChartView.prototype.render = function (data, goal, spend) {

  const formattedNumbers = this.graphNumberNonLogic(data, goal, spend);

  var chart = new CanvasJS.Chart("chartContainer", {

    animationEnabled: true,
    title: {
      text: "Money Tracker"

    },
    data: [{
      type: "pie",
      startAngle: -72,
      yValueFormatString: "\"£\"##0.00",
      indexLabel: "{label} {y}",
      dataPoints: [
        {y: `${this.overage}`, label:"Eating into planned savings", color: "red"},
        {y: `${formattedNumbers.goal}`, label: "Planned savings", color: "green"},

        {y: `${formattedNumbers.data}`, label: "Current spend", color: "blue"},
        {y: ( `${this.graphTotalMinusGoal}`- `${formattedNumbers.data}`), label: "Remaining to spend"}
      ]
    }]
  });
  chart.render();
};

module.exports = ChartView;
