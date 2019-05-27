const PubSub = require('../helpers/pub_sub.js')

const Form = function (container) {
    this.container = container;
}

Form.prototype.bindEvents = function () {

    this.container.addEventListener('click', (event) => {
        console.log(event.target.value);
        const selectedDrink = event.target.value
        const drinkSizesOutput = this.selectedDrinkSizeOutput(selectedDrink);
        PubSub.publish('Form:drink-sizes-ready', drinkSizesOutput);
    })
}

Form.prototype.selectedDrinkSizeOutput = function (selectedDrink) {
    if (selectedDrink === 'beer') {
        const beerSizes = ['half pint', 'pint', 'bottle']
        return beerSizes;
    } else if (selectedDrink === 'wine') {
        const wineSizes = ['small', 'medium', 'large']
        return wineSizes;
    } else if (selectedDrink === 'spirits') {
        const spiritSizes = ['single', 'double']
        return spiritSizes;
    }
}

module.exports = Form;
