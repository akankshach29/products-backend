const JWT = require(`jsonwebtoken`);

const auth = (req, res, next) => {
  console.log("request to access", req.headers);
  const { authorization } = req.headers;
  console.log("auth", authorization);
  JWT.verify(authorization, process.env.JWT_SECRET, (err, result) => {
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
