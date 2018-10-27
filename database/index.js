const Sequelize = require('sequelize');
const config = require('../config/config.json');


const sequelize = new Sequelize('', 'root', config.rootPassword, {
  host: 'localhost',
  dialect: 'mysql',

});

sequelize.query('CREATE DATABASE IF NOT EXISTS grounded_n_grits;')
  .then(sequelize.query('USE grounded_n_grits'));

const User = sequelize.define('user', {
  user_id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  full_name: Sequelize.STRING,
  host: Sequelize.BOOLEAN,
});

const Listing = sequelize.define('listing', {
  listing_id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  minimum_nights: Sequelize.INTEGER,
  cancellation_policy: Sequelize.TEXT,
  host_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'user_id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
    },
  },
});

const Booking = sequelize.define('bookings', {
  booking_id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  start_date: Sequelize.DATEONLY,
  end_date: Sequelize.DATEONLY,
  price: Sequelize.DECIMAL(10, 2),
  canceled: Sequelize.BOOLEAN,
  cancellation_reason: Sequelize.TEXT,
  listing_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Listing,
      key: 'listing_id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
    },
  },
  guest_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'user_id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
    },
  },
});

const ListingAvailableNights = sequelize.define('listing_available_nights', {
  night_id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  start_date: Sequelize.DATEONLY,
  end_date: Sequelize.DATEONLY,
  booked: Sequelize.BOOLEAN,
  price: Sequelize.DOUBLE(10, 2),
  booking_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Booking,
      key: 'booking_id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
    },
  },
  listing_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Listing,
      key: 'listing_id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
    },
  },
});

Listing.belongsTo(User);
User.hasMany(Listing);

Booking.belongsTo(Listing);
Listing.hasMany(Booking);

Booking.belongsTo(User);
User.hasMany(Booking);

ListingAvailableNights.belongsTo(Listing);
Listing.hasMany(ListingAvailableNights);

Booking.belongsTo(Listing);
ListingAvailableNights.hasMany(Booking);

User.sync();
Listing.sync();
Booking.sync();
ListingAvailableNights.sync();

exports.User = User;
exports.Listing = Listing;
exports.Booking = Booking;
exports.ListingAvailableNights = ListingAvailableNights;
