const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const moment = require('moment');
const Promise = require('bluebird');
// const dbConnection = require('../database/database.js');
// const modelsSQL = require('../models/modelsSQL');
const db = require('../models/models.js');
// const controller = require('../controllers/controllers');
// const router = require('../routes/routes.js');

const app = express();
const port = 3030;

app.use('/', express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());
// app.use('/guest', router);
// app.use('/host', router);
// app.use('/listing', router);
// app.use('/listingAvailable', router);
// app.use('/booking', router);


const errorMessage = 'There was an error creating the record: ';

// Guest Endpoints
app.get('/guest', (request, response) => {
  db.User.findAll({})
    .then(message => response.status(200).send(message))
    .catch(err => response.status(404).send(errorMessage, err));
});

app.post('/guest', (request, response) => {
  db.User.create({
    email: request.body.email,
    fullName: request.body.fullName,
    host: request.body.host,
  })
    .then(message => response.status(201).send(message))
    .catch(err => response.status(500).send(errorMessage, err));
});

// Host Endpoints
app.get('/host', (request, response) => {
  db.User.findAll({ where: { host: true } })
    .then(results => response.status(200).send(results))
    .catch(err => response.status(404).send(errorMessage, err));
});

app.post('/host', (request, response) => {
  db.User.create({
    email: request.body.email,
    fullName: request.body.fullName,
    host: request.body.host,
  })
    .then(message => response.status(201).send(message))
    .catch(err => response.status(500).send(errorMessage, err));
});

// Listing Endpoints
app.get('/listing', (request, response) => {
  db.Listing.findAll({})
    .then(results => response.status(200).send(results))
    .catch(err => response.status(404).send(errorMessage, err));
});

app.post('/listing', (request, response) => {
  db.Listing.create({
    listingName: request.body.listingName,
    listingDescription: request.body.listingDescription,
    minimumNights: request.body.minimumNights,
    cancellationPolicy: request.body.cancellationPolicy,
    hostId: request.body.hostId,
  })
    .then(result => response.status(201).send(result))
    .catch(err => response.status(500).send(errorMessage, err));
});

app.post('/listing/:hostId', (request, response) => {
  db.Listing.create({
    listingName: request.body.listingName,
    listingDescription: request.body.listingDescription,
    minimumNights: request.body.minimumNights,
    cancellationPolicy: request.body.cancellationPolicy,
    hostId: request.params.hostId,
  })
    .then(result => response.status(201).send(result))
    .catch(err => response.status(500).send(errorMessage, err));
});

app.get('/listing/:hostId', (request, response) => {
  db.Listing.findAll({ where: { hostId: request.params.hostId } })
    .then(results => response.status(200).send(results))
    .catch(err => response.status(404).send(errorMessage, err));
});

// Booking Endpoints
app.get('/booking', (request, response) => {
  db.Booking.findAll({})
    .then(results => response.status(200).send(results))
    .catch(err => response.status(404).send(errorMessage, err));
});

app.get('/booking/:listingId', (request, response) => {
  db.Booking.findAll({ where: { listingId: request.params.listingId } })
    .then(results => response.status(200).send(results))
    .catch(err => response.status(404).send(errorMessage, err));
});

app.get('/booking/:guestId', (request, response) => {
  db.Booking.findAll({ where: { guestId: request.params.guestId } })
    .then(results => response.status(200).send(results))
    .catch(err => response.status(404).send(errorMessage, err));
});

app.post('/booking', (request, response) => {
  // Confirm the desired nights are available
  const start = moment(request.body.startDate);
  const end = moment(request.body.endDate);
  const bookingDuration = Math.round(moment.duration(end.diff(start)).asDays());
  return db.ListingAvailableNight.findAll({
    where:
     {
       startDate: { [db.Op.gte]: moment(start).format('YYYY-MM-DD') },
       endDate: { [db.Op.lte]: moment(end).format('YYYY-MM-DD') },
       booked: false 
}, 
  })
    .then((results) => {
      if (results.length < bookingDuration) {
        Promise.reject('There\'s a mismatch in the number of nights');
      }
      return results;
    })
    .then((requestedNights) => {
    // If the nights are available - create the booking
      const bookingsToCreate = [];
      requestedNights.forEach(el => bookingsToCreate.push(el.dataValues));
      return Promise.each(bookingsToCreate, booking => db.Booking.create({
          startDate: booking.startDate,
          endDate: booking.endDate,
          price: booking.price,
          canceled: booking.canceled,
          cancellationReason: booking.cancellationReason,
          listingId: booking.listingId,
          guestId: booking.guestId,
        })
      );
    })
    .then(listOfNights =>
    // Then update the listing's night to indicate it's been booked.
      Promise.each(listOfNights, (listing) => db.ListingAvailableNight.update( 
        { booked: true, 
          bookingId: listing.bookingId, 
        }, { where: { 
          startDate: listing.startDate, 
          listingId: listing.listingId,
      } })),
    )
    .then(results => response.status(201).send(results))
    .catch(err => response.status(500).send(errorMessage, err));
});

// Available Night Endpoints

app.get('/nights', (request, response) => {
  db.ListingAvailableNight.findAll()
    .then(results => response.status(200).send(results))
    .catch(err => response.status(404).send(errorMessage, err));
});

app.get('/nights/:listingId', (request, response) => {
  db.ListingAvailableNight.findAll({ where: { listingId: request.params.listingId } })
    .then(results => response.status(200).send(results))
    .catch(err => response.status(404).send(errorMessage, err));
});

app.get('/availableNights/:listingId', (request, response) => {
  console.log(`The request params ------>`, request.params)
  db.ListingAvailableNight.findAll({
    where: {
      listingId: request.params.listingId,
      booked: false,
    },
    order: ['startDate']
  })
    .then(results => response.status(200).send(results))
    .catch(err => response.status(404).send(errorMessage, err));
});

app.get('/bookedNights/:listingId', (request, response) => {
  db.ListingAvailableNight.findAll({
    where: {
      listingId: request.params.listingId,
      booked: true,
    },
  })
    .then(results => response.status(200).send(results))
    .catch(err => response.status(404).send(errorMessage, err));
});

app.post('/availableNight/:listingId', (request, response) => {
  db.ListingAvailableNight.create({
    startDate: request.body.startDate,
    endDate: request.body.endDate,
    booked: request.body.booked,
    price: request.body.price,
    bookingId: request.body.bookingId,
    listingId: request.params.listingId,
  })
    .then(result => response.status(201).send(result))
    .catch(err => response.status(500).send(errorMessage, err));
});

app.post('/availableNight', (request, response) => {
  db.ListingAvailableNight.create({
    startDate: request.body.startDate,
    endDate: request.body.endDate,
    booked: request.body.booked,
    price: request.body.price,
    bookingId: request.body.bookingId,
    listingId: request.body.listingId,
  })
    .then(result => response.status(201).send(result))
    .catch(err => response.status(500).send(errorMessage, err));
});


// [] Add PATCH verb endpoints
// app.patch('bookANight/:startDate/:listingId', (request, response) => {
//   // I: a listingId
//   // O: a response from updating a specific listingId depending on what's in the request.body
//   // Question: How do you make this *flexible* such that you don't
//   // patch something to undefined, but only take values that are known?
//   console.log(request.body);
//   db.ListingAvailableNight.update(
//     { booked: request.body.booked,
//       bookingId: request.body.bookingId,
//     }, { where: {
//         startDate: request.params.startDate,
//         listingId: request.params.listingId,
//     } })
//     .then(results => response.status(203).send(results)) // [] Verify HTTP Status code
//     .catch(err => response.status(404).send(errorMessage, err));
// });

// [] finish this multi-parameter booking
// app.get('/booking/:guestId/:listingId', (request, response) => {
//   console.log(request.params);
//   response.status(200).send();
// });

// [] Add DELETE verb endpoints
// [] Graceful error handling (why does my server shut off when i submit a booking that can't exist
// -- i.e. with a host guest that doesn't exist)

// Establish listener
app.listen(port, () => { console.log(`Listening on port, ${port}`); });

module.exports.app = app;