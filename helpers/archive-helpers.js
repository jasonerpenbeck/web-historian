var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */
exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public/'),
  'archivedSites' : path.join(__dirname, '../archives/sites/'),
  'list' : path.join(__dirname, '../archives/sites.txt'),
  'fetched': path.join(__dirname, '../archives/sites-fetched.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(file, callback){

  fs.readFile(file, 'utf8',function(err, data){
    callback(err, data);
  });

};

exports.isUrlInList = function(content, matchTo){
  if(content.indexOf(matchTo) >= 0) {
    return true;
  } else {
    return false;
  }
};

exports.addUrlToList = function(file, urlToAdd){

  fs.appendFile(file, urlToAdd, function(err) {
    if(err){
      console.log(err);
    } else {
      console.log('file was saved!');
    }
  });
};

exports.isURLArchived = function(toSearch, callback){
  fs.open(toSearch,'r', function(err,fd) {
    callback(err, fd);
  });
};

exports.downloadUrls = function(url,destination,callback){
  var body = '';
  url = 'http://' + url;

  console.log("url:",url);
  console.log('OG: ',destination);
  http.get(url,function(response){

    response.on('data', function(chunk) {
      body += chunk;
    });

    response.on('error', function(err) {
      console.log('Error while downloading a URL: ',err);
      err = err;
    });

    response.on('end', function() {
      fs.appendFile(destination,body, function(err) {
        if(err) {
          console.log('Here is an error that happened when appending from downloadURL: ', err);
        }
      });
    });
  });
};
