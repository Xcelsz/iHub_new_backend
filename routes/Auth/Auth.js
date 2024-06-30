const express = require('express');
const router = express.Router();

  const {
    login,
    onboard,
    updateStaff,
    terminateStaff,
    getStaff,
    allStaff,
    resetPassword
       
} = require('../../controllers/Auth/Auth')
/** POST Methods */
router.route('/login').post(login)
router.route('/onboard').post(onboard)
router.route('/reset_pass').post(resetPassword)
/** GET Methods */
router.route('/getAllStaffs').get(allStaff)
router.route('/get_staff/:id').get(getStaff)
/** DELETE Methods */
router.route('/terminate_staff/:id').delete(terminateStaff)
/** PUT Methods */
router.route('/update_staff_info/:id').put(updateStaff)




module.exports = router;