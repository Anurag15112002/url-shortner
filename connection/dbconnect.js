const mongoose=require("mongoose");

async function connectDB(url){
    return mongoose
      .connect(url)
      .then(()=>{
        console.log("ho gyaa coonect !");
      })
      .catch((err)=>{
        console.log("teriii ma kiii !");
      })
}

module.exports={
    connectDB,
}