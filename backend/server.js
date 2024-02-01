const app=require('./app')
const cloudinary=require('cloudinary')
// const dotenv=require('dotenv')

//database
const connectDataBase=require('./config/database')

//config
if(process.env.NODE_ENV!=="PRODUCTION"){

    require('dotnev').config({path:"backend/config/config.env"})
}

//conect to database

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});
connectDataBase()
const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is working on ${process.env.PORT}`);
    
})

//unhandles exceptional error
process.on('unhandledRejection',err=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down server due to unhandel promise`);
    server.close(()=>{
        process.exit(1)
    })
    
})

// handling uncaugth exception
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down server due to Uncaught promise`);
    process.exit(1)

})