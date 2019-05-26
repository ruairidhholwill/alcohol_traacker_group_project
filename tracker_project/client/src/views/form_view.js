
// this file publishing the form info from the users input.
//there will be listeners for the user input.



//Can we change the file name to booze_form_view???

const PubSub = require('../helpers/pub_sub.js');

const BoozeFormView = function (form) {
    this.form = form;
};

//This listens for the user to hit the sumbit button in the form_view. 
//The 'event' grabs the information and passes it 'handleSubmit'
BoozeFormView.prototype.bindEvents = function () {
    this.form.addEventListener('submit', (event) => {
       this.handleSubmit(event); // the event is the drink type and size in the form
    })
};

//This function creates a new instance of newBooze. It passes to 'createBooze' to set up the data 
//in the correct format with the correct ids.
//It then publishes the details on the channel 'BoozeFormView:booze-submitted' with the payload event.target.
BoozeFormView.prototype.handleSubmit = function (event) {
    event.preventDefault(); //method tells the user agent that if the event does not get explicitly handled, 
    //its default action should not be taken as it normally would be. The event continues to propagate as usual, 
    //unless one of its event listeners calls.
    //console.log('event:', event.target.size.value);
    const newBooze = this.createBooze(event.target);
    PubSub.publish('BoozeFormView:booze-submitted', newBooze)
    console.log('BoozeFormView:booze-submitted', newBooze)

    
    event.target.reset()// This resets the form fields to empty.
};



//This function is called by the 'handleSubmit' function above and formats the data as required by the database.

BoozeFormView.prototype.createBooze = function (form) {
    //console.log('form',form)
    const newBooze = {
        //form is taken from event.target. 'type' is from the HTML id and 'value' is the value that the user enters.
        drinkType: form.type.value,
        drinkSize: form.size.value
    
    }
    console.log('new booze', newBooze)
    return newBooze;
    
};


module.exports = BoozeFormView;