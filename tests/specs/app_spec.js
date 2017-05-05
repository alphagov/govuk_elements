/* eslint-env mocha */
const request = require('supertest')
const app = require('../../server.js')
const path = require('path')
const fs = require('fs')
const assert = require('assert')

// Check that assets are copied and the app runs
describe('Copy assets to public and run the app...', () => {
  describe('the build task', () => {
    it('should copy assets into the /public folder', function () {
      assert.doesNotThrow(function () {
        fs.accessSync(path.resolve(__dirname, '../../public/javascripts/application.js'))
        fs.accessSync(path.resolve(__dirname, '../../public/images/test.gif'))
        fs.accessSync(path.resolve(__dirname, '../../public/stylesheets/application.css'))
      })
    })
  })
  describe('the index page', () => {
    it('should return a 200 on a get to "/"', function (done) {
      request(app)
        .get('/')
        .expect('Content-Type', /text\/html/)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            done(err)
          } else {
            done()
          }
        })
    })
  })
})
