/**
 * Express Writer
 * Authors: Richard Torruellas and Jacob Heun
 * Allows developers to develop like they would in Express, but output rendered html as static files.
 */

var fs = require('fs'),
    mkdirp = require('mkdirp'),
    DIST_BASE_DIR = "./dist";

/**
 * Writes the given content to the desired destination
 * @param destination The destination of the file to be written
 * @param body The content to be written to the file
 */
var writeHtml = function(destination, body, callback){
  var msg;
  fs.writeFile(destination, body, function(err){
    /*@todo: Better handling here*/
    if (err){
      throw new Error("Writer:: Issue writing to destination '" + destination + "'");
    }else {
      msg = 'Wrote to >' + destination;
      callback(msg);
    }
  });

};

/**
 * Writes the given body to the directory equivalent to the requests original url
 * @param req The Express wrapped request made to the server.
 * @param body The html body to be rendered.
 */
var scribe = function(req, body, callback) {

  var directory = DIST_BASE_DIR + req.originalUrl,
      destination = DIST_BASE_DIR;

  // Determine the correct destination
  if (req.originalUrl !== '/'){
    destination += req.originalUrl + '/index.html';
  }else {
    destination += req.originalUrl + 'index.html';
  }

  // Make the necessary folder and write the html
  mkdirp(directory, function(err) {
    if (err){
      throw new Error("Writer:: Issue creating directory '" + destination + "'");
    }else {
      writeHtml(destination, body, callback);
    }
  });

};

/**
 * Highjacks the res.send method in order to get a hold of the content to be rendered
 * @param req The Express wrapped request object
 * @param res The Express wrapped response object
 * @param next Used to trigger the next middleware
 */
var watch = function(req, res, next) {

  // Copy a reference to the proper res.send method
  var _send = res.send;

  // Replace the existing send method with out temp method
  res.send = function() {

    // Call the original send to finish the request
    _send.apply(res, arguments);

    //Write out the content
    //callback is for testing purposes
    scribe(req, arguments[0], function(msg){
      console.log(msg);
    });

  };

  next();

};

var setWriteDirectory = function(newDirectory) {
  DIST_BASE_DIR = newDirectory;
};

exports = module.exports = {

  scribe : scribe,
  setWriteDirectory: setWriteDirectory,
  watch : watch

};