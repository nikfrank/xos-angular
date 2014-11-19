'use strict';

angular.module('gft')
  .service('schedules', function($http, $q, usrs){

      var that = this;

      this.whatever = 'something';

      var resultDemo = function(j){
	  return {
	      fulfilled:(new Date),
	      workout:'hash'+j,
	      usr:'hash',
	      exercises:['hash1', 'hash2', 'hash3'],
	      results:[Math.floor(Math.random()*1.99),
		       Math.floor(Math.random()*1.99),
		       Math.floor(Math.random()*1.99)],
	      flex:Math.random()*100,
	      cardio:Math.random()*100,
	      str:Math.random()*100
	  };
      };


      this.get = function(options){
	  var def = $q.defer();

	  //$http.get('/schedule').then(function(sched){
	  // cache?

	  var sched = [];
	  for(var i=8; i-->0;) sched.push(resultDemo(i));
	  def.resolve(sched);

	  //});

	  return def.promise;
      };


  });
