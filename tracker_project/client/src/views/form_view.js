const PubSub = require('../helpers/pub_sub.js')
const UnitHelper = require('../helpers/unit_helper.js')
const Form = require('../models/form.js')


 FormView = function (formContainer, sizeContainer) {
    this.formContainer = formContainer;
    this.sizeContainer = sizeContainer;
    this.updateMode = false;
    this.drinkUpdateID = ""
}

FormView.prototype.bindEvents = function () {
    // document.getElementById("wine").checked = true;
    this.renderDrinkSizeDefaults('beer');
    // console.log(this.updateMode)

    PubSub.subscribe('Form:drink-sizes-ready', (event) => {
        // console.log('formView', event.detail)
        this.createSizeSelectors(event.detail);
    })

    this.formContainer.addEventListener('submit', (event) => {
      event.preventDefault();
      if (this.updateMode) {
        const updatedDrinkBody = this.createDrinkInfo(event.target);
        // console.log(updatedDrink)
        const updatedDrink = {id: this.drinkUpdateID, body: updatedDrinkBody}
        PubSub.publish('FormView:update-submitted', updatedDrink);
        this.resetNumberInputs();
        this.updateMode = false;
      } else {
        newDrink = this.createDrinkInfo(event.target);
        PubSub.publish('BoozeFormView:booze-submitted', newDrink);
        event.target.reset()//empties the text fields.
        // const unit = new UnitHelper(newDrink.drinkType, newDrink.drinkSize);
        // console.log(unit.sizeToUnits())
        this.renderDrinkSizeDefaults('beer')
      }


    })

    PubSub.subscribe('Booze:found-drink-ready', (event) => {
      this.renderDrinkSizeDefaults(event.detail.drinkType)
      this.updateFormInputs(event.detail)
      this.updateMode = true;
      this.drinkUpdateID = event.detail._id;
      // console.log(this.updateMode)
      // console.log(this.drinkUpdateID)
    })

}

FormView.prototype.renderDrinkSizeDefaults = function (drinkType) {
  const form = new Form();
  const sizeDefaults = form.selectedDrinkSizeOutput(drinkType)
  // console.log(sizeDefaults)
  this.createSizeSelectors(sizeDefaults)
};

FormView.prototype.createSizeSelectors = function (sizes) {
    this.sizeContainer.innerHTML = '';
    sizes.forEach((size) => {
        const sizeLabel = document.createElement('label');
        sizeLabel.innerHTML = size.charAt(0).toUpperCase() + size.slice(1);
        sizeLabel.htmlFor = size;
        sizeLabel.className = 'form-label';
        const sizeSelect = document.createElement('input');
        sizeSelect.required = true;
        sizeSelect.checked = true;
        sizeSelect.type = 'radio';
        sizeSelect.name = 'size';
        sizeSelect.id = size;
        sizeSelect.value = size;

        this.sizeContainer.appendChild(sizeSelect)
        this.sizeContainer.appendChild(sizeLabel)

    })
}

FormView.prototype.updateFormInputs = function (drink) {
  document.getElementById(drink.drinkType).checked = true;
  document.getElementById(drink.drinkSize).checked = true;
  document.getElementById('pounds').value = Math.floor(drink.price);
  document.getElementById('pence').value = drink.price.toString().slice(-2)
};

FormView.prototype.resetNumberInputs = function () {
  document.getElementById('pounds').value = '0';
  document.getElementById('pence').value = '00';
};

FormView.prototype.createDrinkInfo = function (form) {
  if (form.pence.value.length === 1) {
    form.pence.value = '0' + form.pence.value;
  }

  const priceString = `${form.pounds.value}.${form.pence.value}`
  const priceNum = parseFloat(priceString)

  let drinkUnits = new UnitHelper(form.drink.value, form.size.value);
  // console.log('x', drinkUnits)
  drinkUnits = drinkUnits.sizeToUnits();
  // console.log('y', drinkUnits)


  const newDrink = {
    drinkType: form.drink.value,
    drinkSize: form.size.value,
    drinkUnits: drinkUnits,
    price: priceNum.toFixed(2)
  }
  console.log('PARSE', typeof newDrink.price)
  return newDrink;
};

module.exports = FormView;
