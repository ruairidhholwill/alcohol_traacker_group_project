

// This will have request_helper required in
// This file connects with the db using express.

// get data function
    //returns data to the view.

//listening for form submit
    //then post function to the db
    //then delete function to the db
    //then update function to the db
    const RequestHelper = require('../helpers/request_helper.js');
    const PubSub = require('../helpers/pub_sub.js')
    const Settings = require('./settings.js')
    
    const Booze = function (url) {
        this.url = url;
        this.request = new RequestHelper(this.url)
        this.allData = []
        this.savingGoal = 0
    };
    
    
    //If you have more than one bindevents the second one will be ignored.
    
    Booze.prototype.bindEvents = function() {
    
        PubSub.subscribe('BoozeFormView:booze-submitted', (event) => {
            console.log('event', event)
            this.postBooze(event.detail)
            console.log('post booze Subscribed to:', event.detail);
        })
    
        PubSub.subscribe('DrinkView:delete_clicked', (event) =>{
            this.deleteBooze(event.detail)
            console.log('this.delete:::',event.detail)
        })

        PubSub.subscribe('Settings:data-loaded', (event) => {
            this.displaySavingGoal(event.detail)
        })
    };
    
    
    
    Booze.prototype.getData = function(){
        this.request.get()
            .then((boozeDetails) =>{
                PubSub.publish('Booze:data-loaded', boozeDetails)
                console.log('published to :', boozeDetails)
                this.allData = boozeDetails;
                this.calcTotalSpent();
                this.calculateSavingsOverOrUnder();
            })
            .catch(console.error)
    
    }
    
    Booze.prototype.postBooze = function(boozeDetail){
        console.log('post boozeDetails', boozeDetail)
        this.request.post(boozeDetail)
        .then((boozeDetails)=>{
            PubSub.publish('Booze:data-loaded', boozeDetails)
        })
    }
    
    Booze.prototype.deleteBooze = function(drinkID){
        console.log('drinkID:::', drinkID)
        this.request.delete(drinkID)
            .then((drink)=>{
                PubSub.publish('Booze:data-loaded', drink)
                console.log('Booze:data-loaded::', drink)
            })
            .catch(console.error)
    }

    Booze.prototype.displaySavingGoal = function () {
        this.savingGoal = event.detail[0].saveAmount
    }
    
    Booze.prototype.calcTotalSpent = function () {
      let total = 0
      const drinkSum = this.allData.forEach((drink) =>{
        total += drink.price;
      })
      return total
    };
    
    Booze.prototype.calculateSavingsOverOrUnder = function () {
        const amountSpent = this.calcTotalSpent()
        const calcSavingsProgress = this.savingGoal - amountSpent
        console.log(calcSavingsProgress)
        return calcSavingsProgress
        

    }
    
    module.exports = Booze;
