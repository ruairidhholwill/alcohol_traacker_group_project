const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js')
const FormView = require('../views/form_view.js')

const Results = function () {
    this.savingGoal = 0
}

Results.prototype.bindEvents = function () {
    PubSub.subscribe('Settings:data-loaded', (event) => {
        this.displaySavingGoal(event.detail);
      })

    PubSub.subscribe('Booze:data-loaded', (event) => {
        this.calcTotalSpent(event.detail)
    })

    PubSub.subscribe('Booze:data-loaded', (event) => {
        this.calculateSavingsOverOrUnder(event.detail)
    })
}

Results.prototype.displaySavingGoal = function (data) {
    const recentData = data.pop()
    console.log(recentData)
    this.savingGoal = recentData.saveAmount
    PubSub.publish('Results:saving-goal', this.savingGoal)
}

Results.prototype.calcTotalSpent = function (data) {
    let total = 0  
    const drinks = data
    const drinkSum = drinks.forEach((drink) =>{
        total += drink.price;
      })
      PubSub.publish('Results:total-spent-calculated', total)
      return total
  };

Results.prototype.calculateSavingsOverOrUnder = function (data) {
    const amountSpent = this.calcTotalSpent(data)
    const calcSavingsProgress = this.savingGoal - amountSpent
    PubSub.publish('Results:savings-progress', calcSavingsProgress)
    return calcSavingsProgress
}

module.exports = Results;