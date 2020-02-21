var express = require("express");
var mainController = require("../controllers/ApplicationController");
var router = express.Router();
var app = require("../../ApplicationInstance");


// ================================================== //
// ===================== G E T ====================== //
// ================================================== //

router.route('/').get(mainController.home);
router.route('/signup').get(mainController.signup);
router.route('/login').get(mainController.login);
router.route('/find-school').get(mainController.findSchool);







// ================================================== //
// ==================== P O S T ===================== //
// ================================================== //

router.route('/login').post(mainController.signin);
router.route('/register').post(mainController.register);



module.exports = router;