'use strict';

angular.module('gft', ['ngRoute'])
    .config(function ($routeProvider) {

	$routeProvider
	    .when('/', {templateUrl:'views/main.html',controller: 'MainCtrl'})
	    .when('/trainer', {templateUrl:'views/trainer.html',controller: 'nullCtrl'})
	    .otherwise({redirectTo: '/'});
    });




// imagine if this lookup object always returned another lookup object

// each object would act as a proxy to its own data

// derefd via ()

// lookup('blah')('blah')('whatever').....

// the object could be given functions to use when its data was incomplete
// or not undefined
// or it could be built as a promise

// lookup('blah').then(function(r){return r('whatever')})

// meanwhile it's all just a poor man's proxy


var lookup = function(index){
    console.dir(this);

    if(index in this) return this[index];
    else return null;
};

lookup.blah = 'blah';

lookup = lookup.bind(lookup);

console.dir(lookup);
console.log(lookup('blah'));
