
const User=require("../models/user");
const jwt = require("jsonwebtoken");
const{setUser}=require('../service/auth')

async function  handleSignUp(req,res){
    const {name,email,password}=req.body;
    await User.create({
        name,
        email,
        password,
    })
    return res.status(201).json({ message: "Signup successful!" });
}

const JWT_SECRET = 'oiwhoefhoewhfoewhfoe'

async function handleLogin(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate a JWT token
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });

  // Set the token in the cookie
  res.cookie("token", token, {
    httpOnly: true, // Ensures cookie cannot be accessed via JavaScript
    secure: true,  // Set to true if using HTTPS
    sameSite: 'None', // Necessary for cross-origin cookies
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    path: '/' // Available for the entire app
  });

  console.log(`JWT Token: ${token}`);

  return res.status(200).json({ message: "Login successful!" });
}
async function handleLogout(req, res) {
  try {
    // Destroy the session to log the user out
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Error during logout" });
      }

      // Clear the session cookie (connect.sid)
      res.clearCookie('connect.sid', { 
        path: '/', 
        secure: true, // Set to true if in production (HTTPS)
        httpOnly: true, 
        sameSite: 'None' // Ensure it works across different domains if needed
      });

      // Clear the JWT token cookie
      res.clearCookie('token', { 
        path: '/', 
        secure: true, // Same condition for secure flag
        httpOnly: true, 
        sameSite: 'None' 
      });

      // Once session and token are cleared, send a success message
      return res.status(200).json({ message: "Logout successful!" });
    });
  } catch (error) {
    console.error("Error in logout:", error);
    return res.status(500).json({ message: "An error occurred during logout." });
  }
}



module.exports={
    handleSignUp,
    handleLogin,
    handleLogout,
}