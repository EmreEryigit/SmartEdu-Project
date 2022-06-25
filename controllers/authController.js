const User = require("../models/User");
const bcrypt = require('bcrypt');
exports.createUser = async (req,res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            status: "success",
            user
        })
    }catch (e) {
        res.status(400).json({
            status: "fail",
            message: e.message
        })
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
                        res.status(200).redirect("/")
                    } else {
                        res.status(400).json({
                            status: "fail",
                            message: "Invalid password"
                        })
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