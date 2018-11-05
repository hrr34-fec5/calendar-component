const {populateNights} = require('./seedConfig');

Promise.resolve()
.then(populateNights)
.then('seedStep2 Complete ^^^^^^')