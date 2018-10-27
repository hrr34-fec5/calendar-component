const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database/index.js');
const controllers = require('../controllers/controllers.js');
var router = require('../routes/routes.js');

const app = express();
const port = 3000;

app.use('/', express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json());
app.use('/guest', router);
app.use('/host', router);
app.use('/listing', router);
app.use('/listingAvailable', router);
app.use('/booking', router);


// 1 how do i create a connection to the database - so that when node is connected, we are also connected to mysql -- 
// 2 how do i create a seed file that the database runs only once?

// Add endpoints here

app.get('/users', controllers.user.get);

app.listen(port, () => { console.log(`Listening on port, ${port}`); });
