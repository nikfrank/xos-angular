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
	    date:(new Date(2014, 11, Math.floor(j/3) + 13, 11))
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

    var eresults = Array.apply(null, new Array(6)).map(function(n,j){
	return {
	    exercise_hash:'hash'+j,
	    name:things[j],
	    flex:Math.random()*100,
	    cardio:Math.random()*100,
	    str:Math.random()*100,
	    duration:Math.floor(Math.random()*35)/2,
	    equipment:[],
	    instructions:''+Math.floor(Math.random()*15 + 5)+' '+things[j]+'s',
	    media:[]
	};
    });
    var eindex = {};
    for(var i=eresults.length; i-->0;) eindex[eresults[i].exercise_hash] = eresults[i];
    // end fake data

    var that = this;
    

    this.get = function(route){
	var def = $q.defer();

	var ret = [];

	if(route === '/results'){
	    def.resolve({data:sresults});

	}else if(route === '/workouts'){
	    def.resolve({data:wresults});
	}

	return def.promise;
    };


    this.post = function(route, body){
	var def = $q.defer();

	if(route === '/result'){
	    def.resolve({data:progress});

	}else if(route === '/exercises'){
	    // return from eresults
	    var hashes = body.exercise_hash._$any; // mocking the db manager
	    def.resolve({data:hashes.map(function(h){ return eindex[h];})});
	}

	return def.promise;
    };
});
