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

// this variable can contain a custom message created by user
var customMessage;

//calls functions to use and existing template and create a personalized message
router.post('/', function(req, res) {
  messageType = req.body.type; // user can select different message styles (formal or standard)
  lastName = req.body.lastName;
  firstName = req.body.firstName;
  hotelName = req.body.company;
  cityDetails();
  guestDetails();
  generateMessage();
  res.sendStatus(201);
}); //end of post route

//calls functions to create a custom message created by the client for the guest
//(example is hardcoded in client side message controller)
router.post('/custom/', function(req, res) {
  lastName = req.body.lastName;
  firstName = req.body.firstName;
  hotelName = req.body.company;
  customMessage = req.body.body;
  cityDetails();
  guestDetails();
  newMessage();
  res.sendStatus(201);
}); //end of post route




//this for loop takes hotel name and sets hotel name and city variables, used in message template
// the if statement sets offset variable, in order to convert between UTC and local time
function cityDetails() {
  for (var i = 0; i < company.length; i++) {
    if (company[i].company == hotelName) {
      city = company[i].city;
      if (company[i].timezone == "US/Central") {
        offset = 5;
      } else if (company[i].timezone == "US/Eastern") {
        offset = 4;
      }  else if (company[i].timezone == "US/Pacific") {
        offset = 7;
      }
    }
  } //end of for loop
} //end of cityDetails function


//this for loop takes guest name and sets guest variables, used in final message
//the time stamp is converted into UTC hours, and then converted into local time
function guestDetails() {
  for (var i = 0; i < guest.length; i++) {
    if(guest[i].lastName == lastName && guest[i].firstName == firstName) {
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
  // generateMessage();
} //end of guestDetails function




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

//this function creates a custom template based on guest name, hotel name, and the user's
//input for the custom message
function newMessage() {
  var customTemplate = timeOfDayGreeting + " " + firstName + " " + lastName + "! " +
   customMessage + ".";
  console.log(customTemplate);
}





module.exports = router;
