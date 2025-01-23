const express=require("express");
const cors=require("cors");
const session = require('express-session');
const {connectDB}=require("./connection/dbconnect");
const cookieParser=require("cookie-parser");
const urlRouter=require("./routes/url")
const userRouter=require("./routes/user");

const app=express();
//middleware
app.use(cookieParser());
app.use(session({
  secret: 'your-secret-key', // Ensure a secret key is set
  resave: false, // Don't resave session if not modified
  saveUninitialized: true, // Don't create session until something is stored
  cookie: {
    httpOnly: true, // Prevent client-side access to the cookie
    secure: true, // Only send over HTTPS in production
    sameSite: 'None', // Allow the cookie to be sent in cross-origin requests
    maxAge: 1000 * 60 * 60 * 24, // Session expiry time
  }
}));

// CORS configuration
app.use(cors({
  origin: '*',  // React app's origin
  credentials: true,  
}));


app.use(express.json());
const port=5000;

app.use("/url",urlRouter);
app.use("/user",userRouter);

connectDB("mongodb://127.0.0.1:27017/shortner-database")

app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})