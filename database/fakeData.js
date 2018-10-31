const faker = require('faker');
const moment = require('moment');
const momentRandom = require('moment-random');
const Promise = require('bluebird');
const db = require('../models/models.js');

const createUser = () => {
  const email = faker.internet.email();
  const fullName = faker.name.findName();
  const host = Math.random() <= 0.25;
  return guest = { email, fullName, host };
};

const createListing = () => {
  const cancellationPolicies = ['Flexible', 'Moderate', 'Strict', 'Super Strict'];
  const listingName = faker.random.words(2);
  const listingDescription = faker.lorem.words(10);
  const minimumNights = faker.random.number({ 'min': 0, 'max': 2 });
  const cancellationPolicy = cancellationPolicies[faker.random.number({ 'min': 0, 'max': 3 })];
  const host_id = faker.random.number({ min: 0, max: 399 });
  return listing = {
    listingName, listingDescription, minimumNights, cancellationPolicy, host_id,
  };
};

const createAvailableNight = (listingIdInput) => {
  const price = faker.commerce.price(30, 200, 2);
  const startDate = momentRandom('2019-01-31', '2018-11-01');
  const endDate = moment(startDate).add(1, 'days');
  const booked = false;
  const bookingId = undefined;
  const listingId = listingIdInput;
  return availableNight = {
    startDate, endDate, booked, price, bookingId, listingId,
  };
};

const createBooking = (bookingIdInput, listingIdQuery) => {
  db.ListingAvailableNight.findAll({ where: {booked: false, listingId: listingIdQuery}})
  .then( (availableListingNights) => {
    let numOfListings = availableListingNights.length;
    let selectedListing = faker.random.number({'min':0,'max': numOfListings})
    let selectedNightId = availableListingNights[selectedListing].nightId;
    return db.ListingAvailableNight.find({ where: { nightId: selectedNightId } })})
  .then( (selectedNightToUpdate) => { 
    const startDate = selectedNightToUpdate.startDate; 
    const endDate = selectedNightToUpdate.endDate;
    const price = selectedNightToUpdate.price;
    const canceled = Math.random() <= .05 ? true : false;
    const cancellationReason = canceled ? faker.lorem.words(5) : undefined;
    const listingId = selectedNightToUpdate.listingId;
    const guestId = faker.random.number({ 'min':1, 'max': 400 });
    db.Booking.create({startDate, endDate, price, canceled, cancellationReason, listingId, guestId})
    db.ListingAvailableNight.update(
      {booked: true, bookingId: bookingIdInput }, 
      {returning: true, where: { nightId: selectedNightToUpdate.nightId } })      
  })
  .catch((rejection) => console.log(`Snagged an error!`, rejection))
}

const populateUsers = () => {
  const users = [];
  for (let i = 0; i < 400; i += 1) {
    users.push(createUser());
  }
  db.User.bulkCreate(users, { updatedOnDuplicate: true, individualHooks: true, returning: true })
  .then(() => db.User.findAll({}))
  .then((results) => console.log(`Users table has ${results.length} users.`));
};

const populateListings = () => {
  const listings = [];
  for (let i = 0; i < 100; i += 1) {
    listings.push(createListing());
  }
  console.log(listings);
  db.Listing.bulkCreate(listings, { updatedOnDuplicate: true, individualHooks: true, returning: true })
  .then(() => db.Listing.findAll({}))
  .then(results => console.log(`Listing table has ${results.length} listings.`));
};

const populateNights = () => {
  let nights = [];
  for (let listing = 1; listing < 100; listing += 1) {
    const nightsToList = faker.random.number({ min: 30, max: 90 });
    for (let singleNight = 0; singleNight < nightsToList; singleNight += 1) {
      let singleNight = createAvailableNight(listing);
      nights.push(singleNight);
    }
  }
  db.ListingAvailableNight.bulkCreate(nights, { updatedOnDuplicate: true, individualHooks: true, returning: true })
  .then(() => db.ListingAvailableNight.findAll({}))
  .then((results) => console.log(`Available nights table has ${results.length} nights.`))
};

const populateBookings = () => {
  for (let i = 0; i < 1000; i += 1) {
    randListingId = faker.random.number({'min': 1, 'max': 100})
    Promise.resolve(createBooking(i+1, randListingId))
  }
  db.Booking.findAll({})
  .then(results => console.log(`Booking table has ${results.length} bookings.`))
}
 
Promise.resolve(populateUsers())
.then(populateListings())
.then(populateNights())
.then(populateBookings())