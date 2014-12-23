'use strict';

angular.module('gft')
  .directive('calendar', function () {
    return {
	templateUrl: '/topic/xos-angular/scripts/directives/calendar.html',
	restrict: 'A',
	scope:true,
	transclude:false,
	controller: function($scope, results){

	    $scope.landmarks = {};
	    $scope.setLandmark = function(k,v){
		$scope.landmarks[k] = v;
	    };


	    $scope.dayNames = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];

	    var curr = new Date;
	    $scope.weeks = [];

	    for(var i=4; i-->0;){
		(function(j){
		    var week = {};
		    week.start = new Date;
		    week.start.setDate(curr.getDate()-curr.getDay()-j*7);
		    week.start.setHours(0,0,0,1);
		    
		    week.end = new Date;
		    week.end.setDate(curr.getDate()-curr.getDay()+6-j*7);
		    week.end.setHours(23,59,59,999);

		    $scope.weeks[j] = week;
		})(i);
	    }

	    var wcache = {};

	    var calcWorkoutsDuring = function(day, week, force){
		if((''+day+'||'+week.start in wcache)&&(!force)){
		    return wcache[''+day+'||'+week.start];
		}
		var ret = [];
		for(var i=($scope.workouts||[]).length; i-->0;){
		    var sc = $scope.workouts[i].scheduled;
		    if((sc<week.end) && (sc>week.start) && (sc.getDay() === day))
			ret.push($scope.workouts[i]);
		}
		wcache[''+day+'||'+week.start] = ret;
		return ret;
	    };

	    $scope.workoutsDuring = []; // [week.start][dayNumber]


	    results.getSchedule().then(function(workouts){
		$scope.workouts = workouts;
		$scope.currentWorkout = {};

		for(var i=$scope.weeks.length; i-->0;){
		    $scope.workoutsDuring[$scope.weeks[i].start] = [];
		    for(var j=0; j<7; ++j){
			$scope.workoutsDuring[$scope.weeks[i].start][j] =
			    calcWorkoutsDuring(j, $scope.weeks[i], true);
		    }
		}
	    });


	    $scope.openWorkout = function(workout){
		$scope.setLandmark('workout', workout);
		$scope.currentWorkout = workout;
	    };

	    $scope.closeWorkout = function(){
		$scope.setLandmark('workout', null);
	    };

	}
    };
  });
