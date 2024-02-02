
const ErrorHandler = require("../utils/errorhandler");
// const User=require('../Models/userModels');
const User=require('../Models/userModels')
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwttoken");
const bcrypt=require('bcrypt')
const sendEmail=require('../utils/sendEmail')
const crypto=require('crypto')
const cloudinary=require('cloudinary')
// /Register user
exports.registerUser = catchAsyncError(async (req, res, next) => {
    try {
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 15000,
        crop: "scale",
      });
  
      const { name, email, password } = req.body;
  
      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);
    
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        avatar: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        }
      });
  
      sendToken(user, 201, res);
    } catch (error) {
      // Handle errors
      console.error('Error registering user:', error);
      next(error); // Pass the error to the next middleware
    }
  });
exports.loginUser=catchAsyncError(async (req,res,next)=>{
    const {email,password}=req.body;

    //checking if user have password and email both

    if(!email || !password){
        return next(new ErrorHandler("Please enter email and password",400))
    }

    const user=await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email ",401))
    }

    const isPasswordMatched=await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email ",401))
    }
   
  
    sendToken(user,200,res)
    
    
})


//logout user

exports.logOutUser=catchAsyncError(async (req,res,next)=>{


    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    })
    res.status(200).json({
        success:true,
        message:"Logout successfully"
    })

})

// forgot password
exports.forgotPassword=catchAsyncError(async (req,res,next)=>{
    const user= await User.findOne({email:req.body.email})

    if(!user){
        return next(new ErrorHandler("User Not found",404))
    }
    //get reset tokrn
   const resetToken= user.getResetPassToken();

   //saving 
   await user.save({validateBeforeSave:false})

   // sending email
   const resetPassUrl=`${req.protocol}://${req.get("host")}/password/reset/${resetToken}`
  
   const message=`Your reset token is : \n\n ${resetPassUrl} \n\n If you are reseteing password please ignore it`;


   try{
     await sendEmail({
      email:user.email,
      subject:`Ecommerce Password recovery`,
      message
     })

     res.status(200).json({
        success:true,
        message:`Email sent to ${req.body.email}`
     })
   }catch(err){
     user.resetPasswordToken=undefined;
     user.resetPasswordExpire=undefined;

     await user.save({validateBeforeSave:false})

     return next(new ErrorHandler(err.message,500))
   }
})

exports.resetPassword=catchAsyncError(async (req,res,next)=>{
    const resetPasswordToken=crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user= await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    })

    // console.log("reset");
    if(!user){
        return next(new ErrorHandler("Resest Password token is Invalid has been expired",404))
    }
    if(req.body.password!==req.body.confirmPassword){
        return next(new ErrorHandler("Password doesnt match",404))

    }
    user.password=req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    await user.save()
    
    sendToken(user,200,res)
})


//get user details
exports.getUserDetails=catchAsyncError(async (req,res,next)=>{
     const user =await User.findById(req.user.id)

    res.status(200).json({
        success:true,
        user
    })
})

//update user password
exports.updateUserpass=catchAsyncError(async (req,res,next)=>{
    const user =await User.findById(req.user.id).select("+password")
    // console.log("erro");
    
    const isPasswordMatched=await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler("old Password is incorrect ",401))
    }
   
    if(req.body.newPassword!==req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match ",401))

    }

    user.password=req.body.newPassword;

    await user.save()
   
    sendToken(user,200,res)
})

//update user profile
exports.updateUserProfile=catchAsyncError(async (req,res,next)=>{
    
    const newUserdata={
        name:req.body.name,
        email:req.body.email,
    }
   // will add cloudinary later
   if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserdata.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }
   const user=await User.findByIdAndUpdate(req.user.id,newUserdata,{
    new:true,
    runValidators:true,
    useFindAndModify:false
   });
   
    res.status(200).json({
        success:true,
    })
})

// get all users to admin
exports.getAllUsers=catchAsyncError(async(req,res,next)=>{

    const user=await User.find()
    res.status(200).json({
        success:true,
        user
    })
})
// get single users to admin
exports.getSingleUsers=catchAsyncError(async(req,res,next)=>{

    const user=await User.findById(req.params.id)
    if(!user){
        return next(new ErrorHandler(`User does not exist with ${req.params.id}`))
    }
    res.status(200).json({
        success:true,
        user
    })
})

//update user role -- Admin
exports.updateUserRole=catchAsyncError(async (req,res,next)=>{
    
    const newUserdata={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
    }
    let user=await User.findByIdAndUpdate(req.params.id)
    if(!user){
        return next(new ErrorHandler(`User does not exist ${req.params.id}`,404))
      }
   // will add cloudinary later
    user=await User.findByIdAndUpdate(req.params.id,newUserdata,{
    new:true,
    runValidators:true,
    useFindAndModify:false
   });
   
    res.status(200).json({
        success:true,
        user
    })
})

//delete user profile -- Admin
exports.deleteUser=catchAsyncError(async (req,res,next)=>{
    
  const user=await User.findById(req.params.id)
   //  remove cloudinary later
   const imageId = user.avatar.public_id;
  
   await cloudinary.v2.uploader.destroy(imageId)
  if(!user){
    return next(new ErrorHandler(`User does not exist ${req.params.id}`,404))
  }
  await user.deleteOne()
    res.status(200).json({
        success:true,
        message:"User deleted successfully",
        user
    })
})
