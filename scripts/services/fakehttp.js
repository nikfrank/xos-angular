'use strict';

angular.module('gft')
  .service('fakehttp', function($q){

      var that = this;

      var sched = [];

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



      var sched = [];
      for(var i=4; i-->0;) sched.push(resultDemo(i, true));
      for(var i=8; i-->4;) sched.push(resultDemo(i, false));

      this.getSchedule = function(){
	  var def = $q.defer();
	  def.resolve(sched);
	  return def.promise;
      };

  });
