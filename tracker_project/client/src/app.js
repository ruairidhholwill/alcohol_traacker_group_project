const Form = require('./models/form.js')
const FormView = require('./views/form_view.js')
const Booze = require('./models/booze.js');
const DrinksListView = require('./views/drinks_list_view.js')

document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript Loaded')

    const formContainer = document.querySelector('#form-div');

    const drinkContainerSelect = document.querySelector('div#drink-type-selection')
    const form = new Form(drinkContainerSelect);
    form.bindEvents();

    const sizeContainer = document.querySelector('#size-selection')
    const formView = new FormView(formContainer, sizeContainer);
    formView.bindEvents();

    const drinksContainer = document.querySelector('div#list-div')
    const drinksListView = new DrinksListView(drinksContainer);
    drinksListView.bindEvents();

    const url = 'http://localhost:3000/api/booze';
    const booze = new Booze(url);

    booze.bindEvents();
    booze.getData()
})
