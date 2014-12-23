'use strict';

angular.module('gft')
  .directive('create', function () {
    return {
	templateUrl: '/topic/xos-angular/scripts/directives/create.html',
	restrict: 'A',
	scope:true,
	transclude:false,
	controller: function($scope, workouts){

	    $scope.landmarks = {tab:'add'};
	    $scope.setLandmark = function(k,v){
		$scope.landmarks[k] = v;
	    };

	    workouts.get().then(function(workouts){
		console.log(workouts);
		$scope.workouts = workouts;
	    });

	    // for adding a workout to the schedule

	    // show the list of workouts to add
	    // allow the user to swap out exercises
	    // then add it to the schedule (push update through schedule service)


	    // for adding an exercise to the library

	    // form intake data - picture?


	}
    };
  });
