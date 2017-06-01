exports.forceHttps = function (req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    console.log('Redirecting request to https')
    // 302 temporary - this is a feature that can be disabled
    return res.redirect(302, 'https://' + req.get('Host') + req.url)
  }
  next()
}
