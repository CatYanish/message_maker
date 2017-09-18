myApp.controller('MessageController', ['$http', function($http) {
  var mc = this;

  console.log('ang sourced');

  // mc.getMessage = function() {
  //   $http.get('/message').then(function(response) {
  //     console.log(response.data);
  //     mc.messages = response.data;
  //   })
  // }// end get listings
  //
  //
  // mc.getMessage();

//this object stores new info to be posted on messages
  mc.message = {
    firstName: "",
    lastName: "",
    company: "",
    type: ""
  };

  mc.sendMessage = function() {
    console.log('send message', mc.message);
    $http.post('/guest', mc.message).then(function(response) {
      console.log('created message', response);
      // mc.getMessage();
    });
  }// end post





}]); //end controller
