const shortid=require("shortid");

const URL=require("../models/url");

async function generatenewUrl(req,res){
      const body=req.body;
      if(!body.url)
        return res.status(400).json({err:"url required"});
      const shortID=shortid();

      await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitHistory:[]
      });
      const fullShortUrl = `http://localhost:5000/url/${shortID}`; // Make sure to replace with your actual domain
      return res.json({ shortUrl: fullShortUrl });
}
async function getUrlById(req,res){
    const shortId=req.params.shortId;
     const result=await URL.findOneAndUpdate(
        {
          shortId,
        },
        {
            $push:{
              visitHistory: {
                timestamp:Date.now(),
              },
            },
        }
    );
    res.redirect(result.redirectURL);
}

async function getAnalyticsById(req,res){
    const shortId=req.params.shortId;
    const result=await URL.findOne({shortId});
    return res.json({
        totalclicks:result.visitHistory.length,
        analytics:result.visitHistory
    });
}

module.exports={
    generatenewUrl,
    getUrlById,
    getAnalyticsById,
};