'use strict';

angular.module('gft')
  .service('workouts', function($http, $q, exercises, usrs){

      var that = this;

      this.whatever = 'something';

      this.get = function(options){
	  var def = $q.defer();

	  

	  return def.promise;
      };


  });
