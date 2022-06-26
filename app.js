const express = require('express');
const ejs = require('ejs');
const session = require("express-session")
const MongosStore = require("connect-mongo");
const flash = require("connect-flash");
const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");
const categoryRoute = require("./routes/categoryRoute");
const userRoute = require("./routes/userRoute");
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const app = express();

// Global variable

global.userIN = null


app.set("view engine", "ejs")
app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: MongosStore.create({mongoUrl:"mongodb://localhost:27017/smartedu" })
}))
app.use("*", (req,res,next) => {
    userIN = req.session.userID
    next()
})
app.use(flash())
app.use((req,res,next) => {
    res.locals.flashMessages = req.flash()
    next()
})
app.use(methodOverride("_method", { methods: ["POST", "GET"] }))
mongoose.connect("mongodb://localhost:27017/smartedu", { useNewUrlParser: true }).then(() => {
    console.log("Connected to MongoDB");
});
//ROUTES

app.use("/", pageRoute)
app.use("/courses", courseRoute)
app.use("/categories", categoryRoute)
app.use("/users", userRoute)



port = 3000
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})