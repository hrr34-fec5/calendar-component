-- DROP DATABASE chat;
CREATE DATABASE IF NOT EXISTS grounded_n_grits;

USE grounded_n_grits;

CREATE TABLE IF NOT EXISTS users (
  user_id                                        INT(8) AUTO_INCREMENT,
  email                                                   VARCHAR(255),
  full_name                                               VARCHAR(255),
  host                                                         BOOLEAN,
  PRIMARY KEY(user_id)
);

CREATE TABLE IF NOT EXISTS listings (
  /* Describe your table here.*/
  listing_id                                     INT(8) AUTO_INCREMENT,
  listing_name                                             VARCHAR(80),
  listing_description                                     VARCHAR(255),
  minimum_nights                                                INT(8),
  cancellation_policy                                             TEXT,
  host_id                                                       INT(8),
  PRIMARY KEY (listing_id),
  FOREIGN KEY (host_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS bookings (
  booking_id                                     INT(8) AUTO_INCREMENT,
  start_date                                                      DATE,
  end_date                                                        DATE,
  price                                                 DECIMAL(10, 2),
  canceled                                                     BOOLEAN,
  cancellation_reason                                             TEXT,
  listing_id                                                    INT(8),
  guest_id                                                      INT(8),
  PRIMARY KEY(booking_id),
  FOREIGN KEY(listing_id) REFERENCES listings(listing_id),
  FOREIGN KEY(guest_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS listing_available_nights (
  night_id                                       INT(8) AUTO_INCREMENT,
  start_date                                                      DATE,
  end_date                                                        DATE,
  booked                                                       BOOLEAN,
  price                                                 DECIMAL(10, 2),
  booking_id                                                    INT(8),
  listing_id                                                    INT(8),
  PRIMARY KEY(night_id),
  FOREIGN KEY(listing_id) REFERENCES listings(listing_id),
  FOREIGN KEY(booking_id) REFERENCES bookings(booking_id)
);
/* Create other tables and define schemas for them here! */


/*  Execute this file from the command line by typing:
 *    mysql -u root -p < database/schema.sql
 *    drop database grounded_n_grits;
 *    drop database grounded_n_grits; create database grounded_n_grits; use grounded_n_grits;
 *  to create the database and the tables.*/