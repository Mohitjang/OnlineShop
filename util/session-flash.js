function flashErrorDataToSession(req, data, action) {
  req.session.inputData = data;
  req.session.save(action);
}

function getSessionFlashData(req) {
  const sessionData = req.session.inputData;

  req.session.inputData = null;
  return sessionData;
}

module.exports = {
  flashErrorDataToSession: flashErrorDataToSession,
  getSessionFlashData: getSessionFlashData,
};
