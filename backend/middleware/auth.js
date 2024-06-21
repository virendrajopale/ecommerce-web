const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");
const User=require("../Models/userModels")
const jwt=require('jsonwebtoken')

exports.isAuthenticatedUser=catchAsyncError(async (req,res,next)=>{

    const {token}=req.cookies;

    if(!token){
        return next(new ErrorHandler("Please login to access this resource"),401)
    }
    const decodeData=jwt.verify(token,process.env.JWT_SECRET);

    req.user=await User.findById(decodeData.id);

    next();
})


exports.authorizRoles=(...roles)=>{

    return (req,res,next)=>{

 
        if(!roles.includes(req.user.role)){
            
          return next(new ErrorHandler(`Role ${req.user.role} is not allowed `,403))
        };
        next();
  
      
    }
   
 
  
}