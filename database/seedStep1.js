const {populateUsers, populateListings} = require('./seedConfig');

Promise.resolve()
.then(populateUsers)
.then(populateListings)
.then('seedStep1 Complete ^^^^^^')