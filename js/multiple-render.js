// Render Multiple URLs to file

"use strict";
var RenderUrlsToFile, arrayOfUrls, system;

system = require("system");

/*
Render given urls
@param array of URLs to render
@param callbackPerUrl Function called after finishing each URL, including the last URL
@param callbackFinal Function called after finishing everything
*/

var max_deepness = 2;

RenderUrlsToFile = function(urls, callbackPerUrl, callbackFinal, deepness, max_deepness) {
    var getFilename, next, page, retrieve, urlIndex, webpage;
    urlIndex = 0;
    webpage = require("webpage");
    page = null;
    getFilename = function(url) {
        return "rendered/" + urlIndex + ".png";
    };
    next = function(status, url, file) {
        page.close();
        callbackPerUrl(status, url, file);
        return retrieve();
    };

    retrieve = function() {
        var url;

        if (urls.length > 0) {
            url = urls.shift();
            urlIndex++;
            page = webpage.create();
            page.viewportSize = {
                width: 800,
                height: 600
            };
            page.settings.userAgent = "Phantom.js bot";
            return page.open(url, function(status) {
                var file;
                file = getFilename(url);
                if (status === "success") {
                    return window.setTimeout((function() {
                        page.render(file);
                        var links = page.evaluate(function() {
                            return [].map.call(document.querySelectorAll('a'), function(link) {
                                return link.getAttribute('href');
                            });
                        });
                        RenderUrlsToFile(links, callbackPerUrl, callbackFinal, deepness++, max_deepness);
                        return next(status, url, file);
                    }), 1000);
                } else {
                    return next(status, url, file);
                }
            });
        } else {
             if (deepness > max_deepness){
                return callbackFinal();
            }
            return;
        }
    };
    return retrieve();
};

arrayOfUrls = null;

if (system.args.length > 1) {
    arrayOfUrls = Array.prototype.slice.call(system.args, 1);
} else {
    console.log("Usage: phantomjs render_multi_url.js [domain.name1, domain.name2, ...]");
    arrayOfUrls = ["http://www.artlebedev.ru"];
}

RenderUrlsToFile(arrayOfUrls, (function(status, url, file) {
    if (status !== "success") {
        return console.log("Unable to render '" + url + "'");
    } else {
        return console.log("Rendered '" + url + "' at '" + file + "'");
    }
}), function() {
    return phantom.exit();
}, 0, max_deepness);