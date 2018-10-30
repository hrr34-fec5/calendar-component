const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const dbConnection = require('../database/database.js');
// const modelsSQL = require('../models/modelsSQL');
const db = require('../models/models.js');
// const controller = require('../controllers/controllers');
// const router = require('../routes/routes.js');

const app = express();
const port = 3000;

app.use('/', express.static(path.join(__dirname, '../client')));
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

// [] Need to add a modification to the available night that
// it is now booked and pass in the ID of this new booking
// In the response object, there's a bookingId,
// which we can then use to invoke the patch of the given listingId
app.post('/booking', (request, response) => {
  db.Booking.create({
    startDate: request.body.startDate,
    endDate: request.body.endDate,
    price: request.body.price,
    canceled: request.body.canceled,
    cancellationReason: request.body.cancellationReason,
    listingId: request.body.listingId,
    guestId: request.body.guestId,
  })
    .then(result => result.dataValues)
    .then((dataValues) => {
    // This will mark the available night of startDate only as booked.
    // We need to update this to map across *all* dates between StartDate and EndDate
    // Get an array of dates between startDate and EndDate (the last date should be endDate-1)
    // Map across that array with the following update in an asynchronous fashion
      db.ListingAvailableNight.update( 
        { booked: true, 
          bookingId: dataValues.bookingId, 
        }, { where: { 
          startDate: dataValues.startDate, 
          listingId: dataValues.listingId,
        } })
        .then(results => console.log('The values we have for patching are: ', results))
        .catch(err => response.status(500).send(errorMessage, err));
    })
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
  db.ListingAvailableNight.findAll({
    where: {
      listingId: request.params.listingId,
      booked: false,
    },
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
