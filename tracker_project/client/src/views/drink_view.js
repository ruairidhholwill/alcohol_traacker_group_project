

//This will render the individual drink details. This will be nested within the list_view.

const PubSub = require('../helpers/pub_sub.js');

const DrinkView = function(container){
this.container = container;
};

DrinkView.prototype.render = function(drink){

    const drinkContainer = document.createElement('div')
    drinkContainer.id = 'drink';

    const drinks = this.createHeading(drink.drinkType)
    drinkContainer.appendChild(drinks);

    const size = this.createHeading(drink.drinkSize)
    drinkContainer.appendChild(size);

    const date = this.createHeading(drink.date)
    drinkContainer.appendChild(date);

    const units = this.createHeading(drink.drinkUnits)
    drinkContainer.appendChild(units);

    const price = this.createHeading(drink.price)
    drinkContainer.appendChild(price);



    this.container.appendChild(drinkContainer)
}

DrinkView.prototype.createHeading = function(textContent) {
    const heading = document.createElement('h1');
    heading.textContent = textContent;
    return heading;
}

module.exports = DrinkView;