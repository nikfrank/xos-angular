'use strict';

angular.module('gft')
  .service('schedules', function($http, $q, usrs){

      var that = this;

      this.whatever = 'something';

      this.sched = [];

      var shuffle = function(a){
	  var ret = [];
	  while(a.length) ret.push(a.splice(Math.floor(Math.random()*a.length),1)[0])
	  return ret;
      }

      var resultDemo = function(j, done){
	  var ret = {
	      scheduled:(new Date(2014, 10, j + 23, 11)),
	      scheduledduration:30,
	      workout:'hash'+j,
	      usr:'hash',
	      exercises:shuffle(['hash1', 'hash2', 'hash3']),
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



      this.getResults = function(start, end){
	  // find the workouts within the dates
	  // return the results in a flat array with exercise and date data
	  var def = $q.defer();

	  def.resolve(that.sched.filter(function(w){
	      return (w.scheduled > start) && (w.scheduled < end);
	  }).sort(function(m,n){
	      return m.scheduled > n.scheduled;
	  }));

	  return def.promise;

      };


      this.get = function(options){
	  var def = $q.defer();

	  //$http.get('/schedule').then(function(sched){
	  // cache?

	  if(!that.sched.length){
	      var sched = [];
	      for(var i=4; i-->0;) sched.push(resultDemo(i, true));
	      for(var i=8; i-->4;) sched.push(resultDemo(i, false));

	      def.resolve(sched);
	      that.sched = sched;

	  }else def.resolve(that.sched);

	  //});

	  return def.promise;
      };

  });
