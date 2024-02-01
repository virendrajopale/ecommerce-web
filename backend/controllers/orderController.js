const Order=require('../Models/orderModels')
const ErrorHandler = require("../utils/errorhandler");

const Product=require("../Models/productModels");
const catchAsyncError = require('../middleware/catchAsyncError');

// create order

exports.newOrder=catchAsyncError(async(req,res,next)=>{
    const {shippingInfo,
        itemPrice,
        orderItems,paymentInfo,taxPrice,shippingPrice,totalPrice}=req.body
    const order=await Order.create(
        {shippingInfo,
            orderItems,
            paymentInfo,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt:Date.now(),
            user:req.user._id

    })

    res.status(201).json({
        success:true,
        order
    })
})
// / get logged in user's order

// get single order
exports.getSingleOrder=catchAsyncError(async(req,res,next)=>{
    const order=await Order.findById(req.params.id).populate("user","name email")
    if(!order){
        return next(new ErrorHandler('Order not found',404))
    }


    res.status(200).json({
        success:true,
        order
    })
})

exports.myOrder=catchAsyncError(async(req,res,next)=>{
  const orders=await Order.find({user:req.user._id});
  res.status(200).json({
    success:true,
    orders,
  })
})
// / get All  order -- admin
exports.getAllOrder=catchAsyncError(async(req,res,next)=>{
    const orders=await Order.find()

    let totalAmount=0;

    orders.forEach(ord=>{
        totalAmount+=orders.totalPrice
    });

    res.status(200).json({
        success:true,
        totalAmount,
        orders
    })
})

// update order status
exports.UpdateOrder=catchAsyncError(async(req,res,next)=>{
    const orders=await Order.findById(req.params.id)

    if(!orders){
        return next(new ErrorHandler('Order not found',404))
    }
    
    if(orders.orderStatus==="Delivered"){
        return next(new ErrorHandler("We have deliverd the order",404))
    }

    orders.orderItems.forEach( async (ord)=>{
       await  updateStock(ord.product,ord.quantity);
    })

    orders.orderStatus=req.body.status;
    if(req.body.status==="Delivered"){

        orders.deliverdAt=Date.now()
    }
    await orders.save({
        validateBeforeSave:false
    })
    res.status(200).json({
        success:true,
       
    })
})

async function updateStock(id,quantity){
  const product=await Product.findById(id)

  product.Stock-=quantity;

  product.save({
    validateBeforeSave:false
  })
}


// / delete  order -- admin
exports.deleteOrder=catchAsyncError(async(req,res,next)=>{
    const order=await Order.findById(req.params.id)

    if(!order){
        return next(new ErrorHandler('Order not found',404))
    }

   await  order.deleteOne()
    res.status(200).json({
        success:true,
       
    })
})
