function checkAuthStatus(req, res, next) {
  const uid = req.session.user.uid;
  const isAdmin = req.session.user.isAdmin;

  if (!uid) {
    return next();
  }

  res.locals.uid = uid;
  res.locals.isAuth = true; 
  res.locals.isAdmin = isAdmin;

  next();
}

module.exports = checkAuthStatus;
