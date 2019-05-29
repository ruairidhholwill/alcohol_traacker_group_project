const PubSub = require('../helpers/pub_sub.js');

const DrinkView = function (container) {
  this.container = container;
};

DrinkView.prototype.render = function (drinkInfo) {

  const drinkContainer = document.createElement('tr')
  drinkContainer.id = 'drink';

  const drink = this.createTableData(drinkInfo.drinkType)
  drinkContainer.appendChild(drink);

  const size = this.createTableData(drinkInfo.drinkSize)
  drinkContainer.appendChild(size);

  const price = this.createTableDataPrice(drinkInfo.price)
  drinkContainer.appendChild(price);

  const deleteButton = this.createDeleteButton(drinkInfo._id)
  deleteButton.innerHTML = 'delete'
  drinkContainer.appendChild(deleteButton);

  const updateButton = this.createUpdateButton(drinkInfo._id)
  updateButton.innerHTML = 'Update'
  drinkContainer.appendChild(updateButton)

  this.container.appendChild(drinkContainer)
};

DrinkView.prototype.createTableData = function(textContent) {
  const data = document.createElement('td');
  data.textContent = textContent.charAt(0).toUpperCase() + textContent.slice(1);
  return data;
};

DrinkView.prototype.createTableDataPrice = function(textContent) {
  const data = document.createElement('td');
  data.textContent = `£ ${textContent}`;
  return data;
};

DrinkView.prototype.createDeleteButton = function(drinkID){
  const button = document.createElement("button");
  button.classList.add('delete-btn')
  button.value = drinkID;
  button.addEventListener('click', (event) => {
    PubSub.publish('DrinkView:delete_clicked', button.value);
  })
  return button;
};

DrinkView.prototype.createUpdateButton = function (drinkID) {
  const button = document.createElement('button');
  button.classList.add('update-btn');
  button.value = drinkID;
  button.addEventListener('click', (event) => {
    PubSub.publish('DrinkView:update_clicked', button.value);
  })
  return button;
};

module.exports = DrinkView;
