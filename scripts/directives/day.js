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

	    console.log($scope.$parent.week, $scope.$parent.$index);

	    // day needs to be inside a week?
	    $scope.week = $scope.$parent.week;
	    var dayOfWeek = $scope.$parent.$index;
	    $scope.day = $scope.week.start.getDate() + dayOfWeek;

	    console.log($scope.workouts);

	}
    };
  });
