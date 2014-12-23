'use strict';

angular.module('gft')
  .directive('feedback', function () {
    return {
	templateUrl: '/topic/xos-angular/scripts/directives/feedback.html',
	restrict: 'A',
	scope:true,
	transclude:false,
	controller: function($rootScope, $scope, results, exercises){

	    var ctx, dateChart;

	    $scope.landmarks = {tab:'recent'};
	    $scope.setLandmark = function(k,v){
		$scope.landmarks[k] = v;
// push the chart?
		
		var start = (new Date);
		start.setDate(start.getDate()-start.getDay()-6);
		start.setHours(0,0,0,1);

		var end = (new Date);
		end.setHours(23,59,59,999);

		results.getByDate(start, end).then(function(rpon){
		    // grab data from the results service
		    var options = {};
console.log(rpon);

// flexercise done/not done
// strength done/not done
// cardio done/not done

		    var done = [0,0,0];
		    var notdone = [0,0,0];

		    for(var i=rpon.length; i-->0;){
			if(rpon[i].result.score){
			    // rpon.exercise.[cardio,str,flex]
			    done[0] += rpon[i].exercise.cardio;
			    done[1] += rpon[i].exercise.flex;
			    done[2] += rpon[i].exercise.str;
			}else{
			    notdone[0] += rpon[i].exercise.cardio;
			    notdone[1] += rpon[i].exercise.flex;
			    notdone[2] += rpon[i].exercise.str;
			}
			
		    }


		    var data = [
			{
			    value: done[0],
			    color:"#F01a1a",
			    highlight: "#FF3A3a",
			    label: "cardio done"
			},
			{
			    value: notdone[0],
			    color:"#a07a7a",
			    highlight: "#af8a8a",
			    label: "cardio not done"
			},
			{
			    value: done[1],
			    color: "#1af0f0",
			    highlight: "#3Affff",
			    label: "flex done"
			},
			{
			    value: notdone[1],
			    color: "#7aa0a0",
			    highlight: "#8aafaf",
			    label: "flex not done"
			},
			{
			    value: done[2],
			    color: "#f0f01a",
			    highlight: "#ffff3a",
			    label: "strength done"
			},
			{
			    value: notdone[2],
			    color: "#a0a07a",
			    highlight: "#afaf8a",
			    label: "strength not done"
			}
		    ];

		    setTimeout(function(){
			ctx = document.getElementById("dateChart").getContext("2d");
			ctx.height="400"; ctx.width="300";

			dateChart = new Chart(ctx).Doughnut(data, options);
		    },50);
		})
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
