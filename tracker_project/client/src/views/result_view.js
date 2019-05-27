const PubSub = require('../helpers/pub_sub.js')

const ResultsView = function(container ) {
    this.container = container;
  }

  ResultsView.prototype.bindEvents = function () {
      PubSub.subscribe('Booze:saving-goal', (event) => {
          // create saving goal view
      })

      PubSub.subscribe('Booze:total-spent-calculated', (event) => {
        // create saving goal view
      })

      PubSub.subscribe('Booze:savings-progress', (event) => {
        // create saving goal view
      })
  }

  

  module.exports = ResultsView;