const db = require('../database/index.js');

module.exports = {
  guest: {
    get: (request, response) => {
      db.User.findAll()
      .then((message) => response.json(message));
    },
    post: (request, response) => {
      db.User.findOrCreate({ where: { user_id: request.body.user_id } })
      .spread((user, create) => {
        if (create) { console.log(user) } // This user already existed
        else { db.User.create({ 
          full_name: request.body.full_name,
          host: request.body.host,
          }); 
        }
      })
      .then( message => response.status(created? 201 : 200).send(message));
    },
  },
  host: {
    get: (request, response) => {
      db.User.findAll({ where: {host: true}})
      .then((message) => response.json(message));
    },
    post: (request, response) => {
      db.User.findOrCreate({ where: { user_id: request.body.user_id } })
      .spread((user, create) => {
        if (create) { console.log(user) } // This user already existed
        else { db.User.create({ 
          full_name: request.body.full_name,
          host: request.body.host,
          }); 
        }
      })
      .then( message => response.status(created? 201 : 200).send(message));
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
        if (create) { console.log(listing) } //This listing already existed
        else { db.Listing.create({
          minimum_nights: request.body.minimum_nights,
          cancellation_policy: request.body.cancellation_policy,
          host_id: request.body.host_id,
          });
        };
      })
      .then(message => response.status(created? 201 : 200).send(message));
    },
  },
  booking: {
    get: (request, response) => {
      db.Booking.findAll()
      .then(message => response.json(message));
    },
    post: (request, response) => {
      db.Booking.findOrCreate({ where: {booking_id: request.body.booking_id } })
      .spread((booking, create) => {
        if (create) { console.log(booking) } // This booking laready existed
        else { db.Booking.create({
          start_date: request.body.start_date,
          end_date: request.body.end_date,
          price: request.body.price,
          canceled: request.body.canceled,
          cancellation_reason: request.body.cancellation_reason,
          listing_id: request.body.listing_id,
          guest_id: request.body.guest_id,
          });
        };
      })
      .then(message => response.status(created? 201 : 200).send(message));
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
        if (create) { console.log(night) } // This night already exists
        else { db.ListingAvailableNights.create({
          start_date: request.body.start_date,
          end_date: request.body.end_date,
          booked: request.body.booked,
          price: request.body.price,
          booking_id: request.body.booking_id,
          listing_id: request.body.listing_id,
          });
        };
      })
      .then(message => response.status(created? 201 : 200).send(message));
    },
  },
};


//-------databases models -------//
// var models = require('../models');
// var db = require('../db');

// module.exports = {
//   messages: {
//     get: function (req, response) {
//       db.Messages.findAll({include: [db.User]})
//         .then(function(message){
//         res.json(message);
//         });
//     },
//     post: function (req, res) {
//       db.Users.findOrCreate({where: {username: req.body.username}})
//         .spread( function (user, created) {
//           db.Messages.create({
//             UserId: user.get('id'),
//             message: req.body.message,
//             roomname: req.body.roomname
//           })
//           .then(function(message) {
//             res.sendStatus(201);
//           })
//         });
//       }
//     },

//   users: {
//     get: function (req, res) {
//       db.User.findAll()
//         .then(function(users) {
//           res.json(users);
//         });
//     },
//     post: function (req, res) {
//       // var params = [req.body.username]
//       db.Users.findOrCreate({where: {username: req.body.username}})
//         .spread(function (user, created) {
//           console.log(`user is`, user);
//           console.log(`created is`, created);
//           res.sendStatus(created ? 201 : 200);
//       })
//     }
//   }
// };

