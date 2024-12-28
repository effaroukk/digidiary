// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");
const path = require('path');
// Requiring passport as we've configured it
var passport = require("./config/passport");
const router = require('./routes/memories');
// Setting up port and requiring models for syncingx
var PORT = process.env.PORT || 5000;
// var db = require("./models");
const db = require("./models");
// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}
// Requiring our routes
// require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
app.use("/data", router);
// Syncing our database and logging a message to the user upon success
//connection
app.use(express.static(__dirname + '/'));
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'client/build/index.html'))
});
//create the database connection using sequlize
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});

