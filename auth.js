const JWT = require(`jsonwebtoken`);

const token = JWT.sign({ user: "signed" }, process.env.JWT_SECRET);

const auth = (req, res, next) => {
  console.log("request to access", token);
  // const { authorization } = req.headers;
  // console.log("auth", authorization);
  JWT.verify(token, process.env.JWT_SECRET, (err, result) => {
    if (err) {
      res.status(404).json({ message: "UN-Authorized Access" });
    } else {
      req.headers.user_id = result.id;
      req.headers.name = result.name;
      console.log(req.headers);
      next();
    }
  });
};

module.exports = { auth };
