const jwt = require("jsonwebtoken");

async function validateUser(req, res, next) {
  var token = req.headers.authorization;
  if (!token) return res.status(401).send("Authentication Required!");
  try {
    const user = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    res.locals.user = user;
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
  next();
}

module.exports = { validateUser };
