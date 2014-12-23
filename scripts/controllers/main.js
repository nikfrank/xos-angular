'use strict';

angular.module('gft')
    .controller('MainCtrl', function($scope){

	$scope.landmarks = {pagetab:'schedule'};
	$scope.setLandmark = function(k,v){
	    $scope.landmarks[k] = v;
	};

    });
