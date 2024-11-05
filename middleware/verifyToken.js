const jwt = require("jsonwebtoken");
const JWT_Hashvalue = require("../config/secret").JWT_Hashvalue;

function verifyToken(req, res, next) {
  // const token=req.cookies.accesstoken

  const accessToken = req.headers.authorization; // BEARER Token => "bearer dkgoegjeighege154";
  // console.log(accessToken)
  if (!accessToken) return res.status(403).json({ msg: "User Unauthorized" });
  else {
    const token = accessToken.split(" ")[1];
    jwt.verify(token, JWT_Hashvalue, function (err, user) {
      if (err) return res.status(403).json({ msg: "Token Invalid" });
      req.user = user;
      next();
    });
  }
}

function verifyAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.isAdmin===true) next();
    else {
      return res.json({ msg: "You are unauthorized" });
    }
  });
}



module.exports = { verifyAdmin ,verifyToken};
