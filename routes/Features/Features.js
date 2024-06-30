const express = require('express');
const router = express.Router();

// const {
//     verifyToken,
//     verifyTokenAndAuthorization,
    
//   } = require("../../middleware/authToken");

const {
    getAllRoles,
    getAllTeams
} = require('../../controllers/Features/Features')
/** POST Methods */
router.route("/roles").get(getAllRoles)
router.route("/teams").get(getAllTeams)
// router.route('/onboard').post(register)
/** GET Methods */
/** DELETE Methods */
/** PUT Methods */
// router.route('/').get(getUsers)

// router.route('/:id').delete(deleteUser)
// router.route('/:id').put(updateUser)

// router.route('/:id').get(getUser)
// router.route('/findadmin/:id').get(getUser)


module.exports = router;