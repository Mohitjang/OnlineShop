function addCsrfToken(req, res, next) {
  res.locals.csrfToken = req.csrfToken(); // inbuilt method in csurf package.
  next();
}

module.exports = addCsrfToken;
