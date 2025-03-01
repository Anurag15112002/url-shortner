const jwt = require("jsonwebtoken");

const JWT_SECRET = 'oiwhoefhoewhfoewhfoe'; 

async function checkAuth(req, res, next) {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { userId: decoded.userId };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
}

module.exports = {
  checkAuth,
};
