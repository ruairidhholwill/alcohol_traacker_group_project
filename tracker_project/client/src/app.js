const FormView = require('./views/form_view.js')
const Booze = require('./models/booze.js');


document.addEventListener('DOMContentLoaded', () => {
    console.log('JS loaded');

const boozeForm = document.querySelector('form#booze-form');
const boozeFormView = new FormView(boozeForm);
boozeFormView.bindEvents();



const url = 'http://localhost:3000/api/booze';
const booze = new Booze(url);

booze.bindEvents();
booze.getData()
})