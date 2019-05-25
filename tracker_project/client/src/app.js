const FormView = require('./views/form_view.js')
const Booze = require('./models/booze.js');
const DrinksListView = require('./views/drinks_list_view.js')


document.addEventListener('DOMContentLoaded', () => {
    console.log('JS loaded');

const boozeForm = document.querySelector('form#booze-form');
const boozeFormView = new FormView(boozeForm);
boozeFormView.bindEvents();

const drinksContainer = document.querySelector('div#listView')
const drinksListView = new DrinksListView(drinksContainer);
drinksListView.bindEvents();

const url = 'http://localhost:3000/api/booze';
const booze = new Booze(url);

booze.bindEvents();
booze.getData()

})