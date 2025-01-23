const express=require("express");
const {generatenewUrl,getUrlById,getAnalyticsById}=require("../controllers/urlfunc");
const { checkAuth } = require("../middlewares/auth");
const router=express.Router();

router.post("/",checkAuth,generatenewUrl)
router.get("/:shortId",getUrlById)
router.get("/analytics/:shortId",getAnalyticsById)
module.exports=router;