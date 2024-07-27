const express = require('express');
const router = express.Router();


// const {
//     verifyToken,
//     verifyTokenAndAuthorization,
    
//   } = require("../../middleware/authToken");

const {
    upListing,
    getAllListing,
    getListByDealType,
    deleteListing,
    editListing
} = require('../../controllers/Listing/Listing')

/** POST Methods */
router.route("/upload_listing").post(upListing)
router.route("/get-all-deals").get(getAllListing)
router.route("/getdeal/:id").get(getListByDealType)
router.route("/delete/:id").delete(deleteListing)
router.route("/edit/:id").delete(editListing)



module.exports = router;