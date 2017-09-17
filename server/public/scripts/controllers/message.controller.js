myApp.controller('MessageController', ['$http', function($http) {
  var mc = this;

  console.log('ang sourced');

  mc.getMessage = function() {
    $http.get('/message').then(function(response) {
      console.log(response.data);
      mc.messages = response.data;
    })
  }// end get listings


  mc.getMessage();

//this object stores new info to be posted on messages
  mc.newMessage = {};

  mc.addMessage = function() {
    console.log('add message', mc.newMessage);
    $http.post('/message', mc.newMessage)
    .then(function(response) {
      console.log('added listing', response);
      mc.getMessage();
    });
  }// end post





}]); //end controller
