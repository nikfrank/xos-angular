'use strict';

angular.module('gft')
  .service('exercises', function(fakehttp, $q, usrs){

      var that = this;

      var exercises = [];
      var hashIndex = {};


      // use these to buffer requests for hashes

      var timeoutLength = 400;

      var hashTimeout;
      // holds timeout ref for the actual requests

      var hashPromises = [];
      // [{missing:['',..], hashes:['',..], def:{..}}, deref:true..]

      // timeout nulls hashTimeout, requests all missing, resolves promises
      var responder = function(){
	  hashTimeout = null;

	  var allMissing = [];

	  // concat unique missing hashes
	  for(var i=hashPromises.length; i-->0;)
	      for(var j=hashPromises[i].missing.length; j-->0;)
		  if(allMissing.indexOf(hashPromises[i].missing[j]) === -1)
		      allMissing.push(hashPromises[i].missing[j]);

	  fakehttp.post('/exercises', {exercise_hash:{_$any:allMissing}}).then(function(pon){
	      // append them to [], insert into {}
	      for(var i=pon.data.length; i-->0;){
		  if(!(pon.data[i].exercise_hash in hashIndex)){
		      exercises.push(pon.data[i]);
		      hashIndex[pon.data[i].exercise_hash] = exercises[exercises.length-1];
		  }
	      }

	      for(var i=hashPromises.length; i-->0;){
		  var thp = hashPromises[i];

		  if(!thp.deref) thp.def.resolve(thp.hashes.map(function(h){ return hashIndex[h];}));
		  else thp.def.resolve(thp.hashes.map(function(h){ return hashIndex[h];})[0]);
	      }

	      hashPromises = []; // clear the promises
	  });
      }



      // cache the exercises, make them queryable
      this.getByHash = function(hashOrHashes){
	  var def = $q.defer();

	  var hashes, deref = false;
	  if(typeof hashOrHashes === 'string'){
	      hashes = [hashOrHashes];
	      deref = true;
	  }
	  else hashes = hashOrHashes;

	  var missing = hashes.filter(function(h){ return !(h in hashIndex);});

	  if(!missing.length){
	      // return an array only if passed one
	      if(!deref) def.resolve(hashes.map(function(h){ return hashIndex[h];}));
	      else def.resolve(hashes.map(function(h){ return hashIndex[h];})[0]);
	  }else{
	      // grab the missing ones from the db, queue the request
	      if(hashTimeout) clearTimeout(hashTimeout);

	      hashPromises.push({def:def, deref:deref, missing:missing, hashes:hashes});
	      hashTimeout = setTimeout(responder, timeoutLength);
	  }
	   return def.promise;
      };

  });
