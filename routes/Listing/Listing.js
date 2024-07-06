const express = require('express');
const router = express.Router();

// const {
//     verifyToken,
//     verifyTokenAndAuthorization,
    
//   } = require("../../middleware/authToken");

const {
    upListing
} = require('../../controllers/Listing/Listing')

/** POST Methods */
router.route("/upload_listing").post(upListing)


module.exports = router;