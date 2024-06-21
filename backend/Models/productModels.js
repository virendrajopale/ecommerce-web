const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please Enter Description"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter Price"],
        maxLength:[8,"Price Cannot exceed 8 figures"]
    },
    category:{
      type:String,
      default:"Product"
    },
   
    // images:[{
    //     public_id:{
    //         type:String,
    //         required:true
    //     },
    //     url:{
    //         type:String,
    //         required:true 
    //     }
    // }], // did changes
    images:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true 
        }
    },
    ratings:{
        type:Number,
        default:0
      },
    Stock:{
        type:Number,
        requires:[true,"Please Enter Stock"],
        maxLength:[4,"Cannot Greater than 4 figures"],
        default:1
    },
    reviews:[{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true
        },
      name:{
        type:String,
        required:true
      },
      rating:{
        type:Number,
        default:0
      },
      comment:{
        type:String,
        required:true
      },
    }],
     numberOfreview:{
        type:Number,
        default:0
    },
    
    createdAt:{
        type:Date,
        default:Date.now
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    }
     
})

module.exports=new mongoose.model('Product',productSchema)