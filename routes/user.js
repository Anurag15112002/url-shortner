const express=require("express");

const{handleSignUp,handleLogin,handleLogout}=require("../controllers/user");
const { checkAuth } = require("../middlewares/auth");

const router=express.Router();

router.post('/',handleSignUp);

router.post("/login",handleLogin);
router.post("/logout",handleLogout);
router.get("/check", checkAuth, (req, res) => {
    res.status(200).json({ message: "User is logged in", userId: req.user.userId });
  });

module.exports=router;