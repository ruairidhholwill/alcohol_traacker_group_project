const Form = require('./models/form.js')

document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript Loaded')
    const formElement = document.querySelector('#form-div')
    formElement.addEventListener('submit', (event) => {
        event.preventDefault()
        console.log(event.target.drink)
    })

    const form = new Form(formElement);
    form.bindEvents();
})