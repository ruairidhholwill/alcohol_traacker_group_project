const Form = require('./models/form.js')
const FormView = require('./views/form_view.js')

document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript Loaded')

    const formContainer = document.querySelector('#form-div')
    formContainer.addEventListener('submit', (event) => {
        event.preventDefault()
        console.log(event.target.drink)
    })

    const drinkContainerSelect = document.querySelector('div#drink-type-selection')
    const form = new Form(drinkContainerSelect);
    form.bindEvents();

    const sizeContainer = document.querySelector('#size-selection')
    const formView = new FormView(formContainer, sizeContainer);
    formView.bindEvents();
})
