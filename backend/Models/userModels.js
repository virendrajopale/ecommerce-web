const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const crypto=require('crypto')
const userSchema=new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Please Enter your Name"],
        maxLength:[30,"Name Cannot Exceed 30 Characters"], 
        minLength:[4,"Name should more than 4 characters"]
    },
    email:{
        type:String,
        required:[true,"Enter Email Address"],
        unique:true,
        validate:[validator.isEmail,"Please Enter valid email"]
    },
    password:{
        type:String,
        required:[true,"Enter your Password"],
        minLength:[8,"Password must grater than 8 Characters"],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:false
        },
        url:{
            type:String,
            required:false 
        }
    },
    role:{
        type:String,
        default:"user"
    },
   
    resetPasswordToken:String,
    resetPasswordExpire:Date
})

userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password, 10)
})

//JWT token

userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
};

//compare pass
userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password)

}

// generating passwprd reset token
userSchema.methods.getResetPassToken=function(){

    const resetToken=crypto.randomBytes(20).toString('hex')

    // hashing nd adding to user schema
    this.resetPasswordToken=crypto.createHash('sha256').update(resetToken).digest('hex')

    
    this.resetPasswordExpire=Date.now()+15*60*1000;

    return resetToken;

    
}

module.exports=new mongoose.model("User",userSchema)

