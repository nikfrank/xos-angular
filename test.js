var phantom = require('phantom');
var request = require('request');
var fs = require('fs');

//var request = require('request');
phantom.create(function(ph) {

    var hassent = false;

    (function(pp){
	fs.watch('test.jpg', function (curr, prev) {
	    // from here, we need a one time use hash to put in the request from main app
	    // then the app will check the ip and accept the upload from phantom
console.log('checking file');

	    fs.stat('test.jpg', function (err, stats) {

		console.log(stats.size, 'starting upload?');
		if(stats.size<10) return;
		if(hassent) return;
		hassent = true;

		var rs = fs.createReadStream('test.jpg')
    .pipe(request.post('http://thatscope.herokuapp.com/create/domsnap', function(err, pon, body){
//	    .pipe(request.post('http://localhost:8117/create/domsnap', function(err, pon, body){
			console.log('done');
			console.log(typeof body);
			if(body.indexOf('no') === -1) process.exit();
		    }));

	    });
	});
    })(ph);

  ph.createPage(function(page) {

    page.open("http://localhost:8118/topic/angular/index.html", function(status) {
	page.includeJs("http://localhost:8118/topic/angular/vendor/jquery-1.6.1.min.js", function() {
	    console.log(status);
	    

	    page.evaluate((function() {
		return [$('#num1').offset(), $('#num2').offset()];
	    }), function(offsets){
console.log('doing tests');
		page.sendEvent('click', offsets[0].left + 4, offsets[0].top + 4);
		page.sendEvent('keypress', '2');

		page.sendEvent('click', offsets[1].left + 4, offsets[1].top + 4);
		page.sendEvent('keypress', '3');

console.log('done typing');
		var result = page.evaluate(function() {

		    var scope = angular.element(
			document.getElementsByClassName('ng-view-instance')[0]).scope();

		    // run lesson specific tests here

		    $($('button')[0]).trigger('click');

		    return scope.ans;

		});

		console.log('done tests', result);

		page.render('test.jpg');
		ph.exit();
	    });
	});


    });
  });
});
