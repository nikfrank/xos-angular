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

	    console.log($scope.workouts);

	}
    };
  });
