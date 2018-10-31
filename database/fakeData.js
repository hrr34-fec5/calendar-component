const faker = require('faker');
const moment = require('moment');
const momentRandom = require('moment-random');
const Promise = require('bluebird');
const db = require('../models/models.js')


// users - guests and hosts - 400 total (~300 guests, 100 hosts )
const createUser = () => {
  const email = faker.internet.email();
  const fullName = faker.name.findName();
  const host = Math.random() <= 0.25;
  return guest = { email, fullName, host };
};

let populateUsers = () => {
  let users = [];
  for (let i = 0; i < 400; i += 1) {
    users.push(createUser());
  };
  Promise.each(users, (user) => {
    return db.User.create({
      email: user.email,
      fullName: user.fullName,
      host: user.host,
    })
  })
  .then( () => console.log(`Successfully created ${users.length} users.`));
};
  


const createListing = () => {
  const cancellationPolicies = ['Flexible', 'Moderate', 'Strict', 'Super Strict'];
  const listingName = faker.random.words(2);
  const listingDescription = faker.lorem.words(10);
  const minimumNights = faker.random.number({ min: 0, max: 2 });
  const cancellationPolicy = cancellationPolicies[faker.random.number({ min: 0, max: 3 })];
  const host_id = faker.random.number({'min': 0, 'max': 400});
  return listing = { listingName, listingDescription, minimumNights, cancellationPolicy, host_id }
};

let populateListings = () => {
  let listings = [];
  for (let i = 0; i < 200; i += 1) {
    listings.push(createListing());
  }
  console.log(listings);
  // debugger;
  Promise.each(listings, (listing) => {
    return db.Listing.create({
      listingName: listing.listingName,
      listingDescription: listing.listingDescription,
      minimumNights: listing.minimumNights,
      cancellationPolicy: listing.cancellationPolicy,
      hostId: listing.hostId,
    })
  })
  .then ( () => console.log(`Successfully created ${listings.length} listings.`))
}


const createAvailableNights = () => {
// nights available (between 50 and 80 / listing between November 1, 2018 and January 31, 2019)
  const numberOfAvailableNights = faker.random.number({ min: 50, max: 80 });
  const price = faker.commerce.price(30, 200, 2);
  for (let listing = 0; listing < 100; listing++) {
    for (let night = 0; night < numberOfAvailableNights; night++) {
      const startDate = momentRandom('2019-01-31', '2018-11-01');
      const endDate = moment(startDate).add(1, 'days');
      let hostId;
      // while (user_id of faker.random.number({'min': 0, 'max': 400} is NOT a host)
      // try a new random number
      // )
      // host_id = user_id
      // create an Available night with this information
    }
  }
};

const createBooking = () => {
  // bookings -- (between 20-400 per listing for 1 night between 11/1/2018 and 1/31/2019)
  const numberOfBookings = faker.random.number({ min: 20, max: 40 });
  const listingId = faker.random.number({ min: 0, max: 100 });
  const availableNights = select * from;
  let startDate;
  let guestId;
  // while (user_id of faker.random.number({'min': 0, 'max': 400} IS a host)
  // try a new random number
  // )
  // guest_id = user_id = faker.random.number({'min': 0, 'max': 300})
  const canceled = Math.random() <= 0.05;
  if (canceled) {
    const cancellationReason = faker.lorem.sentence;
  }
};


// populateUsers();
populateListings();