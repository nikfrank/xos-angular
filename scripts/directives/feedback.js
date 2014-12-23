'use strict';

angular.module('gft')
  .directive('feedback', function () {
    return {
	templateUrl: '/topic/xos-angular/scripts/directives/feedback.html',
	restrict: 'A',
	scope:true,
	transclude:false,
	controller: function($rootScope, $scope, results, exercises){

	    $scope.landmarks = {tab:'recent'};
	    $scope.setLandmark = function(k,v){
		$scope.landmarks[k] = v;
	    };

	    // pull results from the schedule

	    $scope.start = new Date(2014, 10, 23, 0, 0, 0, 1);
	    $scope.end = new Date(2015, 10, 29, 23, 59, 59, 999);

	    $scope.results = [];

	    results.getByDate($scope.start, $scope.end).then(function(results){
		$scope.results = results;
	    });

	    $scope.exerciseName = exercises.nameByHash;

	}
    };
  });
