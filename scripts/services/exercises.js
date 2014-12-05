'use strict';

angular.module('gft')
  .service('exercises', function($http, $q, usrs){

      var that = this;

// cache the exercises, make them queryable

      this.nameByHash = function(hash){
	  return {
	      hash1:'Pull ups',
	      hash2:'Push ups',
	      hash3:'Crunches'
	  }[hash];
      };

  });
