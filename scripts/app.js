'use strict';

angular.module('gft', ['ngRoute'])
    .config(function ($routeProvider) {

	$routeProvider
	    .when('/', {templateUrl:'views/main.html',controller: 'nullCtrl'})
	    .when('/trainer', {templateUrl:'views/trainer.html',controller: 'nullCtrl'})
	    .otherwise({redirectTo: '/'});
    });

document.body.addEventListener('touchmove',function(event){
    event.preventDefault();
});
