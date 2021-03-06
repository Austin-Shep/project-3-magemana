const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const session = require('express-session');
const routes = require("./routes");
const passport = require("passport");
const app = express();
const PORT = process.env.PORT || 3001;


// Define middleware here===========================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret:"secretSecrets",
  saveUninitialized:true,
  resave:true
}))

// Serve up static assets (usually on heroku)=============
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/public"));
}

// ===== Passport ====
app.use(passport.initialize());
app.use(passport.session()) // will call the deserializeUser






// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/characterbuild", {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We're connected to db!");
});

// Define API routes here
app.use(routes);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});