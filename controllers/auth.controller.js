const validation = require("../util/validation");
const User = require("../models/user.model");
const db = require("../data/database");

function getSignup(req, res) {
  res.render("customer/auth/signup");
  return;
}

async function signup(req, res) {
  const newUser = new User(
    req.body.email,
    req.body.password,
    req.body.fullName,
    req.body.street,
    req.body.postal,
    req.body.city
  );

  const enteredEmail = req.body.email;
  const enteredConfirmEmail = req.body.confirmEmail;
  const enteredPassword = req.body.password;
  const enteredFullName = req.body.fullName;
  const enteredStreet = req.body.street;
  const enteredPostal = req.body.postal;
  const enteredCity = req.body.city;
  // console.log(req.body);

  // validations:-
  const dataIsValid = validation.dataIsValid(
    enteredEmail,
    enteredConfirmEmail,
    enteredPassword,
    enteredFullName,
    enteredStreet,
    enteredPostal,
    enteredCity
  );

  if (!dataIsValid) {
    return;
  }

  await newUser.signup();

  res.redirect("/login");
}

function getLogin(req, res) {
  res.render("customer/auth/login");
  return;
  //   return;
}

module.exports = {
  getSignup: getSignup,
  signup: signup,
  getLogin: getLogin,
};
