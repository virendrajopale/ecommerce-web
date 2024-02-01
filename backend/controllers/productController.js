const Product=require("../Models/productModels");
const ErrorHandler = require("../utils/errorhandler");
const CatchAsyncError=require("../middleware/catchAsyncError")
const ApiFeature=require('../utils/apifeatures')
const cloudinary=require('cloudinary');
//Create Product
exports.createProducts=CatchAsyncError(async (req,res,next)=>{
  let images=[];
  if(typeof req.body.images==='string'){
    images.push(req.body.images)
  }else{
    images=req.body.images;
  }
  const imagesLink=[];
  for (let i = 0; i < images.length; i++) {
    const result=await cloudinary.v2.uploader.upload(images[i],{
      folder:'products'
    })
    imagesLink.push({
      public_id:result.public_id,
      url:result.secure_url
    })
  }
  req.body.images=imagesLink
  req.body.user=req.user.id;
  const product=await Product.create(req.body);
  
  res.status(201).json({
    success:true,
    product
  })
})

//read products
exports.ReadProducts=CatchAsyncError(async (req,res,next)=>{

  const resultperPage=8;
  const productsCount=await Product.countDocuments();
  
  const ApiFeture=new ApiFeature(Product.find(),req.query)
  .search()
  .filter()
  .pagination(resultperPage);
  

  ApiFeture
let products=await ApiFeture.query
let filteredProductsCount =products.length;

//  products=await ApiFeture.query;

  res.status(200).json({
    success:true,
    products,
    productsCount,
    resultperPage,
    filteredProductsCount,
  })
})


// update products
exports.UpdateProducts=CatchAsyncError(async(req,res,next)=>{
  let products=await Product.findById(req.params.id);
  if(!products){
    return next(new ErrorHandler("Product not found",404))
  }
 products= await Product.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true,
    useFindAndModify:false
  });
  res.status(200).json({
    success:true,
    products
  })
})

//delete product

exports.deleteProducts=CatchAsyncError(async (req,res,next)=>{
let product=await Product.findById(req.params.id)
if(!product){
  return next(new ErrorHandler("Product not found",404))
}
//deleteing img from cloudianry
for (let i = 0; i < product.images.length; i++) {
  await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  
}
await product.deleteOne();
res.status(200).json({
  success:true
})
})
///

// get single product
exports.readSingleProduct=CatchAsyncError(async(req,res,next)=>{
  const product=await Product.findById(req.params.id)
  if(!product){
    return next(new ErrorHandler("Product not found",404))
  }
  res.status(200).json({
    success:true,
    product,
   
  })
})
//creating review
exports.createProductReview=CatchAsyncError(async(req,res,next)=>{
   const { rating, comment, productId } = req.body;

  const review = {
    user: req.params._id,
    name: req.params.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.params.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
})


// fetch all reviews

exports.getProductreview=CatchAsyncError(async (req,res,next)=>{
  const product=await Product.findById(req.query.id);
  if(!product){
    return next(new ErrorHandler(`Product not found`,404))
  }

  res.status(200).json({
    success:true,
    reviews:product.reviews
  })
})

// delete review
exports.deleteProductReview=CatchAsyncError(async (req,res,next)=>{
  const product=await Product.findById(req.query.productId);
  if(!product){
    return next(new ErrorHandler(`Product not found`,404))
  }

  const reviews=await product.reviews.filter(rev=>{
    rev._id.toString()!==req.query.id.toString()
  })

  let avg=0;
  reviews.forEach((rev)=>{
    avg=avg+rev.rating
  })
  let ratings=0;
  if(reviews.length===0){
    ratings=0;
  }
  else{

    ratings=avg/ reviews.length;
  }
 const rating=avg/reviews.length
 const numberOfreview=reviews.length;
 await product.findByIdAndUpdate(product.query.productId,{
  reviews,
  rating,numberOfreview
 },{new:true,runValidators:true,useFindAndModify:false})
  res.status(200).json({
    success:true,

  })
})
//
exports.getAllProductsAdmin=CatchAsyncError(async (req,res,next)=>{

const products=await Product.find()
res.status(200).json({
  success:true,
  products,
  
})
})
