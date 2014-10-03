// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.

var archive = require('../helpers/archive-helpers');
var fs = require('fs');

archive.readListOfUrls(archive.paths.list, function(err, data){
  if(err){
    console.log("ERROR", err);
  } else {

    var arrayOfSites = data.trim().split('\n');

    for(var i = 0; i < arrayOfSites.length; i++) {
      archive.downloadUrls(arrayOfSites[i], archive.paths.archivedSites + arrayOfSites[i]);
    }
  }
});


