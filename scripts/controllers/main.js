'use strict';

angular.module('gft')
    .controller('MainCtrl', function($scope){

	$scope.landmarks = {pagetab:'schedule'};
	$scope.setLandmark = function(k,v){
	    if($scope.landmarks[k] === v) return delete $scope.landmarks[k];
	    $scope.landmarks[k] = v;
	};

    });
