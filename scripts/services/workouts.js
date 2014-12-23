'use strict';

angular.module('gft')
  .service('workouts', function(fakehttp, $q, exercises, usrs){

      var that = this;

      this.get = function(options){
	  var def = $q.defer();

	  fakehttp.get('/workouts').then(function(workouts){
	      def.resolve(workouts);
	  });
	  return def.promise;
      };


  });
