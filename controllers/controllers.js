const db = require('../models/models.js');

module.exports = {
  guest: {
    get: (request, response) => {
      db.User.findAll()
        .then(message => response.json(message));
    },
    post: (request, response) => {
      db.User.findOrCreate({ where: { user_id: request.body.user_id } })
        .spread((user, create) => {
          if (create) {
            // This user already existed
            response.status(200).send();
            return;
          }
          db.User.create({
            email: request.body.email,
            full_name: request.body.full_name,
            host: request.body.host,
          });
        })
        .then(message => response.status(201).send(message));
    },
  },
  host: {
    get: (request, response) => {
      db.User.findAll({ where: { host: true } })
        .then(message => response.json(message));
    },
    post: (request, response) => {
      db.User.findOrCreate({ where: { user_id: request.body.user_id } })
        .spread((user, create) => {
          if (create) {
            // This user already existed
            response.status(200).send();
            return;
          }

          db.User.create({
            email: request.body.email,
            full_name: request.body.full_name,
            host: request.body.host,
          });
        })
        .then(message => response.status(201).send(message));
    },
  },
  listing: {
    get: (request, response) => {
      db.Listing.findAll()
        .then(message => response.json(message));
    },
    post: (request, response) => {
      db.Listing.findOrCreate({ where: { listing_id: request.body.listing_id } })
        .spread((listing, create) => {
          if (create) {
            // This listing already existed
            response.status(200).send();
          } else {
            db.Listing.create({
              minimum_nights: request.body.minimum_nights,
              cancellation_policy: request.body.cancellation_policy,
              host_id: request.body.host_id,
            });
          }
        })
        .then(message => response.status(201).send(message));
    },
  },
  booking: {
    get: (request, response) => {
      db.Booking.findAll()
        .then(message => response.json(message));
    },
    post: (request, response) => {
      db.Booking.findOrCreate({ where: { booking_id: request.body.booking_id } })
        .spread((booking, create) => {
          if (create) {
            // This booking laready existed
            response.status(200).send();
          } else {
            db.Booking.create({
              start_date: request.body.start_date,
              end_date: request.body.end_date,
              price: request.body.price,
              canceled: request.body.canceled,
              cancellation_reason: request.body.cancellation_reason,
              listing_id: request.body.listing_id,
              guest_id: request.body.guest_id,
            });
          }
        })
        .then(message => response.status(201).send(message));
    },
  },
  listingAvailableNights: {
    get: (request, response) => {
      db.ListingAvailableNights.findAll()
        .then(message => response.json(message));
    },
    post: (request, response) => {
      db.listingAvailableNights.findOrCreate({ where: { night_id: request.body.night_id } })
        .spread((night, create) => {
          if (create) {
            // This night already exists
            response.status(200).send();
          } else {
            db.ListingAvailableNights.create({
              start_date: request.body.start_date,
              end_date: request.body.end_date,
              booked: request.body.booked,
              price: request.body.price,
              booking_id: request.body.booking_id,
              listing_id: request.body.listing_id,
            });
          }
        })
        .then(message => response.status(201).send(message));
    },
  },
};
