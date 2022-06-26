const nodemailer = require("nodemailer");

exports.getIndexPage = (req, res) => {
    res.render("index", {
        page_name: "index"
    });
}
exports.getAboutPage =  (req,res) => {
    res.render("about", {
        page_name: "about"
    });
}
exports.getRegisterPage =  (req,res) => {
    res.render("register", {
        page_name: "register"
    });
}
exports.getLoginPage =  (req,res) => {
    res.render("login", {
        page_name: "login"
    });
}
exports.getContactPage =  (req,res) => {
    res.render("contact", {
        page_name: "contact"
    });
}
exports.sendEmail =  async(req,res) => {
   try {
    const outputMessage = `
    <h1>Mail Details</h1>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>

    </ul>
    <h1>Mail</h1>
    <p>${req.body.message}</p>
    `

    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "tr01515tr@gmail.com", // generated ethereal user
        pass: "whymczbtshfkiozw", // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: ' "SmartEdu Contact" <tr01515tr@gmail.com>', // sender address
      to: "emreeryigit24@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      html: outputMessage // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    req.flash("success", "Mail sent successfully")
    res.redirect("/contact");
   } catch (e) {
    req.flash("error", `Something went wrong ${e}`)

   }
  }
  
  
