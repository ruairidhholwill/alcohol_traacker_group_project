const PubSub = require('../helpers/pub_sub.js')

const ResultsView = function(container ) {
    this.container = container;
  }


ResultsView.prototype.bindEvents = function () {
    PubSub.subscribe('Booze:saving-goal', (event) => {
      this.createGoalView(event.detail)
    })

    PubSub.subscribe('Booze:total-spent-calculated', (event) => {
      this.createSpentView(event.detail)
    })

    PubSub.subscribe('Booze:savings-progress', (event) => {
      this.createOverUnderView(event.detail)
    })
  }

ResultsView.prototype.createGoalView = function(event) {
    const goalAmount = document.querySelector('#goal');
    goalAmount.textContent = `Goal: £${event}`  
}

ResultsView.prototype.createSpentView = function(event) {
    const spentAmount = document.querySelector('#total-spent');
    spentAmount.textContent = `Spent: £${event}`  
}

ResultsView.prototype.createOverUnderView = function(event) {
    const OverUnderAmount = document.querySelector('#over-under');
    OverUnderAmount.textContent = `Budget Left: £${event}`
    }  

  module.exports = ResultsView;