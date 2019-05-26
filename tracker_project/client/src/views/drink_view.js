

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

    const deleteButton = this.createDeleteButton(drink._id)
    //console.log('id',drink._id )
    deleteButton.innerHTML = 'Delete me'
    drinkContainer.appendChild(deleteButton)



    this.container.appendChild(drinkContainer)
}

DrinkView.prototype.createHeading = function(textContent) {
    const heading = document.createElement('h1');
    heading.textContent = textContent;
    return heading;
}


DrinkView.prototype.createDeleteButton = function(drinkID){
    const button = document.createElement("button");
    button.classList.add('delete-btn')
   // console.log('drinkID', drinkID)
    button.value = drinkID;
    button.addEventListener('click', (event)=>{
        PubSub.publish('DrinkView:delete_clicked', button.value);
        console.log('DrinkView:delete_clicked:::', button.value);
        
    })
    return button;
}

module.exports = DrinkView;

