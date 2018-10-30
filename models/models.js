const Sequelize = require('sequelize');
const { config } = require('../config/config.js');

// Local DB connection
const db = new Sequelize('grounded_n_grits', 'root', config.development.password, {
  host: '127.0.0.1',
  dialect: 'mysql',
  port: '3306',
  logging: true,
});

// User schema
const User = db.define('users', {
  userId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  email: Sequelize.STRING,
  fullName: Sequelize.STRING,
  host: Sequelize.BOOLEAN,
}, {
  timestamps: false,
});

// Listing schema
const Listing = db.define('listings', {
  listingId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  listingName: Sequelize.STRING,
  listingDescription: Sequelize.STRING,
  minimumNights: Sequelize.INTEGER,
  cancellationPolicy: Sequelize.TEXT,
  hostId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'userId',
      deferrable: Sequelize.Deferrable.INITIALLY_DEFERRED,
    },
  },
}, {
  timestamps: false,
});

// Booking schema
const Booking = db.define('bookings', {
  bookingId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  startDate: Sequelize.DATEONLY,
  endDate: Sequelize.DATEONLY,
  price: Sequelize.DECIMAL(10, 2),
  canceled: Sequelize.BOOLEAN,
  cancellationReason: Sequelize.TEXT,
  listingId: {
    type: Sequelize.INTEGER,
    references: {
      model: Listing,
      key: 'listingId',
      deferrable: Sequelize.Deferrable.INITIALLY_DEFERRED,
    },
  },
  guestId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'userId',
      deferrable: Sequelize.Deferrable.INITIALLY_DEFERRED,
    },
  },
}, {
  timestamps: false,
});

// Avaialble nights schema
const ListingAvailableNight = db.define('listing_available_night', {
  nightId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  startDate: Sequelize.DATEONLY,
  endDate: Sequelize.DATEONLY,
  booked: Sequelize.BOOLEAN,
  price: Sequelize.DOUBLE(10, 2),
  bookingId: {
    type: Sequelize.INTEGER,
    references: {
      model: Booking,
      key: 'bookingId',
      deferrable: Sequelize.Deferrable.INITIALLY_DEFERRED,
    },
  },
  listingId: {
    type: Sequelize.INTEGER,
    references: {
      model: Listing,
      key: 'listingId',
      deferrable: Sequelize.Deferrable.INITIALLY_DEFERRED,
    },
  },
  }, {
  timestamps: false,
});

// Establish relationships
Listing.belongsTo(User, { foreignKey: 'hostId', targetKey: 'userId', constraints: false });
Booking.belongsTo(Listing, { foreignKey: 'listingId', targetKey: 'listingId', constraints: false });
Booking.belongsTo(User, { foreignKey: 'guestId', targetKey: 'userId', constraints: false });
ListingAvailableNight.belongsTo(Listing, { foreignKey: 'listingId', targetKey: 'listingId', constraints: false });
ListingAvailableNight.belongsTo(Booking, { foreignKey: 'bookingId', targetKety: 'bookingId', constraints: false });
Booking.belongsTo(Listing, { foreignKey: 'listingId', targetKey: 'listingId', constraints: false });

// 1:m relationships
// User.hasMany(Listing, { constraints: false });
// User.hasMany(Booking, { onDelete: 'cascade', constraints: false });
// Listing.hasMany(Booking, { onDelete: 'cascade', constraints: false });
// Listing.hasMany(ListingAvailableNight, { constraints: false });
// Booking.hasMany(ListingAvailableNight, { constraints: false });
// ListingAvailableNight.hasMany(Booking, { constraints: false });


// Create a new database if it doesn't exist;
// Note: Sequelize *cannot* create a database if it doesn't exist. https://github.com/sequelize/sequelize/issues/1908
// Once the database exists, however, it can create the schema.
db.sync()
  .then(() => db.query('CREATE DATABASE IF NOT EXISTS grounded_n_grits;'))
  .then(() => db.query('USE grounded_n_grits'))
  .then(() => User.sync())
  .then(() => Listing.sync())
  .then(() => Booking.sync())
  .then(() => ListingAvailableNight.sync())
  .then(() => console.log('Sequelize Sync worked!'))
  .catch(err => console.log('Oh, no! An Error!', err));

// Export schemas
exports.User = User;
exports.Listing = Listing;
exports.Booking = Booking;
exports.ListingAvailableNight = ListingAvailableNight;
