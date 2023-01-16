const CustomApiError = require("../error/custom-error");
const jwt = require("jsonwebtoken");

const logIn = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new CustomApiError("Please provide email and password", 404);
  }

  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: "user created succesfully", token });
};

const dashBoard = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startWith("Bearer")) {
    throw new CustomApiError("Invalid token", 404);
  }
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello john dee`,
    secret: `Here is your authorizwed data your lucky number is ${luckyNumber}`,
  });
};
// const id = Date().getDate();
// console.log(id);
module.exports = { logIn, dashBoard };
