var http = require('http');
var express = require('express');
var nodemailer = require("nodemailer");
var bodyParser = require('body-parser')
var app = express();
var port = Number(process.env.PORT || 5000);
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));

// Home page
app.get('/', function(req, res) {
    res.sendfile('index.html');
});

// sending mail function
app.post('/send', function(req, res) {
    if (req.body.email == "" || req.body.subject == "") {
        res.send("Error: Email & Subject should not blank");
        return false;
    }

    // Sending Email Without SMTP. Goes in SPAM folder
    // nodemailer.mail({
    //     from: "Node Emailer <fsaiyed@officebrain.com>", // sender address
    //     to: req.body.email, // list of receivers
    //     subject: req.body.subject + " ✔", // Subject line
    //     //text: "Hello world ✔", // plaintext body
    //     html: "<strong> Name:</strong>"+req.body.name+"<br><p><strong>Message:</strong>" + req.body.description + "</p>" // html body
    // });
    // res.send("Email has been sent successfully");

    // Sending Emails with SMTP, Configuring SMTP settings. Turn on Allow less secure app in

    var smtpTransport = nodemailer.createTransport("SMTP", {
        host: "smtp.gmail.com", // hostname
        secureConnection: true, // use SSL
        port: 465, // port for secure SMTP
        auth: {
            user: "fzssyd@gmail.com",
            pass: "Corollary19.6"
        }
    });
    var mailOptions = {
        from: "fsaiyed@officebrain.com", // sender address
        to: req.body.email, // list of receivers
        subject: req.body.subject, // Subject line
        html: "<strong> Name:</strong>"+req.body.name+"<br><p><strong>Message:</strong>" + req.body.description + "</p>" // html body
    }
    smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
            res.send("Email could not sent due to error: " + error);
        } else {
            res.send("Email has been sent successfully");
        }
    });
});

// Starting server
var server = http.createServer(app).listen(port, function() {
    console.log("Listening on " + port);
});