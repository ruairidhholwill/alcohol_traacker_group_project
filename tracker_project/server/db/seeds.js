use tracker

db.dropDatabase()

db.booze.insertMany([{
    drinkType: 'wine',
    drinkSize: 'small',
    drinkUnits: 1.5,
    price: '2.99',
    date: 'Fri May 24 2019'
  },
  {
    drinkType: 'wine',
    drinkSize: 'small',
    drinkUnits: 1.5,
    price: '2.99',
    date: 'Fri May 24 2019'
  },
  {
    drinkType: 'beer',
    drinkSize: 'pint',
    drinkUnits: 2,
    price: '4.00',
    date: 'Sat May 25 2019'
  },
  {
    drinkType: 'beer',
    drinkSize: 'pint',
    drinkUnits: 2,
    price: '4.00',
    date: 'Sat May 25 2019'
  },
  {
    drinkType: 'beer',
    drinkSize: 'pint',
    drinkUnits: 2,
    price: '4.00',
    date: 'Sat May 25 2019'
  },
  {
    drinkType: 'spirit',
    drinkSize: 'single',
    drinkUnits: 2,
    price: '4.99',
    date: 'Sat May 25 2019'
  },
  {
    drinkType: 'wine',
    drinkSize: 'medium',
    drinkUnits: 2.1,
    price: '4.50',
    date: 'Mon May 27 2019'
  },
  {
    drinkType: 'wine',
    drinkSize: 'small',
    drinkUnits: 1.5,
    price: '4.00',
    date: 'Mon May 27 2019'
  },
  {
    drinkType: 'beer',
    drinkSize: 'pint',
    drinkUnits: 2,
    price: '3.99',
    date: 'Tue May 28 2019'
  },
  {
    drinkType: 'beer',
    drinkSize: 'pint',
    drinkUnits: 2,
    price: '4.50',
    date: 'Thu May 30 2019'
  },
  {
    drinkType: 'beer',
    drinkSize: 'half-pint',
    drinkUnits: 1,
    price: '4.50',
    date: 'Thu May 30 2019'
  }])

db.settings.insertOne(
  {
    currentSpend: 100,
    saveAmount: 25,
    date: 'Wed May 29 2019'
  }
)
