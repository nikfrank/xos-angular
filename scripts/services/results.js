'use strict';

angular.module('gft')
  .service('results', function(fakehttp, $q, usrs, exercises){

      var that = this;

      this.sched = [];


      this.saveProgress = function(workout){
	  // split out the results
	  that.sched.filter(function(w){1
	      return w.scheduled === workout.scheduled;

	  })[0].results.forEach(function(r, i){
	      r.score = workout.results[i].score;
	  });
      };

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


      this.getSchedule = function(){
	  var def = $q.defer();
// perhaps there should be an options to filter by date
// then it would cache parts of the schedule

	  if(that.sched.length) def.resolve(that.sched);
	  else{
	      fakehttp.get('/results').then(function(pon){
		  var ehashes = [];
		  for(var i=pon.data.length; i-->0;)
		      if(ehashes.indexOf(pon.data[i].exercise)===-1)
			  ehashes.push(pon.data[i].exercise);

		  exercises.getByHash(ehashes).then(function(epon){
		      // bin pon.data by date
		      var wbin = {};
		      for(var i=pon.data.length; i-->0;){
			  if(!(''+pon.data[i].date in wbin))
			      wbin[''+pon.data[i].date] = {results:[pon.data[i]]};
			  else
			      wbin[''+pon.data[i].date].results.push(pon.data[i]);
		      }

		      var eindex = {};
		      for(var j=epon.length; j-->0;) eindex[epon[j].exercise_hash] = epon[j];

		      // slap epon onto wbin.exercise
		      that.sched = Object.keys(wbin).map(function(date){
			  return{
			      results: wbin[date].results.map(function(r){
				  return {
				      date:r.date,
				      score:r.score,
				      result_hash:r.result_hash,
				      usr:r.usr,
				      workout:r.workout,
				      exercise:eindex[r.exercise]
				  }
			      }),
			      exercises:wbin[date].results.map(function(r){
				  return eindex[r.exercise];
			      }),
			      scheduled:wbin[date].results[0].date,
			      usr:wbin[date].results[0].usr,
			      workout_hash:wbin[date].results[0].workout,
			      str:wbin[date].results.reduce(function(p, r){
				  return p + eindex[r.exercise].str;
			      }, 0),
			      flex:wbin[date].results.reduce(function(p, r){
				  return p + eindex[r.exercise].flex;
			      }, 0),
			      cardio:wbin[date].results.reduce(function(p, r){
				  return p + eindex[r.exercise].cardio;
			      }, 0),
			      duration:wbin[date].results.reduce(function(p, r){
				  return p + eindex[r.exercise].duration;
			      }, 0)
			  };
		      });

		      def.resolve(that.sched);

		  });

	      });
	  }
	  return def.promise;
      };

  });
