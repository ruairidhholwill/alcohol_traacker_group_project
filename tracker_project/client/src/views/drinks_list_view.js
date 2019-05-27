
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
  const checkboxElement = document.getElementById("list-chart-toggle")
  checkboxElement.addEventListener('click', () => {
    console.log(checkboxElement.checked)
    if (checkboxElement.checked === true) {
      this.container.innerHTML = ''
      const hello = document.createElement('h1');
      hello.textContent = 'HELLO!'
      this.container.appendChild(hello)
    }else {
      this.container.innerHTML = ''
      PubSub.subscribe('Booze:data-loaded', (event)=>{
          //console.log('subscibed to:', event);
          this.render(event.detail)
      })
    }
  })
}

DrinksListView.prototype.render = function(drinks){
    //WARNING WARNING -
    //IF YOU LEAVE OUT THE FOLLOWING LINE OF CODE THEN YOU WILL WASTE LOADS OF TIME
    //CHASING YOUR ARSE AS IT LOOKS LIKE THE DATA ON THE SCREEN IS NOT REDUCING WHEN YOU
    //HIT DELETE. IN FACT IT IS REDUCING BUT WHEN THE DATA RE-RENDERS ON THE SCREEN
    //IT DOES NOT DELETE THE PREVIOUS DATA, IT JUST APPENDS IT AFTER THE PREVIOUS DATA

    this.container.innerHTML = '';
    const drinkView = new DrinkView(this.container);
    drinks.forEach((drink) => drinkView.render(drink));
    // console.log('d', drink.drinkType)

}


module.exports = DrinksListView;
