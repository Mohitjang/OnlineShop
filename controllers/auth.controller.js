const validation = require("../util/validation");
const User = require("../models/user.model");
const db = require("../data/database");
const authUtil = require("../util/authentication");
const sessionFlash = require("../util/session-flash");

function getSignup(req, res) {
  let inputData = sessionFlash.getSessionFlashData(req);
  if (!inputData) {
    inputData = {
      email: "",
      confirmEmail: "",
      password: "",
      fullName: "",
      street: "",
      postal: "",
      city: "",
    };
  }

  res.render("customer/auth/signup", { inputData: inputData });
  return;
}

async function signup(req, res, next) {
  const enteredData = {
    email: req.body.email,
    confirmEmail: req.body.confirmEmail,
    password: req.body.password,
    fullName: req.body.fullName,
    street: req.body.street,
    postal: req.body.postal,
    city: req.body.city,
  };
  const enteredEmail = req.body.email;
  const enteredConfirmEmail = req.body.confirmEmail;
  const enteredPassword = req.body.password;
  const enteredFullName = req.body.fullName;
  const enteredStreet = req.body.street;
  const enteredPostal = req.body.postal;
  const enteredCity = req.body.city;
  // console.log(req.body);

  // validations:-
  const userDetailsAreValid = validation.userDetailsAreValid(
    enteredEmail,
    enteredPassword,
    enteredFullName,
    enteredStreet,
    enteredPostal,
    enteredCity
  );

  const emailsIsConfirmed = validation.emailIsConfirmed(
    enteredEmail,
    enteredConfirmEmail
  );

  if (!userDetailsAreValid || !emailsIsConfirmed) {
    sessionFlash.flashErrorDataToSession(
      req,
      {
        error: true,
        errorMsg:
          "please check your input - password must be 6 characters long and postal code also!",
        ...enteredData,
      },
      function () {
        res.redirect("/signup");
      }
    );
    return;
  }

  const newUser = new User(
    req.body.email,
    req.body.password,
    req.body.fullName,
    req.body.street,
    req.body.postal,
    req.body.city
  );

  try {
    const existsAlready = await newUser.existsAlready();
    if (existsAlready) {
      sessionFlash.flashErrorDataToSession(
        req,
        {
          error: true,
          errorMsg: "User axists already! - try login!",
          ...enteredData,
        },
        function () {
          res.redirect("/signup");
        }
      );
      return;
    }

    await newUser.signup();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/login");
}

function getLogin(req, res) {
  let inputData = sessionFlash.getSessionFlashData(req);
  if (!inputData) {
    inputData = {
      email: "",
      password: "",
    };
  }
  res.render("customer/auth/login", { inputData: inputData });
  return;
  //   return;
}

async function login(req, res, next) {
  // take req body
  const enteredData = {
    email: req.body.email,
    password: req.body.password,
  };
  const enteredEmail = req.body.email;
  const enteredPassword = req.body.password;
  // check that user exists or not
  const user = new User(enteredEmail, enteredPassword);
  let existingUser;
  try {
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    next(error);
    return;
  }
  if (!existingUser) {
    sessionFlash.flashErrorDataToSession(
      req,
      {
        error: true,
        errorMsg: "Wrong username or password!",
        ...enteredData,
      },
      function () {
        res.redirect("/login");
      }
    );
    return;
  }

  let passwordIsCorrect;
  try {
    passwordIsCorrect = await user.hasMatchingPassword(existingUser.password);
  } catch (error) {
    next(error);
    return;
  }

  if (!passwordIsCorrect) {
    sessionFlash.flashErrorDataToSession(
      req,
      {
        error: true,
        errorMsg: "Wrong username or password!",
        ...enteredData,
      },
      function () {
        res.redirect("/login");
      }
    );
    return;
  }

  // user.login();
  authUtil.createUserSession(req, existingUser, function () {
    res.redirect("/");
  });
}

function logout(req, res) {
  authUtil.destroyUserAuthSession(req);
  res.redirect("/login");
}

module.exports = {
  getSignup: getSignup,
  signup: signup,
  getLogin: getLogin,
  login: login,
  logout: logout,
};
