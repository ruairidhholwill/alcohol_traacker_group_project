const PubSub = require('../helpers/pub_sub.js')
const UnitHelper = require('../helpers/unit_helper.js')
const Form = require('../models/form.js')

 FormView = function (formContainer, sizeContainer) {
    this.formContainer = formContainer;
    this.sizeContainer = sizeContainer;
}

FormView.prototype.bindEvents = function () {
    // document.getElementById("wine").checked = true;
    this.renderDrinkSizeDefaults('beer');

    PubSub.subscribe('Form:drink-sizes-ready', (event) => {
        console.log('formView', event.detail)
        this.createSizeSelectors(event.detail);
    })

    this.formContainer.addEventListener('submit', (event) => {
      newDrink = this.createDrinkInfo(event.target);
      PubSub.publish('BoozeFormView:booze-submitted', newDrink);
      console.log(newDrink)
      event.target.reset()//empties the text fields.
      // const unit = new UnitHelper(newDrink.drinkType, newDrink.drinkSize);
      // console.log(unit.sizeToUnits())
    })

    PubSub.subscribe('Booze:found-drink-ready', (event) => {
      this.renderDrinkSizeDefaults(event.detail.drinkType)
      this.updateFormInputs(event.detail)
    })
}

FormView.prototype.renderDrinkSizeDefaults = function (drinkType) {
  const form = new Form();
  const sizeDefaults = form.selectedDrinkSizeOutput(drinkType)
  console.log(sizeDefaults)
  this.createSizeSelectors(sizeDefaults)
};

FormView.prototype.createSizeSelectors = function (sizes) {
    this.sizeContainer.innerHTML = '';
    sizes.forEach((size) => {
        const sizeSelect = document.createElement('input');
        sizeSelect.type = 'radio';
        sizeSelect.name = 'size';
        sizeSelect.id = size.toLowerCase();
        sizeSelect.value = size.toLowerCase();
        this.sizeContainer.appendChild(sizeSelect)
        console.log(sizeSelect.value)
    })
}

FormView.prototype.updateFormInputs = function (drink) {
  document.getElementById(drink.drinkType).checked = true;
  document.getElementById(drink.drinkSize).checked = true;
  document.getElementById('pounds').value = Math.floor(drink.price);
  document.getElementById('pence').value = drink.price.toString().slice(-2)

};

FormView.prototype.createDrinkInfo = function (form) {
  if (form.pence.value.length === 1) {
    form.pence.value = '0' + form.pence.value;
  }
  const price = `${form.pounds.value}.${form.pence.value}`

  let drinkUnits = new UnitHelper(form.drink.value, form.size.value);
  drinkUnits = drinkUnits.sizeToUnits();

  const newDrink = {
    drinkType: form.drink.value,
    drinkSize: form.size.value,
    drinkUnits: drinkUnits,
    price: parseFloat(price)
  }
  
  return newDrink;
};

module.exports = FormView;
