'use strict';

angular.module('gft')
  .directive('workout', function () {
    return {
	templateUrl: '/scripts/directives/workout.html',
	restrict: 'A',
	scope:true,
	transclude:false,
	controller: function($rootScope, $scope) {

	    $scope.landmarks = {};
	    $scope.togglelandmark = function(k,v){
		if($scope.landmarks[k] === v) return delete $scope.landmarks[k];
		$scope.landmarks[k] = v;
	    };

	}
    };
  });
