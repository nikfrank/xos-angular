'use strict';

angular.module('gft', ['ngRoute'])
    .config(function ($routeProvider) {

	$routeProvider
	    .when('/', {templateUrl:'views/main.html',controller: 'MainCtrl'})
	    .when('/trainer', {templateUrl:'views/trainer.html',controller: 'nullCtrl'})
	    .otherwise({redirectTo: '/'});
    });
