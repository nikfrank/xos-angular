'use strict';

angular.module('calculator')
    .controller('Ctrl', function($scope){

	$scope.num1 = 0;
	$scope.num2 = 0;

	$scope.ans = 0;

	$scope.add = function(){
	    alert('the typeof num1 is '+(typeof $scope.num1)+' and num2 is a '+(typeof $scope.num2));
	    $scope.ans = $scope.num1 + $scope.num2;
	};

	$scope.sub = function(){
	    $scope.ans = $scope.num1 - $scope.num2;
	};

	$scope.div = function(){
	    $scope.ans = $scope.num1 / $scope.num2;
	};

	$scope.mul = function(){
	    $scope.ans = $scope.num1 * $scope.num2;
	};

    });
