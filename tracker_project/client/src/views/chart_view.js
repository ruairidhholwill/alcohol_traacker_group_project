//here we will display all the details in graphics.
const PubSub = require('../helpers/pub_sub.js')
const RequestHelper = require('../helpers/request_helper.js')

const ChartView = function(container, data){
    this.container = container
    this.data = data  
}



ChartView.prototype.bindEvents = function(){
    PubSub.subscribe('Booze:data-loaded', (event)=>{
        console.log('chart', event.detail)
        this.chartRender(event.detail)
        window.onload(event.detail)
    })
}

ChartView.prototype.chartRender = function(drink){
    //this.container.innerHTML = ""
    console.log('charterRender chartView', drink[0].drinkUnits)
    this.data = drink
    const chartData = new ChartView(this.container);
    window.onload(drink)
}


////////CIRCULAR CHART/////////////////////////////////////////////////////////////

window.onload = function (data) {


    console.log('xxevent detail chartView', data[0].drinkUnits)


    var totalVisitors = 12;
    var visitorsData = {
        "Tracker": [{
            click: visitorsChartDrilldownHandler,
            cursor: "pointer",
            explodeOnClick: false,
            innerRadius: "75%",
            legendMarkerType: "square",
            name: "Tracker",
            radius: "100%",
            showInLegend: true,
            startAngle: 90,
            type: "doughnut",
            dataPoints: [
                { y: `${data[0].price}`, name: "Money Spent", color: "#E7823A" },
                { y: (12 - `${data[0].price}`), name: "Money remaining of target goal", color: "#546BC1" }
            ]
        }],
       
    };
    
    var newVSReturningVisitorsOptions = {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Money savings indicator"
        
        },
        
        legend: {
            fontFamily: "calibri",
            fontSize: 14,
            itemTextFormatter: function (e) {
                console.log('ye',e.dataPoint.y)
return e.dataPoint.name + ": " + (e.dataPoint.y / totalVisitors * 100).toFixed(2) + "%";  
                
            }
        },
        data: []
    };
    
 
    var chart = new CanvasJS.Chart("chartContainer", newVSReturningVisitorsOptions);
    chart.options.data = visitorsData["Tracker"];
    //console.log('asd', chart.options.data)
    chart.render();
    
    function visitorsChartDrilldownHandler(e) {
        chart = new CanvasJS.Chart("chartContainer", visitorsDrilldownedChartOptions);
        chart.options.data = visitorsData[e.dataPoint.name];

        chart.options.title = { text: e.dataPoint.name }
        chart.render();
       // $("#backButton").toggleClass("invisible");
    }
    
    // $("#backButton").click(function() { 
    //     $(this).toggleClass("invisible");
    //     chart = new CanvasJS.Chart("chartContainer", newVSReturningVisitorsOptions);
    //     chart.options.data = visitorsData["New vs Returning Visitors"];
    //     chart.render();
    // });
    
    }




    ////////////BAR CHART///////////////////////


    module.exports = ChartView