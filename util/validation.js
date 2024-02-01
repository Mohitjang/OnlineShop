const db = require("../data/database");

function dataIsValid(
  email,
  confirmEmail,
  password,
  fullName,
  street,
  postal,
  city
) {
  return (
    email &&
    confirmEmail &&
    password &&
    fullName &&
    street &&
    postal &&
    city &&
    email === confirmEmail &&
    password.length >= 6 &&
    postal.length == 6 &&
    email.includes("@")
  );
}

// async function userExists(enteredEmail) {

//   const userExists = await db
//     .getDb()
//     .collection("users")
//     .findOne({ email: enteredEmail });
//   return userExists;
// }

module.exports = {
  dataIsValid: dataIsValid,
  // userExists: userExists,
};
