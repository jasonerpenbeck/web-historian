// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.


var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// var url = require('url');
// var path = require('path');
// var headers = require('./http-helpers');



archive.readListOfUrls(archive.paths.list, function(err, data){
  if(err){
    console.log("ERROR", err);
  } else {
    // console.log(JSON.parse(data));

    var arrayOfSites = data.trim().split('\n');

    for(var i = 0; i < arrayOfSites.length; i++) {
      console.log('After lunch, we will fetch: ',arrayOfSites[i]);
    }


    fs.appendFile(archive.paths.fetched, data, function(err){
          if(err){
            console.log(err);
          }
    });
  }
});


