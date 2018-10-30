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

app.get('/guest', (request, response) => {
  db.User.findAll({})
    .then(message => response.status(200).send(message));
});

app.post('/guest', (request, response) => {
  db.User.create({
    email: request.body.email,
    full_name: request.body.full_name,
    host: request.body.host,
  })
    .then(message => response.status(201).send(message))
    .catch(err => response.status(500).send(errorMessage, err));
});


app.get('/host', (request, response) => {
  db.User.findAll({ where: { host: true } })
    .then(results => response.status(200).send(results));
});

app.post('/host', (request, response) => {
  db.User.create({
    email: request.body.email,
    full_name: request.body.full_name,
    host: request.body.host,
  })
    .then(message => response.status(201).send(message))
    .catch(err => response.status(500).send(errorMessage, err));
});

app.get('/listing', (request, response) => {
  db.Listing.findAll({})
    .then(results => response.status(200).send(results));
});

app.post('/listing', (request, response) => {
  db.Listing.create({
    name: request.body.name,
    description: request.body.description,
    minimum_nights: request.body.minimum_nights,
    cancellation_policy: request.body.cancellation_policy,
    host_id: request.body.host_id,
  })
    .then(result => response.status(201).send(result))
    .catch(err => response.status(500).send(errorMessage, err));
});

app.get('/listing/:host_id', (request, response) => {
  db.Listing.findAll({ where: { host_id: request.params.host_id } })
    .then(results => response.status(200).send(results));
});

app.get('booking', (request, response) => {
  db.Booking.findAll({})
    .then(results => response.status(200).send(results));
});

app.get('booking/:listing_id', (request, response) => {
  db.Booking.findAll({ where: { listing_id: request.params.listing_id } })
    .then(results => response.status(200).send(results));
});

app.get('booking/:guest_id', (request, response) => {
  db.Booking.findAll({ where: { guest_id: request.params.guest_id } })
    .then(results => response.status(200).send(results));
});

app.post('booking');

app.get('booking/:guest_id/:listing_id', (request, response) => {
  console.log(request.params);
  response.status(200).send();
});


// 1 how do i create a connection to the database -
// so that when node is connected, we are also connected to mysql --
// 2 how do i create a seed file that the database runs only once?

app.listen(port, () => { console.log(`Listening on port, ${port}`); });
