(function() {
  "use strict";
  const http = require("https");
  const fs = require("fs");
  const path = require("path");

  const downloadFiles='./static/piano/';
  const baseUrl='https://virtualpiano.net/wp-content/themes/twentyfourteen-child/notes/';
  const urlList = [baseUrl+'a48.mp3'];
  for(let i=49;i<=90;i++){
    urlList.push(baseUrl+'a'+i+'.mp3')
    urlList.push(baseUrl+'b'+i+'.mp3')
  }

  function getHttpReqCallback(downloadUrl, dirName, index) {
    var fileName = index + "-" + path.basename(downloadUrl);
    var callback = function(res) {
      console.log("request: " + downloadUrl + " return status: " + res.statusCode);
      var contentLength = parseInt(res.headers['content-length']);
      var fileBuff = [];
      res.on('data', function (chunk) {
        var buffer = new Buffer(chunk);
        fileBuff.push(buffer);
      });
      res.on('end', function() {
        console.log("end downloading " + downloadUrl);
        if (isNaN(contentLength)) {
          console.log(downloadUrl + " content length error");
          return;
        }
        var totalBuff = Buffer.concat(fileBuff);
        console.log("totalBuff.length = " + totalBuff.length + " " + "contentLength = " + contentLength);
        if (totalBuff.length < contentLength) {
          console.log(downloadUrl + " download error, try again");
          startDownloadTask(downloadUrl, dirName, index);
          return;
        }
        fs.appendFile(dirName + "/" + fileName, totalBuff, function(err){});
      });
    };

    return callback;
  }

  var startDownloadTask = function(downloadUrl, dirName, index) {
    console.log("start downloading " + downloadUrl);
    var req = http.request(downloadUrl, getHttpReqCallback(downloadUrl, dirName, index));
    req.on('error', function(e){
      console.log("request " + downloadUrl + " error, try again");
      startDownloadTask(downloadUrl, dirName, index);
    });
    req.end();
  }

  urlList.forEach(function(item, index, array) {
    startDownloadTask(item, downloadFiles, index);
  })
})();