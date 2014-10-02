var path = require('path');
var archive = require('../helpers/archive-helpers');
var headers = require('./http-helpers');
var fs = require('fs');
var url = require('url');
// require more modules/folders here!

exports.handleRequest = function (req, res, statusCode) {

  var filePath = '../web/public/index.html';

  var actions = {

    GET: function(req, res){
      if(req.url === '/') {
        fs.readFile(filePath, 'utf8', function(err, data) {
          if(err){
            console.log(err);
          } else {

            headers.sendData(res, data, 200);
          }
        });
      } else {
        headers.sendData(res, null, 404);
      }

    },

    POST: function(req, res){

      var loadingPath = '../web/public/loading.html';
      var sitesPath = '../archives/sites.txt';
      var currentPath = '../archives/sites/';

      var msg = '';
      var searchURL;

      req.on('data', function(chunk){
        msg += chunk;
      });

      req.on('end', function(){

        msg = decodeURIComponent(msg);

        if(msg.slice(4,8) === 'http') {
          searchURL = archive.paths.archivedSites + msg.slice(msg.indexOf('//') + 2);
        } else {
          searchURL = archive.paths.archivedSites + msg;
        }

/*         console.log('searchURL: ',searchURL); */

    // handle whether URL is already archived
        if(archive.isURLArchived(searchURL, function(err, fd){
          if(err) {
            return false;
          } else {
            return true;
          } }))

           {
            console.log('File exists.  Send it BACK!');

            fs.readFile(archive.paths.archivedSites + 'searchURL', 'utf8', function(err, data) {
            if(err){
              console.log(err);
            } else {
              headers.sendData(res, data, 200);
            }
          });


          } else {

            console.log('File does not exist.  Add to sites.txt');
            headers.sendData(res, loadingPath, 200);
            fs.appendFile(archive.paths.list,msg, function(err) {
              if(err) {console.log(err);}

            });

/*             headers.sendData(res, data, 200); */

          }
        });

    },

    OPTIONS: function(req, res){

    }
  };

  if(actions[req.method]){
      actions[req.method](req, res);
  } else {
      //send 404
  }

};





// steps to looking for URL


        // fs.readFile(sitesPath, 'utf8', function(err, data) {
        //     if(err){
        //       console.log(err);
        //     } else {

        //       console.log("data", data);

        //       if(data.indexOf(searchURL) > -1){
        //         currentPath += searchURL;
        //       } else {
        //         currentPath = loadingPath;

        //       }
        //       // if we have the site
        //         // send it to client
        //       // else
        //         // go get it (it's ok - loading.html is already visible)
        //     }
        // });



        // fs.readFile(currentPath, 'utf8', function(err, data) {
        //     if(err){
        //       console.log(err);
        //     } else {
        //       // if we have the site
        //         // send it to client
        //       // else
        //         // go get it (it's ok - loading.html is already visible)

        //       console.log("getting to the loading page");
        //       headers.sendData(res, data, 200);
        //     }
        // });




      //read sites.txt
      //look for exact match of requested url (decode msg)
        //slice first 11 and match



