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

readFile();

function generateMessage() {
  var message = timeOfDayGreeting + " " + firstName + " " + lastName  + "! Room " +
      roomNumber + " " + template[0].ready + ". " +  template[0].enjoy;
  console.log(message);
}



function readFile() {
  // console.log('logging the contents of guest.json', guest);
  // console.log('logging room number for first guest', guest[0].reservation.roomNumber);


  for (var i = 0; i < guest.length; i++) {


    if(guest[i].lastName == "Herrera" && guest[i].firstName == "Latoya") {
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

      /* hour is before noon */
      if ( hours < 12 )
      {
        timeOfDayGreeting = "Good morning";
      }
      else if (hours >= 12 && hours <= 17 )
      {
        timeOfDayGreeting = "Good afternoon";
      }
      else if (hours > 17 && hours <= 24 )
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

  for (var i = 0; i < company.length; i++) {
    if (company[i].company == "The Grand Budapest Hotel") {
        hotelName = company[i].company;
        city = company[i].city;
        console.log(hotelName);
        console.log(city);
    }
  }

 generateMessage();

} //end of readfile







module.exports = router;
