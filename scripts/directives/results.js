'use strict';

angular.module('gft')
  .directive('results', function () {
    return {
	templateUrl: '/topic/xos-angular/scripts/directives/results.html',
	restrict: 'A',
	scope:true,
	transclude:false,
	controller: function($rootScope, $scope, schedules){

	    $scope.landmarks = {};
	    $scope.togglelandmark = function(k,v){
		if($scope.landmarks[k] === v) return delete $scope.landmarks[k];
		$scope.landmarks[k] = v;
	    };

	    // pull results from the schedule

	    $scope.start = new Date(2014, 10, 23, 0, 0, 0, 1);
	    $scope.end = new Date(2014, 10, 29, 23, 59, 59, 999);

	    schedules.get().then(function(){
		schedules.getResults($scope.start, $scope.end).then(function(results){
		    $scope.results = results;
		});
	    });


	}
    };
  });
