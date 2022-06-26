const User = require("../models/User");
const Category = require("../models/Category");
const Course = require("../models/Course");
const bcrypt = require('bcrypt');
const { validationResult } = require("express-validator");
exports.createUser = async (req,res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).redirect("/login")
    }catch (e) {
        const errors = validationResult(req)
        console.log(errors)
        for (let i = 0; i < errors.array().length; i++) {
            req.flash("error", `${errors.array()[i].msg}`);
        }
       
        res.redirect("/register")
    }
}
exports.loginUser = async (req,res) => {
    try {
       const {email,password} = req.body;
         const user = await User.findOne({email});
            if(!user){
                return res.status(400).json({
                    status: "fail",
                    message: "User not found"
                })
            } else {
                bcrypt.compare(password, user.password, (err, same) => {
                    if(same) {
                        req.session.userID = user._id;
                        //session
                        res.status(200).redirect("/users/dashboard")
                    } else {
                        req.flash("error", "Invalid password");
                        res.redirect("/login")
                    }
                })
            }
    }catch (e) {
        res.status(400).json({
            status: "fail",
            message: e.message
        })
    }
}
exports.logoutUser = (req,res) => {
    req.session.destroy();
    res.status(200).redirect("/")
}
exports.getDashboardPage = async(req,res) => {
    const user = await User.findById(req.session.userID).populate("courses");
    const categories = await Category.find()
    const courses = await Course.find({user: req.session.userID})
    const users = await User.find({})
    res.render("dashboard", {
        page_name: "dashboard",
        user,
        categories,
        courses,
        users
    })
}
exports.deleteUser = async (req, res) => {
    try {
      await User.findByIdAndRemove(req.params.id)
      await Course.deleteMany({user: req.params.id})
  
      res.status(200).redirect('/users/dashboard');
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        error,
      });
    }
  };