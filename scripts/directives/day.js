'use strict';

angular.module('gft')
  .directive('day', function () {
    return {
	templateUrl: '/scripts/directives/day.html',
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
