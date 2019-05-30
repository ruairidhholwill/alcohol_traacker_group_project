const PubSub = require('../helpers/pub_sub.js');
const DrinkView = require('../views/drink_view.js');

const DrinksListView = function (container) {
  this.container = container;
};

DrinksListView.prototype.bindEvents = function(){
  PubSub.subscribe('Booze:data-loaded', (event)=>{
    this.render(event.detail)
  })
  this.toggleListChart();
}

DrinksListView.prototype.toggleListChart = function () {
  const checkboxElement = document.getElementById("list-chart-toggle")
  checkboxElement.addEventListener('click', () => {
    console.log(checkboxElement.checked)
    if (checkboxElement.checked === true) {
      document.getElementById('list-view').style.display = 'none';
      document.getElementById('chart-view').style.display = 'block';
      PubSub.publish('DrinksListView:toggle-check');
    }else {
      document.getElementById('list-view').style.display = 'flex';
      document.getElementById('chart-view').style.display = 'none';
    }
  })
};

DrinksListView.prototype.render = function(drinks){
  this.container.innerHTML = '';
  const drinkView = new DrinkView(this.container);
  drinks.forEach((drink) => drinkView.render(drink));
};

module.exports = DrinksListView;
