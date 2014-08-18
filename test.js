var phantom = require('phantom');
var request = require('request');
var fs = require('fs');

// process.args[2] is the :topic/:lesson urlpart

phantom.create(function(ph) {

    var hassent = false;
    var filename = ''+Math.random()*100000000000000000+'.jpg';

    console.log('filename:'+filename);

// make the image named a random thing, then delete it

    (function(pp){
	fs.watch(filename, function (curr, prev) {
	    // from here, we need a one time use hash to put in the request from main app
	    // then the app will check the ip and accept the upload from phantom

	    fs.stat(filename, function (err, stats){

		if(stats.size<10) return;
		if(hassent) return;
		hassent = true;


		process.exit();

//  .pipe(request.post('http://localhost:8117/create/domsnap', function(err, pon, body){
		var rs = fs.createReadStream('test.jpg').pipe(request.post(
		    'http://thatscope.herokuapp.com/create/domsnap', function(err, pon, body){
			
			if(body.indexOf('no') === -1) process.exit();
		    }));
	    });
	});
    })(ph);

  ph.createPage(function(page) {

    page.open("http://localhost:8118/topic/angular/index.html", function(status) {
	page.includeJs("http://localhost:8118/topic/angular/vendor/jquery-1.6.1.min.js", function() {
	page.includeJs("http://thatscope.com/test/"+process.args[2], function() {
	    // include test file from server
	    // pass back on the evaluate
	    // use to automate sendevent calls
	    // then calculate result with scope.calcresult()

	    page.evaluate((function() {
		return [$('#num1').offset(), $('#num2').offset(), testparam];
	    }), function(offsets){

// loop over the events returned from the client script
		page.sendEvent('click', offsets[0].left + 4, offsets[0].top + 4);
		page.sendEvent('keypress', '2');

		page.sendEvent('click', offsets[1].left + 4, offsets[1].top + 4);
		page.sendEvent('keypress', '3');

		var result = page.evaluate(function() {

		    var scope = angular.element(
			document.getElementsByClassName('ng-view-instance')[0]).scope();

		    // run lesson specific tests here

		    $($('button')[0]).trigger('click');

		    return scope.ans;

		});

		console.log('done tests', result, offsets[2]);
// pass the result back to the browser through stdout

		page.render(filename);
		ph.exit();//process.exit();?
	    });
	});
	});

    });
  });
});
