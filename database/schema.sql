-- DROP DATABASE chat;
CREATE DATABASE IF NOT EXISTS grounded_n_grits;

USE grounded_n_grits;

CREATE TABLE IF NOT EXISTS user (
  user_id                                        INT(8) AUTO_INCREMENT,
  full_name                                               VARCHAR(255),
  PRIMARY KEY(user_id)
);

CREATE TABLE IF NOT EXISTS listing (
  /* Describe your table here.*/
  listing_id                                     INT(8) AUTO_INCREMENT,
  host_id                                                       INT(8),
  minimum_nights                                                INT(8),
  cancellation_policy                                             TEXT,
  PRIMARY KEY (listing_id),
  FOREIGN KEY (host_id) REFERENCES user(user_id)
);

CREATE TABLE IF NOT EXISTS booking (
  booking_id                                     INT(8) AUTO_INCREMENT,
  listing_id                                                    INT(8),
  guest_id                                                      INT(8),
  start_date                                                      DATE,
  end_date                                                        DATE,
  price                                                 DECIMAL(10, 2),
  canceled                                                     BOOLEAN,
  cancellation_reason                                             TEXT,
  PRIMARY KEY(booking_id),
  FOREIGN KEY(listing_id) REFERENCES listing(listing_id),
  FOREIGN KEY(guest_id) REFERENCES user(user_id)
);

CREATE TABLE IF NOT EXISTS listing_available_nights (
  night_id                                       INT(8) AUTO_INCREMENT,
  booking_id                                                    INT(8),
  listing_id                                                    INT(8),
  start_date                                                      DATE,
  end_date                                                        DATE,
  booked                                                       BOOLEAN,
  price                                                 DECIMAL(10, 2),
  PRIMARY KEY(night_id),
  FOREIGN KEY(listing_id) REFERENCES listing(listing_id),
  FOREIGN KEY(booking_id) REFERENCES booking(booking_id)
);
/* Create other tables and define schemas for them here! */


/*  Execute this file from the command line by typing:
 *    mysql -u root -p < database/schema.sql
 *  to create the database and the tables.*/