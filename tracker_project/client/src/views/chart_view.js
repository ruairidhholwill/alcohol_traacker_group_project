//here we will display all the details in graphics.
const PubSub = require('../helpers/pub_sub.js')
const RequestHelper = require('../helpers/request_helper.js')

const ChartView = function(container, data){
    this.container = container
    //this.data = data  
    this.goal = 0
    this.calcSpend = 0
}



ChartView.prototype.bindEvents = function(){

    PubSub.subscribe('Results:saving-goal', (event)=>{
        this.goal = event.detail
        console.log('xxthis.goal', event.detail)
        
       // window.onload(this.calcSpend)
    })

    PubSub.subscribe('Results:total-spent-calculated', (event)=>{
        console.log('Results:total-spent-calculated', event.detail)
        //this.chartRender(event.detail)
        this.calcSpend = event.detail
        console.log('this.calc', this.calcSpend)
        //this.chartCap(this.calcSpend, this.goal)
        this.render(this.calcSpend, this.goal)
        
    })
    
	
}

ChartView.prototype.chartCap = function(data, goal){
    result = (goal - data);
    console.log('chartCap', result)

    If (result <= 0)
        console.log( 'over budget')
    


}

////////CIRCULAR CHART/////////////////////////////////////////////////////////////

ChartView.prototype.render = function (data, goal) {

    console.log('xxxxxxxxxxxx', goal)
    console.log('yyyyyyyyyyyy', data)
    

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: "Money"
        },
        data: [{
            type: "pie",
            startAngle: 270,
            //yValueFormatString: "##0.00\"£\"",
            yValueFormatString: "\"£\"##0.00",
            indexLabel: "{label} {y}",
            dataPoints: [
                {y: `${data}`, label: "Spent"},
                {y: `${goal}`, label: "Saving - fixed figure"},
                {y: (`${goal}` - `${data}`),  color: "red"}
                
               
            ]
        }]
    });
    chart.render();

    // var visitorsData = {
    //     "Tracker": [{
    //         click: visitorsChartDrilldownHandler,
    //         cursor: "pointer",
    //         explodeOnClick: false,
    //         innerRadius: "75%",
    //         legendMarkerType: "square",
    //         name: "Tracker",
    //         radius: "100%",
    //         showInLegend: true,
    //         startAngle: 90,
    //         type: "pie",
    //         dataPoints: [
    //             //{ y: 1, name: "visitorsData", color: "black" },
    //            { y: 45, label: "Over budget", color: "red"  },
              
    //            { y: `${data}`, name: "Money Spent", color: "#E7823A" },
    //            { y: (goal - `${data}`), name: "Money remaining of budget", color: "#546BC1" }
    //         ]
    //     }],
       
    // };
    
    // var newVSReturningVisitorsOptions = {
    //     animationEnabled: true,
    //     theme: "light2",
    //     title: {
    //         text: "Money savings indicator"
    //     },
        
    //     legend: {
    //         fontFamily: "calibri",
    //         fontSize: 14,
    //         itemTextFormatter: function (e) {
    //             console.log('ye',e.dataPoint.y)
                
    //             return e.dataPoint.name + ": " + (e.dataPoint.y / goal * 100).toFixed(2) + "%";  
    //         }
    //     },
    //     data: []
    // };
    
 
    // var chart = new CanvasJS.Chart("chartContainer", newVSReturningVisitorsOptions);
    // chart.options.data = visitorsData["Tracker"];
    // //console.log('asd', chart.options.data)
    // chart.render();
    
    // function visitorsChartDrilldownHandler(e) {
    //     chart = new CanvasJS.Chart("chartContainer", visitorsDrilldownedChartOptions);
    //     chart.options.data = visitorsData[e.dataPoint.name];

    //     chart.options.title = { text: e.dataPoint.name }
    //     chart.render();
    //    // $("#backButton").toggleClass("invisible");
    // }
    
    
    }



    module.exports = ChartView