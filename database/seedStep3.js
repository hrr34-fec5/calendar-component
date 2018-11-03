const {populateBookings} = require('./seedConfig');

Promise.resolve()
.then(populateBookings)
.then('seedStep3 Complete ^^^^^^')