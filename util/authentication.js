function createUserSession(req, user, action) {
  // req.session.uid = user._id.toString();
  // req.session.email = user.email;
  req.session.user = {
    uid: user._id.toString(),
    email: user.email,
    isAdmin: user.isAdmin,
  };
  req.session.save(action);
  //   req.session.email = user.email.toString;
}

function destroyUserAuthSession(req) {
  req.session.user.uid = null;
  req.session.user.email = null;
  req.session.user.isAdmin = null;
}



module.exports = {
  createUserSession: createUserSession,
  destroyUserAuthSession: destroyUserAuthSession,
};
