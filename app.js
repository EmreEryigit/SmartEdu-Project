const express = require('express');
const ejs = require('ejs');

const app = express();
app.set("view engine", "ejs")
app.use(express.static("public"));

//ROUTES

app.get("/", (req,res) => {
    res.render("index", {
        page_name: "index"
    });
})
app.get("/about", (req,res) => {
    res.render("about", {
        page_name: "about"
    });
})


port = 3000
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})