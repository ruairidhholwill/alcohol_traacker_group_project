

//This will render the individual drink details. This will be nested within the list_view.

const PubSub = require('../helpers/pub_sub.js');

const DrinkView = function(container){
this.container = container;
};




DrinkView.prototype.render = function(drinkInfo){


    const drinkContainer = document.createElement('tr')
    drinkContainer.id = 'drink';


    const drink = this.createTableData(drinkInfo.drinkType)
    drinkContainer.appendChild(drink);

    const size = this.createTableData(drinkInfo.drinkSize)
    drinkContainer.appendChild(size);

    // const date = this.createHeading(drink.date)
    // drinkContainer.appendChild(date);

    // const units = this.createHeading(drink.drinkUnits)
    // drinkContainer.appendChild(units);

    const price = this.createTableData(drinkInfo.price)
    drinkContainer.appendChild(price);

    // const deleteButton = this.createDeleteButton(drink._id)
    // //console.log('id',drink._id )
    // deleteButton.innerHTML = 'Delete me'
    // drinkContainer.appendChild(deleteButton)
    //
    // const updateButton = this.createUpdateButton(drink._id)
    // updateButton.innerHTML = 'Update me'
    // drinkContainer.appendChild(updateButton)


    this.container.appendChild(drinkContainer)
}

DrinkView.prototype.createTableData = function(textContent) {
    const data = document.createElement('td');
    data.textContent = textContent;
    return data;
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

DrinkView.prototype.createUpdateButton = function (drinkID) {
  const button = document.createElement('button');
  button.classList.add('update-btn');
  button.value = drinkID;
  button.addEventListener('click', (event) => {
    PubSub.publish('DrinkView:update_clicked', button.value);
    console.log(button.value)
  })
  return button;
};

module.exports = DrinkView;
