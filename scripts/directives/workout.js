'use strict';

angular.module('gft')
  .directive('workout', function () {
    return {
	templateUrl: '/topic/xos-angular/scripts/directives/workout.html',
	restrict: 'A',
	scope:{workout:'='},
	transclude:false,
	controller: function($rootScope, $scope, exercises){

	    console.log($scope.exercises);

	    $scope.close = $scope.$parent.closeWorkout;
	    $scope.noclose = function(e){
		e.stopPropagation();	
	    };

	    $scope.exerciseName = exercises.nameByHash;

	}
    };
  });
