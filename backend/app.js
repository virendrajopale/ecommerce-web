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
const cors=require('cors')
const payment=require("./routes/paymentRoute")
const bodyParser=require('body-parser')
const multer = require('multer')
app.use(express.json())
// app.use(cors({
//     origin:['https://deploye-mern-1']
// }))
// app.use(express.json({ limit: "50mb" })); 
app.use(bodyParser.json({ limit: '50mb' })); // Adjust the limit as necessary
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // Adjust the limit as necessary

const storage = multer.memoryStorage();
const upload = multer({ storage });
app.use(cookieParser())
app.use(fileUpload())

app.get('/',(req,res)=>{
   res.json("hello")
})
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