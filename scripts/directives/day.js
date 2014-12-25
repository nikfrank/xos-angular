'use strict';

angular.module('gft')
  .directive('day', function () {
    return {
	templateUrl: '/topic/xos-angular/scripts/directives/day.html',
	restrict: 'A',
	scope:{
	    workouts:'=day'
	},
	transclude:false,
	controller: function($scope){

	    // day needs to be inside a week?
	    $scope.week = $scope.$parent.week;
	    var dayOfWeek = $scope.$parent.$index;
	    
	    var today = new Date($scope.week.start);
	    today.setDate($scope.week.start.getDate() + dayOfWeek);

	    $scope.day = today.getDate();
	    $scope.month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'
			   ][today.getMonth()];

	    $scope.popWorkout = function(workout, e){
		e.stopPropagation();
		$scope.$parent.openWorkout(workout);
	    };

	    $scope.makeWorkout = function(day){
		console.log('make on ', day);
	    };


// this watch should self destruct
	    $scope.$watch('workouts', function(n,o){
		if(!n) return;
		if(n.length){
		    
		    var types = n.reduce(function(p,c){
			p.flex += c.flex;
			p.str += c.str;
			p.cardio += c.cardio;
			
			return p;

		    }, {flex:0, str:0, cardio:0});

		    var maxtval = Math.max(types.str, types.flex, types.cardio);

		    if(maxtval === types.flex){
			$scope.dayclass = 'busy-day-flex';
		    }else if(maxtval === types.str){
			$scope.dayclass = 'busy-day-str';
		    }else if(maxtval === types.cardio){
			$scope.dayclass = 'busy-day-cardio';
		    }

		}else{
		    $scope.dayclass = '';
		}
	    });

	}
    };
  });
