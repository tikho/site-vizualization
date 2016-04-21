var page = require('webpage').create();

var system = require('system');
console.log("start");

page.onConsoleMessage = function(msg) {
    system.stderr.writeLine('console: ' + msg);
};

// page.viewportSize = { width: 1280, height: 768 };
// page.open('http://github.com/', function(status) {
// 	if ( status === "success" ) {
// 		console.log(status);
// 		if (page.injectJs("vendor/jquery-1.12.0.min.js")) {
// 			page.evaluate(function() {
// 			    $("a").each(function(index){
// 			      	console.log(this);
// 			    //   	var phantom = require('webpage');
// 			    //   	phantom.create().then(function (ph) {
// 					  // ph.createPage().then(function (page) {
// 					  	var page = require('webpage').create();
// 					    page.openUrl(this, function (status) {
// 			      			page.render(this + ".png");
// 			      			page.exit()
// 			      		});
// 					// });
// 			      	// });
// 			    });
// 			phantom.exit();
// 			});
// 	  	} else {
// 	  		console.log("js not included");
// 	  		phantom.exit();
// 	  	}
// 	}
// });


max_deepness = 1;

// function next_page(){
//     var page=pages.shift();
//     if(!page){phantom.exit(0);}
//     handle_page(pages);
// }

handle_page('http://github.com/', 0);

function handle_page(url, deepness){
	if (deepness >= 1){
    	phantom.exit(0);
    }
        	console.log("currentdeepness = " + deepness);

    var currentdeepness = deepness;
    page.open(url,function(currentdeepness){
    	// console.log("currentdeepness = " + currentdeepness);
    	// if (page.injectJs("vendor/jquery-1.12.0.min.js")) {
    	// if (status === "success"){
		    var links = page.evaluate(function() {
		        return [].map.call(document.querySelectorAll('a'), function(link) {
		            return link.getAttribute('href');
		        });
		    });
		        console.log(links.join('\n'));
		        for (var i = links.length - 1; i >= 0; i--) {
		        	handle_page(links[i], currentdeepness++);
		        	page.render(links[i] + ".png");
		        }
	        // console.log("rendering " + url + ".png");
	        // page.render(url + ".png");
	        // setTimeout(next_page,100);
	        phantom.exit(0);
    	// }
    	// }
	}, currentdeepness);
}

page.onError = function (msg, trace) {
    console.log(msg);
    trace.forEach(function(item) {
        console.log('  ', item.file, ':', item.line);
    });
};


page.onResourceError = function(resourceError) {
  console.log('Unable to load resource (#' + resourceError.id + 'URL:' + resourceError.url + ')');
  console.log('Error code: ' + resourceError.errorCode + '. Description: ' + resourceError.errorString);
};	
