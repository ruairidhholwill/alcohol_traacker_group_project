const PubSub = require('../helpers/pub_sub.js')

const FormView = function (container) {
    this.container = container;
}

FormView.prototype.bindEvents = function () {
    PubSub.subscribe('Form:drink-sizes-ready', (event) => {
        console.log('formView', event.detail)
        this.createSizeSelectors(event.detail);
    })
}

FormView.prototype.createSizeSelectors = function (sizes) {
    this.container.innerHTML = '';
    sizes.forEach((size) => {
        const sizeSelect = document.createElement('input');
        sizeSelect.type = 'radio';
        sizeSelect.name = 'size';
        sizeSelect.value = size;
        this.container.appendChild(sizeSelect)
        console.log(sizeSelect.value)
    })
}

module.exports = FormView;