'use strict';

angular.module('gft')
  .directive('day', function () {
    return {
	templateUrl: '/topic/xos-angular/scripts/directives/day.html',
	restrict: 'A',
	scope:{
	    workouts:'=day'
	},
	transclude:false,
	controller: function($scope){

	    // day needs to be inside a week?
	    $scope.week = $scope.$parent.week;
	    var dayOfWeek = $scope.$parent.$index;
	    
	    var today = new Date($scope.week.start);
	    today.setDate($scope.week.start.getDate() + dayOfWeek);

	    $scope.day = today.getDate();
	    $scope.month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'
			   ][today.getMonth()];

	    $scope.popWorkout = function(workout, e){
		e.stopPropagation();
		$scope.$parent.openWorkout(workout);
	    };

	    $scope.makeWorkout = function(day){
		console.log('make on ', day);
	    };

	}
    };
  });
