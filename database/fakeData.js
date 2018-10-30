const faker = require('faker');
const moment = require('moment');
const momentRandom = require('moment-random');
const controller = require('../controllers/controllers.js');

// users - guests and hosts - 400 total (~300 guests, 100 hosts )
const createGuest = () => {
  const userId = faker.internet.email();
  const fullName = faker.name.findName();
  const host = Math.random() <= 0.25;
  return guest = { userId, fullName, host };
};
debugger;
const testDate = Date(momentRandom()._d);
console.log(typeof testDate);
const guestOne = createGuest();
controller.guest.get(guestOne);

const cancellationPolicies = ['Flexible', 'Moderate', 'Strict', 'Super Strict'];
// listing -- 100 (using existing hosts at random)
// find a host

const createListing = () => {
  const minimumNights = faker.random.number({ min: 0, max: 2 });
  const cancellationPolicy = cancellationPolicies[faker.random.number({ min: 0, max: 3 })];
  let host_id;
  // while (user_id of faker.random.number({'min': 0, 'max': 400} is NOT a host)
  // try a new random number
  // )
  // host_id = user_id
  // create a listing
};


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
