const express=require('express')
const { createProducts, ReadProducts, UpdateProducts, deleteProducts, readSingleProduct, createProductReview, getProductreview, deleteProductReview, getAllProductsAdmin } = require('../controllers/productController')
const { isAuthenticatedUser,authorizRoles } = require('../middleware/auth');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const router=express.Router()



//route api of read
router.route("/products").get( ReadProducts)
//route api of create
router.route("/admin/product/new")
.post(isAuthenticatedUser,authorizRoles("admin"),createProducts)

router.route("/admin/products").get(isAuthenticatedUser,authorizRoles("admin"), getAllProductsAdmin)
//route api of update
router.route("/admin/product/:id")
.put(isAuthenticatedUser,authorizRoles("admin"),isAuthenticatedUser,UpdateProducts)

//route api of delete
router.route("/admin/product/:id")
.delete(isAuthenticatedUser,authorizRoles("admin"),isAuthenticatedUser,deleteProducts)


//read single
router.route("/products/product/:id").get(readSingleProduct)

router.route("/review").put(createProductReview)

router.route("/reviews").get(getProductreview).delete(isAuthenticatedUser,deleteProductReview)

module.exports=router;