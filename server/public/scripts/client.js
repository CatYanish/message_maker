console.log('js sourced');


var myApp = angular.module('myApp', ['ngRoute']);



myApp.config(function($routeProvider) {
$routeProvider
  .when('/message', {
    controller: 'MessageController',
    controllerAs: 'mc',
    templateUrl: '/views/templates/messages.html'
  })  .otherwise({
    redirectTo: '/message'
  });


}); //end myAPp config
