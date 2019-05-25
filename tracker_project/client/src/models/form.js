const Form = function (element) {
    this.element = element;
}

Form.prototype.bindEvents = function () {
    this.element.addEventListener('submit', (event) => {
        const selectedDrink = event.target.drink.value
        this.selectedDrinkSizeOutput(selectedDrink)
    })
}

Form.prototype.selectedDrinkSizeOutput = function (selectedDrink) {
    if (selectedDrink === 'beer') {
        const beerSizes = ['Half Pint', 'Pint', 'Bottle']
        return beerSizes;
    } else if (selectedDrink === 'wine') {
        const wineSizes = ['Small', 'Medium', 'Large']
        return wineSizes;
    } else if (selectedDrink === 'spirits') {
        const spiritSizes = ['Single', 'Double']
        return spiritSizes;
    }

}

module.exports = Form;

