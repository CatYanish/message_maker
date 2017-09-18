myApp.controller('MessageController', ['$http', function($http) {
  var mc = this;


//this object stores new info to be posted on messages
  mc.message = {
    firstName: "",
    lastName: "",
    company: "",
    type: ""
  };


mc.custom = {
  firstName: "Candy",
  lastName: "Pace",
  company: "The Prancing Pony",
  body: "Thank you for staying with us! We are here to help, so let any one of our staff know how we can make your trip great"
}


  mc.sendMessage = function() {
    $http.post('/guest', mc.message).then(function(response) {
      console.log('created message', response);
    });
  }// end post

customMessage();

  function customMessage() {
    $http.post('/guest/custom', mc.custom).then(function(response) {
      console.log('created message', response);

    });
  }// end post



}]); //end controller
