'use strict';

angular.module('gft')
  .directive('feedback', function () {
    return {
	templateUrl: '/topic/xos-angular/scripts/directives/feedback.html',
	restrict: 'A',
	scope:true,
	transclude:false,
	controller: function($rootScope, $scope, results, exercises){

	    var ctx, chartType, charts = {};

	    Chart.defaults.global.animation = false;
	    Chart.defaults.global.tooltipTemplate = "<%if (label){%><%=label%> <%}%>";


	    $scope.landmarks = {tab:'recentChart', since:'week'};
	    $scope.setLandmark = function(k,v){
		$scope.landmarks[k] = v;
	    };

	    $scope.$watch('landmarks', function(n,o){
		if(!n) return;
	
// get data (by date, by exercises)
// bin, cache the data as necc
// put the chart
// change the color if 100%

		var dataP;

		if(n.tab==='recentChart'){
		    var start = (new Date);
		    var end = (new Date);

		    start.setHours(0,0,0,1);
		    end.setHours(0,0,0,1);
		    
		    if($scope.landmarks.since === 'week'){
			start.setDate(start.getDate()-start.getDay());
			end.setDate(start.getDate()-start.getDay()+7);
			end.setHours(23,59,59,999);
		    }else if($scope.landmarks.since === 'weeks')
			start.setDate(start.getDate()-14);
		    else if($scope.landmarks.since === 'month')
			start.setDate(start.getDate()-31);


		    $scope.start = start; $scope.end = end;
		    
		    dataP = results.getByDate(start, end);

		    chartType = 'Doughnut';

		}else if (n.tab === 'dateChart'){
		    
		    // grab all the data, bin by day then do a rolling average

		    dataP = results.getSchedule();

		    chartType = 'Doughnut';//?

		}else if (n.tab === 'exerciseChart'){
		    
		    // grab all data, bin by exercise - bar chart?

		    dataP = results.getSchedule();

		    chartType = 'Doughnut';//?

		}

		dataP.then(function(rpon){
		    // grab data from the results service
		    var options = {}, data;

		    if(n.tab === 'recentChart'){
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

			data = [
			    {value: done[0], color:"#F01a1a", highlight: "#FF3A3a",
			     label: "cardio done "+
			     (100*done[0]/(done[0]+notdone[0])).toFixed(0)+'%'},

			    {value:notdone[0], color:"#a05a5a", highlight:"#af8a8a",
			     label:"cardio not done "+
			     (100*notdone[0]/(done[0]+notdone[0])).toFixed(0)+'%'},

			    {value: done[1],color: "#1af01a",highlight: "#3Aff3a",
			     label: "flex done "+
			     (100*done[1]/(done[1]+notdone[1])).toFixed(0)+'%'},

			    {value: notdone[1],color: "#5aa05a",highlight:"#8aaf8a",
			     label:"flex not done "+
			     (100*notdone[1]/(done[1]+notdone[1])).toFixed(0)+'%'},

			    {value: done[2],color: "#f0f01a",highlight: "#ffff3a",
			     label: "strength done "+
			     (100*done[2]/(done[2]+notdone[2])).toFixed(0)+'%'},

			    {value:notdone[2],color:"#a0a05a",highlight:"#afaf8a",
			     label:"strength not done "+
			     (100*notdone[2]/(done[2]+notdone[2])).toFixed(0)+'%'},
			];

		    }else if(n.tab === 'dateChart'){
			// format data for a triple line chart

		    }else if(n.tab === 'exerciseChart'){
			// format data for a radar chart
		    }

		    setTimeout(function(){
			ctx = document.getElementById(n.tab).getContext("2d");

			if(charts[n.tab]){
			    charts[n.tab].destroy();
			    // workaround for rescaling bug in chart.js
			    document.getElementById(n.tab).height = "400";
			    document.getElementById(n.tab).width = "300";
			}

			// set the type of chart by the tab

			charts[n.tab] = new Chart(ctx)[chartType](data, options);

		    },50);
		})
	    }, true);

	    $scope.exerciseName = exercises.nameByHash;

	}
    };
  });
