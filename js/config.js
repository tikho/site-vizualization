var scraper = function() {
  var links = $('a')
  links = links.map(function(index, elem) { 
    return $(elem).text()
  }).toArray()
  return links
};

pjs.addSuite({
    // single URL or array
    url: 'https://www.artlebedev.ru/',
    moreUrls: function() {
        return _pjs.getAnchorUrls('a', false);
    },
    maxDepth: 1,
    // single function or array, evaluated in the client
    scraper: scraper
});
