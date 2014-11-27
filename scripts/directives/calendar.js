'use strict';

angular.module('gft')
  .directive('calendar', function () {
    return {
	templateUrl: '/topic/xos-angular/scripts/directives/calendar.html',
	restrict: 'A',
	scope:true,
	transclude:false,
	controller: function($scope, schedules) {

	    $scope.landmarks = {};
	    $scope.togglelandmark = function(k,v){
		if($scope.landmarks[k] === v) return delete $scope.landmarks[k];
		$scope.landmarks[k] = v;
	    };


	    // pull the schedule from the schedule service
	    // attach to schedule directive

	    $scope.dayNames = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];

	    schedules.get().then(function(workouts){
		$scope.workouts = workouts;
		
		// push all weeks containing workouts to the schedule
		// convert the dates into javascript objects

	    });

	    var curr = new Date;
	    $scope.weeks = [];

	    for(var i=6; i-->0;){
		(function(j){
		    var week = {};
		    week.start = new Date;
		    week.start.setDate(curr.getDate()-curr.getDay()-j*7);
		    
		    week.end = new Date;
		    week.end.setDate(curr.getDate()-curr.getDay()+6-j*7);

		    $scope.weeks[j] = week;
		})(i);
	    }

	    var wcache = {};

	    $scope.workoutsDuring = function(day, week, force){
		if((''+day+'||'+week in wcache)&&(!force)) return wcache[''+day+'||'+week];
		var ret = [];
		for(var i=$scope.workouts.length; i-->0;){
		    var sc = $scope.workouts[i].scheduled;
		    if((sc<week.end) && (sc>week.start) && (sc.getDay() === day))
			ret.push($scope.workouts[i]);
		}
		wcache[''+day+'||'+week] = ret;
		return ret;
	    };


	}
    };
  });
