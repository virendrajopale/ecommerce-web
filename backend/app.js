const express =require('express')
const errormidle=require('./middleware/error')
const app= express()
const cookieParser=require('cookie-parser')
const fileUpload=require('express-fileupload')
const dotenv=require('dotenv')
const path=require('path')
if(process.env.NODE_ENV!=="PRODUCTION"){

    require('dotenv').config({path:"backend/config/config.env"})
}

//route imports
const products=require("./routes/productRoute")

const user=require("./routes/userRoutes")

const orders=require("./routes/orderRoute")

const payment=require("./routes/paymentRoute")
const bodyParser=require('body-parser')
app.use(express.json())
app.use(express.json({ limit: "50mb" })); 
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())

app.use("/api/v1",products)

app.use("/api/v1",user)

app.use("/api/v1",orders)

app.use("/api/v1",payment)

app.use(express.static(path.join(__dirname,"../frontend/build")))
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
})
//middleware for error
app.use(errormidle)
module.exports=app;