var path = require('path');
var archive = require('../helpers/archive-helpers');
var headers = require('./http-helpers');
var fs = require('fs');
var url = require('url');



exports.handleRequest = function (req, res, statusCode) {

  var actions = {

    GET: function(req, res){
      if(req.url === '/') {
        fs.readFile(archive.paths.main, 'utf8', function(err, data) {
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
          searchURL = archive.paths.archivedSites + msg.slice(4);
        }


    // handle whether URL is already archived
        archive.isURLArchived(searchURL, function(err, fd){
          if(err) {
            console.log('File does not exist.  Add to sites.txt');

            fs.readFile(loadingPath, 'utf8', function(err, data) {
              if(err){
                console.log(err);
              } else {

                headers.sendData(res, data, 200);
              }
            });

            fs.appendFile(archive.paths.list, msg.slice(11)+'\n', function(err) {
              if(err) {console.log(err);}
            });

          } else {
            console.log('File exists.  Send it BACK!');

            fs.readFile(searchURL, 'utf8', function(err, data) {
              if(err){
                console.log(err);
              } else {
                headers.sendData(res, data, 200);
              }
            });

          }
        });

      });

    },

  };

  if(actions[req.method]){
      actions[req.method](req, res);
  } else {
      //send 404
  }

};

// else {
//         // coming in http://www.google.com
//         var requestedURL = req.url.slice(7);
//         console.log(requestedURL);

//         archive.readListOfUrls(archive.paths.list, function(err, data){
//           if(err){
//             console.log("ERROR", err);
//           } else {

//             var arrayOfSites = data.trim().split('\n');

//         if(req.url === ) {
//             for(var i = 0; i < arrayOfSites.length; i++) {
//               if(arrayOfSites[i] === requestedURL) {

//                 fs.readFile(requestedURL, 'utf8', function(err, data) {
//                   if(err){
//                     console.log(err);
//                   } else {
//                     headers.sendData(res, data, 302);
//                   }
//                 });
//               }
//             }
//           }
//         });


//         } else {
//           headers.sendData(res, null, 404);
//         }
//       }

