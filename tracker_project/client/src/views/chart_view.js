//here we will display all the details in graphics.
const PubSub = require('../helpers/pub_sub.js')
const RequestHelper = require('../helpers/request_helper.js')

const ChartView = function(container, data){
    this.container = container 
    this.goal = 0
    this.calcSpend = 0
    this.currentSpend = 0
    this.graphTotalMinusGoal = 0
    this.titleGoal = goal
    this.overage = 0
    this.reduceGoal = 0
}



ChartView.prototype.bindEvents = function(){

    PubSub.subscribe('Results:saving-goal', (event)=>{
        this.goal = event.detail
        //console.log('xxthis.goal', event.detail)
    })

    PubSub.subscribe('Results:current-spend-amount', (event)=>{
    //console.log('Results:current-spend-amount', event.detail)
    this.currentSpend = event.detail
    })

    PubSub.subscribe('Results:total-spent-calculated', (event)=>{
        //console.log('Results:total-spent-calculated', event.detail)
        this.calcSpend = event.detail
        //console.log('this.calc', this.calcSpend)
        this.render(this.calcSpend, this.goal, this.currentSpend)
    })
}


////////CIRCULAR CHART/////////////////////////////////////////////////////////////

// ChartView.prototype.graphNumberNonLogic = function(data, goal, spend){
//     console.log('xxxxxxxxxxxx', goal)
//    console.log('yyyyyyyyyyyy', data)
//    console.log('zzzzzzzzzzzz', spend)
//   this.graphTotalMinusGoal = spend - goal
//   console.log('graphTotalMinusGoal', this.graphTotalMinusGoal)
//   console.log('spend', spend)
//   console.log('data', data)

//   if ( this.graphTotalMinusGoal - data <= 0) {
//       console.log('spend-data', this.graphTotalMinusGoal - data)
//       this.overage = this.graphTotalMinusGoal  - data
//       console.log('overage', this.overage)

//       this.reduceGoal = (parseFloat(goal) + parseFloat(this.overage));
//       console.log('reduceGoal', this.reduceGoal)
//       goal = this.reduceGoal
//       console.log('goal after reduceGoal', this.reduceGoal)
//       data = (parseFloat(data) + parseFloat(this.overage))
//       console.log('data after reduce', data)
      
//     }
// }

ChartView.prototype.render = function (data, goal, spend) {

    // console.log('xxxxxxxxxxxx', goal)
    // console.log('yyyyyyyyyyyy', data)
    // console.log('zzzzzzzzzzzz', spend)

   
    this.graphTotalMinusGoal = spend - goal
    // console.log('graphTotalMinusGoal', this.graphTotalMinusGoal)
    // console.log('spend', spend)
    // console.log('data', data)
    if ( this.graphTotalMinusGoal - data <= 0) {
        //console.log('spend-data', this.graphTotalMinusGoal - data)
        this.overage = this.graphTotalMinusGoal  - data
        //console.log('overage', this.overage)
        this.reduceGoal = (parseFloat(goal) + parseFloat(this.overage));
        goal = this.reduceGoal
        data = (parseFloat(data) + parseFloat(this.overage))
        //console.log('reduceGoal', this.reduceGoal)
      }
    //this.graphNumberNonLogic(data, goal, spend);

    var chart = new CanvasJS.Chart("chartContainer", {

        animationEnabled: true,
        title: {
            text: "Money Tracker"  
                    
        },
        data: [{
            type: "pie",
            startAngle: 180,
            yValueFormatString: "\"£\"##0.00",
            indexLabel: "{label} {y}",
            

            dataPoints: [
                {y: `${this.overage}`, label:"Eating into planned savings", color: "red"},
                {y: `${goal}`, label: "Planned savings", color: "green"},
               
                {y: `${data}`, label: "Current spend", color: "blue"},
                {y: ( `${this.graphTotalMinusGoal}`- `${data}`), label: "Remaining to spend"}

            ]
        }]
    });
    chart.render();

    }

    

    module.exports = ChartView