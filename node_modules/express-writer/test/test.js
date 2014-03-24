var fs = require('fs');
var path = require("path");
var rimraf = require("rimraf");
var writer = require('../index');
var assert = require('assert');

/* mocha globals - describe, beforeEach, afterEach, it */

describe('express writer', function(){

  /**
   * TODO: More test coverage, test actual implementation to catch bugs
   */
  describe('scribe()', function(){
    beforeEach(function(done){
      var req = {
        originalUrl: '/hello-world'
      };
      writer.scribe(req, '<h1>Hello World</h1>', function(){
        done();
      });
    });
    afterEach(function(done){
      rimraf(path.join(__dirname, "../dist"), function (er) {
        if (er) throw er;
        done();
      })
    });

    it('It should write something to dist', function(done){
      fs.readFile('dist/hello-world/index.html', 'utf8', function(err,data){
        assert(data === '<h1>Hello World</h1>');
        done();
      });
    });
  });


  describe('watch()', function(){
    it('OMG its not blowing up', function(done){
      var req = {
        originalUrl: '/hello-world'
      };
      var res = '<h1>Hello World</h1>';
      writer.watch(req, res, function(){
        done();
      });
    });
  });

  describe('distribution directory', function() {

    beforeEach(function(done) {
      var req = {
        originalUrl: '/hello-world'
      };
      writer.setWriteDirectory('./out');
      writer.scribe(req, '<h1>Hello World</h1>', function(){
        done();
      });
    });

    afterEach(function(done){
      writer.setWriteDirectory('./dist');
      rimraf(path.join(__dirname, "../out"), function (er) {
        if (er) throw er;
        done();
      })
    });

    it('should be changeable', function(done){
      fs.readFile('out/hello-world/index.html', 'utf8', function(err,data){
        assert(data === '<h1>Hello World</h1>');
        done();
      });
    });

  });

});

