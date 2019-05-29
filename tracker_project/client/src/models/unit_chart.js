PubSub = require('../helpers/pub_sub');

const UnitChart = function(){

    this.units = 0
}

UnitChart.prototype.bindEvents() = function(){
    PubSub.subscribe('Results:totalUnitsCalculator', (event)=>{
        console.log(event.details)
    })
}