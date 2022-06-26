const express = require('express');
const authController = require("../controllers/authController");
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
const User = require('../models/User');
const {body} = require('express-validator');
//    /users/*

router.route("/signup").post(
    [
        body("name").not().isEmpty().withMessage("Name is required"),
        body("email").isEmail().withMessage("Email is required").custom(userEmail => {
            return User.findOne({email: userEmail}).then(user => {
                if(user) {
                    return Promise.reject("Email already exists")
                }
            })
        }),
        body("password").isLength({min: 6}).withMessage("Password is required")
    ]
    ,authController.createUser)
router.route("/login").post(authController.loginUser)
router.route("/logout").get(authController.logoutUser)
router.route("/dashboard").get(authMiddleware,authController.getDashboardPage)
router.route("/:id").delete(authController.deleteUser)
module.exports = router