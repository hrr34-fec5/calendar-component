var faker = require('faker');

var randomName = faker.name.findName(); // Rowan Nikolaus
var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
var randomCard = faker.helpers.createCard(); // random contact card containing many properties

// users - host 75
// create a random email, full name and mark host === true


// users - guests - 300
// create a random email, full name and mark host === false


// listings -- 100 (using existing hosts at random)
// minimum_nights = random number between 0 and 2 
// cancellation policy = rand selection of ['Flexible', 'Moderate', 'Strict', 'Super Strict']
// host id = rand selection from hosts


// nights available (between 50 and 80 / listing between November 1, 2018 and January 31, 2019)
// for each listing
// 1. select a number of nights (rand between 50 and 80)
// 2. select a price (rand between 30 & 200)
// for the number of nights selected:
  // start_date = select a random date between 11/1/2018 and 1/31/2019
  // end_date = start_date + 1
  // price = selected price


  // bookings -- (between 10-30 per listing for 1-5 nights between 11/1/2018 and 1/31/2019)
// for each listing
  // 1. select a number between 10-30
  // 2. find an available night (where booked === false)
  // 3. find a random guest
  // create a new booking for one night
  // update the available night to booked with a new booking id
