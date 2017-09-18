var express = require('express');
var router = express.Router();
var guest = require("../Guests.json");
var company = require("../Companies.json");
var template = require("../Message.json");

// ----These Variables relate to converting time stamp into local time
var timeOfDayGreeting;
var timestamp;
var pubDate;
var offet;

// These variables are used to contruct final customized message
var hotelName;
var city;
var firstName;
var lastName;
var roomNumber;
var message;
var messageType;



router.post('/', function(req, res) {
  messageType = req.body.type; // user can select different message styles (formal or standard)
  //this for loop takes hotel name and sets hotel name and city variables, used in message template
  // the if statement sets offset variable, in order to convert between UTC and local time
  for (var i = 0; i < company.length; i++) {
    if (company[i].company == req.body.company) {
      hotelName = company[i].company;
      city = company[i].city;
      if (company[i].timezone == "US/Central") {
        offset = 5;
      } else if (company[i].timezone == "US/Eastern") {
        offset = 4;
      }  else if (company[i].timezone == "US/Pacific") {
        offset = 7;
      }
    }
  }

//this for loop takes guest name and sets guest variables, used in final message
//the time stamp is converted into UTC hours, and then converted into local time
  for (var i = 0; i < guest.length; i++) {
    if(guest[i].lastName == req.body.lastName && guest[i].firstName == req.body.firstName) {
      lastName = guest[i].lastName;
      firstName = guest[i].firstName;
      roomNumber = guest[i].reservation.roomNumber;
      timestamp = guest[i].reservation.startTimestamp;
      pubDate = new Date(timestamp * 1000);
      var hours = pubDate.getUTCHours();
      var localHours = hours - offset;
    // the if/else statement sets the greeting to be appropriate for local time
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
  // after setting variables and local time greeting,
  //calls generate message to create custom message
  generateMessage();
  res.sendStatus(201);
}); //end of post route


// Generate message takes in variables and accesses json obects to contruct custom message
//message is different depending on style specified by user
function generateMessage() {
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
