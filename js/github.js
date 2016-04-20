var page = require('webpage').create();

var system = require('system');
console.log("start");

page.onConsoleMessage = function(msg) {
    system.stderr.writeLine('console: ' + msg);
};

page.viewportSize = { width: 1280, height: 768 };
page.open('http://github.com/', function(status) {
	if ( status === "success" ) {
		console.log(status);
		if (page.injectJs("vendor/jquery-1.12.0.min.js")) {
			page.evaluate(function() {
			    $("a").each(function(index){
			      	console.log(this);
			    //   	var phantom = require('webpage');
			    //   	phantom.create().then(function (ph) {
					  // ph.createPage().then(function (page) {
					  	var page = require('webpage').create();
					    page.openUrl(this, function (status) {
			      			page.render(this + ".png");
			      			page.exit()
			      		});
					// });
			      	// });
			    });
			phantom.exit();
			});
	  	} else {
	  		console.log("js not included");
	  		phantom.exit();
	  	}
	}
});