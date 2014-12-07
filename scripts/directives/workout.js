'use strict';

angular.module('gft')
  .directive('workout', function () {
    return {
	templateUrl: '/topic/xos-angular/scripts/directives/workout.html',
	restrict: 'A',
	scope:{workout:'='},
	transclude:false,
	controller: function($rootScope, $scope, exercises){

	    $scope.close = function(){
		$scope.$parent.closeWorkout();
		$scope.pauseWorkout();
	    };

	    $scope.noclose = function(e){
		e.stopPropagation();	
	    };

	    $scope.exerciseName = exercises.nameByHash;

	    $scope.inprogress = false;

	    $scope.pauseWorkout = function(){
		$scope.inprogress = false;
		// save progress?
	    };

	    $scope.startWorkout = function(){
		$scope.inprogress = true;
	    };

	}
    };
  });
