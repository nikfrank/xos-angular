'use strict';

angular.module('gft')
  .directive('workout', function () {
    return {
	templateUrl: '/topic/xos-angular/scripts/directives/workout.html',
	restrict: 'A',
	scope:{workout:'='},
	transclude:false,
	controller: function($rootScope, $scope, exercises, results){

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
		results.saveProgress($scope.workout);
		
	    };

	    $scope.startWorkout = function(){
		$scope.inprogress = true;
	    };


	    $scope.doneExercise = function(result){
		result.score = 1;
	    };

	    $scope.$watch('workout', function(n){
		if(!n) return;
		$scope.flexStyle = {
		    width:Math.min(67,$scope.workout.flex/3)+'%',
		    height:'14px',
		    display:'inline-block',
		    backgroundColor:'green'
		};

		$scope.strStyle = {
		    width:Math.min(67,$scope.workout.str/3)+'%',
		    height:'14px',
		    display:'inline-block',
		    backgroundColor:'yellow'
		};

		$scope.cardioStyle = {
		    width:Math.min(67,$scope.workout.cardio/3)+'%',
		    height:'14px',
		    display:'inline-block',
		    backgroundColor:'red'
		};

	    });

	}
    };
  });
