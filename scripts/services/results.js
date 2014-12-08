'use strict';

angular.module('gft')
  .service('results', function(fakehttp, $q, usrs){

      var that = this;

      this.sched = [];


      this.getByDate = function(start, end){
	  // find the workouts within the dates
	  // return the results in a flat array with exercise and date data
	  var def = $q.defer();

	  that.getSchedule().then(function(sched){
	      def.resolve(sched.filter(function(w){
		  return (w.scheduled > start) && (w.scheduled < end);

	      }).sort(function(m,n){
		  return m.scheduled > n.scheduled;

	      }).map(function(w){
		  return w.exercises.map(function(r, i){
		      return {exercise:r, result:w.results[i], date:w.scheduled};
		  });

	      }).reduce(function(p, c){
		  return p.concat(c);
	      }, []));
	  });

	  return def.promise;
      };


      this.getSchedule = function(options){
	  var def = $q.defer();

	  if(that.sched.length) def.resolve(that.sched);
	  else{
	      fakehttp.get('/schedule').then(function(sched){
// this is where results coagulate into workouts


		  that.sched = sched;
		  def.resolve(that.sched);
	      });
	  }
	  return def.promise;
      };


      this.saveProgress = function(workout){
	  // split out the results
	  
      };

  });
