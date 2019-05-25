const PubSub = require('../helpers/pub_sub.js')
const UnitHelper = require('../helpers/unit_helper.js')

 FormView = function (formContainer, sizeContainer) {
    this.formContainer = formContainer;
    this.sizeContainer = sizeContainer;
}

FormView.prototype.bindEvents = function () {
    PubSub.subscribe('Form:drink-sizes-ready', (event) => {
        console.log('formView', event.detail)
        this.createSizeSelectors(event.detail);
    })

    this.formContainer.addEventListener('submit', (event) => {
      newDrink = this.createDrinkInfo(event.target);
      console.log(newDrink)
      // const unit = new UnitHelper(newDrink.drinkType, newDrink.drinkSize);
      // console.log(unit.sizeToUnits())
    })
}

FormView.prototype.createSizeSelectors = function (sizes) {
    this.sizeContainer.innerHTML = '';
    sizes.forEach((size) => {
        const sizeSelect = document.createElement('input');
        sizeSelect.type = 'radio';
        sizeSelect.name = 'size';
        sizeSelect.value = size;
        this.sizeContainer.appendChild(sizeSelect)
        console.log(sizeSelect.value)
    })
}

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
    price: price
  }

  return newDrink;
};

module.exports = FormView;
