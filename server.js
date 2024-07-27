const express = require("express");
const cors = require("cors");

var bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const dotenv = require('dotenv').config();

const app = express();
app.use(cors());

const authRoute = require('./routes/Auth/Auth');
app.use('/api/auth',jsonParser, authRoute);

const featuresRoute = require('./routes/Features/Features');
app.use('/api/feature',jsonParser, featuresRoute);

const listingRoute = require('./routes/Listing/Listing');
app.use('/api/listing',jsonParser, listingRoute);



app.listen(8081, () => {
  console.log("Backend server is running!");
});