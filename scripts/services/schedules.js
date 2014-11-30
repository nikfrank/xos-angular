'use strict';

angular.module('gft')
  .service('schedules', function($http, $q, usrs){

      var that = this;

      this.whatever = 'something';

      var resultDemo = function(j, done){
	  var ret = {
	      scheduled:(new Date(2014, 10, j + 23, 11)),
	      scheduledduration:30,
	      workout:'hash'+j,
	      usr:'hash',
	      exercises:['hash1', 'hash2', 'hash3'],
	      results:done?[Math.floor(Math.random()*1.99),
			    Math.floor(Math.random()*1.99),
			    Math.floor(Math.random()*1.99)]:[],
	      flex:Math.random()*100,
	      cardio:Math.random()*100,
	      str:Math.random()*100
	  };
	  if(done){
	      ret.fulfilled = (new Date(2014, 10, j + 23, 11));
	      ret.duration = 31;
	  }
	  return ret;
      };


      this.get = function(options){
	  var def = $q.defer();

	  //$http.get('/schedule').then(function(sched){
	  // cache?

	  var sched = [];
	  for(var i=4; i-->0;) sched.push(resultDemo(i, true));
	  for(var i=8; i-->4;) sched.push(resultDemo(i, false));
	  def.resolve(sched);

	  //});

	  return def.promise;
      };


  });
