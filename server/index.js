const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// [] need to make database index file
// const db = require('../database/index.js');
const app = express();
const port = 3000;

app.use('/', express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json());

// Add endpoints here

app.listen(port, () => { console.log(`Listening on port, ${port}`); });
