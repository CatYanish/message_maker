var express = require('express');
var router = express.Router();
var guest = require("../Guests.json");
var company = require("../Companies.json");
var template = require("../Message.json");


var timeOfDayGreeting;
var timestamp;
var pubDate;
var hotelName;
var city;
var firstName;
var lastName;
var roomNumber;
var message;
var offet;
// var templateType = "formal";
var messageType;



router.post('/', function(req, res) {
  console.log('req.body is', req.body);
  messageType = req.body.type;
  for (var i = 0; i < company.length; i++) {
    if (company[i].company == req.body.company) {
      hotelName = company[i].company;
      city = company[i].city;
      console.log(hotelName);
      console.log(city);
      if (company[i].timezone == "US/Central") {
        offset = 5;
      } else if (company[i].timezone == "US/Eastern") {
        offset = 4;
      }  else if (company[i].timezone == "US/Pacific") {
        offset = 7;
      }
    }
  }

  console.log("messageType", req.body.type);
  for (var i = 0; i < guest.length; i++) {
    if(guest[i].lastName == req.body.lastName && guest[i].firstName == req.body.firstName) {
      lastName = guest[i].lastName;
      console.log('lastName', lastName);
      firstName = guest[i].firstName;
      console.log(firstName);
      roomNumber = guest[i].reservation.roomNumber;
      console.log(guest[i].reservation.roomNumber);
      timestamp = guest[i].reservation.startTimestamp;
      console.log('timestamp', timestamp);
      pubDate = new Date(timestamp * 1000);
      console.log('first format of a a date', pubDate);
      var hours = pubDate.getUTCHours();
      console.log("utc hours", hours);
      var localHours = hours - offset;
      console.log("localHours", localHours);
      /* hour is before noon */
      if ( localHours < 12 )
      {
        timeOfDayGreeting = "Good morning";
      }
      else if (localHours >= 12 && localHours <= 17 )
      {
        timeOfDayGreeting = "Good afternoon";
      }
      else if (localHours > 17 && localHours <= 24 )
      {
        timeOfDayGreeting = "Good evening";
      }
      else
      {
        timeOfDayGreeting = "Hello";
        console.log("time wasn't found!");
      }
    } //end of if statement
  }//end of for loop

  generateMessage();
  res.sendStatus(201);
}); //end of post route



function generateMessage() {
  console.log("generate message called");
  if (messageType == "Formal") {
    for (var i = 0; i < template.length; i++) {
      if (template[i].type == "formal") {
        var message = timeOfDayGreeting + " " + firstName + " " + lastName  + "! Room " +
        roomNumber + " " + template[i].ready + ". " +  template[i].enjoy + city + ".";
        console.log(message);
      } // end of if
    } //end of for loop
  }
  else if (messageType == "Standard") {
    for (var i = 0; i < template.length; i++) {
      if (template[i].type == "standard") {
        var message = timeOfDayGreeting + " " + firstName + " " + lastName  + "! Room " +
        roomNumber + " " + template[i].ready + ". " +  template[i].enjoy;
        console.log(message);
      }
    }
  }
}





module.exports = router;
