// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.

var archive = require('../helpers/archive-helpers');
var fs = require('fs');

archive.readListOfUrls(archive.paths.list, function(err, data){
  if(err){
    console.log("ERROR", err);
  } else {
    // console.log(JSON.parse(data));

    var arrayOfSites = data.trim().split('\n');

    for(var i = 0; i < arrayOfSites.length; i++) {
      console.log('After lunch, we will fetch: ',arrayOfSites[i]);

      var dest = archive.paths.archivedSites + arrayOfSites[i];

      archive.downloadUrls(arrayOfSites[i], dest);

      // archive.downloadUrls(arrayOfSites[i], dest , function(err,data) {
      //   if(err) {
      //     console.log('callback error within Fetcher',err);
      //   } else {
      //     fs.appendFile(dest, data , function(err) {
      //       if(err) {
      //         console.log('Append File Error within downloadUrls function: ',err);
      //       } else {
      //         console.log('Write something to: ',dest);
      //       }
      //     });
      //   }
      // });
    }
  }
});


