const express = require("express");
const cors = require("cors");

const dotenv = require('dotenv').config();

const app = express();
app.use(cors());

const authRoute = require('./routes/Auth/Auth');
app.use('/api/auth', authRoute);

const featuresRoute = require('./routes/Features/Features');
app.use('/api/feature', featuresRoute);

const listingRoute = require('./routes/Listing/Listing');
app.use('/api/listing', listingRoute);



app.listen(8081, () => {
  console.log("Backend server is running!");
});