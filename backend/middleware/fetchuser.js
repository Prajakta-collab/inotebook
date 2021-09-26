var jwt = require("jsonwebtoken");
const JWT_SECRET = "pr@j_l@ves_$u$h";

const fetchuser = (req, res, next) => {
  //Get user details from token in header
  const token = req.header("auth-token");

  if (!token) {
    res.status(401).send({ error: "Please use valid token !" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);

    console.log(data);
    req.user = data;

    next();
  } catch (error) {
    res.status(401).send({ error: "Please use valid token !" });
  }
};

module.exports = fetchuser;
