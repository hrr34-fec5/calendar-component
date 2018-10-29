const router = require('express').Router();
const controller = require('../controllers/controllers.js');

router.get('/guest', controller.guest.get);
router.post('/guest', controller.guest.post);

router.get('/host', controller.host.get);
router.post('/host', controller.host.post);

router.get('/listing', controller.listing.get);
router.post('/listing', controller.listing.post);

router.get('/listingAvailable', controller.listingAvailableNights.get);
router.post('/listingAvailable', controller.listingAvailableNights.post);

router.get('/booking', controller.booking.get);
router.post('/booking', controller.booking.post);

module.exports = router;
