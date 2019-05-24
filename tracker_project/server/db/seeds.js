use tracker;

db.dropDatabase();

db.booze.insertMany([
    {
        drinkType: 'beer',
        drinkSize: 'pint',
        drinkUnits: 2,
        price: 4.99,
        date: '2019-05-24'
    },
    {
        drinkType: 'beer',
        drinkSize: 'half pint',
        drinkUnits: 1,
        price: 2.99,
        date: '2019-05-24'
    },
    {
        drinkType: 'wine',
        drinkSize: 'small',
        drinkUnits: 1.5,
        price: 4.50,
        date: '2019-05-23'
    }
])