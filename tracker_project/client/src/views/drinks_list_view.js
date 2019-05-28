
//this will render the details the user has inputed.
// this will subscribe from model folder(probably booze)

//db - model - drinks_list_view using express.

//also publishing button events -
    //delete
    //update

//const Booze = require('../models/booze.js')
const PubSub = require('../helpers/pub_sub.js');
const DrinkView = require('../views/drink_view.js');


const DrinksListView = function(container){
  this.container = container;
}

DrinksListView.prototype.bindEvents = function(){
  PubSub.subscribe('Booze:data-loaded', (event)=>{
      //console.log('subscibed to:', event);
      this.render(event.detail)
  })

  // PLACEHOLDER FOR CHARTS
  // const hello = document.createElement('h1');
  // hello.textContent = "HELLO"
  // document.getElementById('chart-view').appendChild(hello)
  // document.getElementById('chart-view').style.display = 'none';

  this.toggleListChart();

}

DrinksListView.prototype.toggleListChart = function () {
  const checkboxElement = document.getElementById("list-chart-toggle")
  checkboxElement.addEventListener('click', () => {
    console.log(checkboxElement.checked)
    if (checkboxElement.checked === true) {
      document.getElementById('list-view').style.display = 'none';
      document.getElementById('chart-view').style.display = 'block';
    }else {
      document.getElementById('list-view').style.display = 'block';
      document.getElementById('chart-view').style.display = 'none';
    }
  })
};

DrinksListView.prototype.render = function(drinks){
    this.container.innerHTML = '';
    const drinkView = new DrinkView(this.container);
    drinks.forEach((drink) => drinkView.render(drink));
    // console.log('d', drink.drinkType)

}


module.exports = DrinksListView;
