'use strict';

angular.module('gft')
.service('fakehttp', function($q){

    // fake data PRO 2000
    var sresults = Array.apply(null, new Array(20)).map(function(n,j){
	return {
	    result_hash:'hash'+j,
	    score:1-Math.floor(j/11),
	    workout:'hash'+(Math.floor(j/3)%4),
	    exercise:'hash'+(j%6),
	    usr:'hash1',
	    date:(new Date(2014, 10, Math.floor(j/3) + 23, 11))
	};
    });

    var wresults = [
	{workout_hash:'hash0',
	 exercises:['hash0', 'hash1', 'hash2']},
	{workout_hash:'hash1',
	 exercises:['hash3', 'hash4', 'hash5']},
	{workout_hash:'hash2',
	 exercises:['hash0', 'hash1', 'hash2']},
	{workout_hash:'hash3',
	 exercises:['hash3', 'hash4', 'hash5']}
    ];

    var things = ['pull up', 'push up', 'sit up', 'lunge', 'step', 'twist'];

    var eresults = Array.apply(null, new Array(6)).map(function(j){
	return {
	    exercise_hash:'hash'+j,
	    flex:Math.random()*100,
	    cardio:Math.random()*100,
	    str:Math.random()*100,
	    duration:Math.random()*22,
	    equipment:[],
	    instructions:''+Math.random()*20+' '+things[j]+'s',
	    media:[]
	};
    });
    // end fake data

    

    var that = this;
    
    var sched = [];

    var shuffle = function(a){
	var ret = [];
	while(a.length) ret.push(a.splice(Math.floor(Math.random()*a.length),1)[0]);
	return ret;
    };

    var resultDemo = function(j, done){
	var ret = {
	    scheduled:(new Date(2014, 10, j + 23, 11)),
	    scheduledduration:30,
	    workout:'hash'+j,
	    usr:'hash',
	    exercises:shuffle(['hash1', 'hash2', 'hash3']),
	    results:done?[Math.floor(Math.random()*1.99),
			  Math.floor(Math.random()*1.99),
			  Math.floor(Math.random()*1.99)]:[],
	    flex:Math.random()*100,
	    cardio:Math.random()*100,
	    str:Math.random()*100
	};
	if(done){
	    ret.fulfilled = (new Date(2014, 10, j + 23, 11));
	    ret.duration = 31;
	}
	return ret;
    };



    var sched = [];
    for(var i=4; i-->0;) sched.push(resultDemo(i, true));
    for(var i=8; i-->4;) sched.push(resultDemo(i, false));


    this.get = function(route){
	var def = $q.defer();

	var ret = [];

	if(route === '/schedule'){

	    var bin = {};

	    for(var i=sresults.length; i-->0;){
		if(!(''+sresults[i].date in bin))
		    bin[''+sresults[i].date] = {results:[sresults[i]]};
		else
		    bin[''+sresults[i].date].results.push(sresults[i]);
	    }

	    for(var date in bin){
		ret.push({
///
//
// format this to the needs of the view
//
///
		});
	    }
	    
	    def.resolve(sched);
	}

	return def.promise;
    };


    this.post = function(route, body){
	var def = $q.defer();

	if(route === '/result'){
	    def.resolve({data:progress});
	}

	return def.promise;
    };


});
