/* global describe it expect beforeEach afterEach */

describe('redirect', function () {
  'use strict'
  var GOVUK = window.GOVUK

  beforeEach(function () {
    this.fragmentRedirect = new GOVUK.FragmentRedirect({
      '#example1': '/example1',
      '#example2': '/example2'
    })
  })

  afterEach(function () {
    delete this.fragmentRedirect
  })

  it('returns the correct route for a given hash fragment', function () {
    expect(this.fragmentRedirect.getNewRouteFor('#example1')).toEqual('file:///example1')
    expect(this.fragmentRedirect.getNewRouteFor('#example2')).toEqual('file:///example2')
  })

  it('returns false for an unmatched hash fragment', function () {
    expect(this.fragmentRedirect.getNewRouteFor('#example100')).toEqual(false)
  })
})
