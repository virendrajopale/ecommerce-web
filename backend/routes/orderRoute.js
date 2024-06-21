const express=require('express')
const { newOrder, getSingleOrder, myOrders, getAllOrder, UpdateOrder, deleteOrder, myOrder } = require('../controllers/orderController')
const { isAuthenticatedUser, authorizRoles } = require('../middleware/auth')
const router=express.Router()


router.route("/order/new").post(isAuthenticatedUser, newOrder)

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder)

// router.route("/orders").get(isAuthenticatedUser,myOrders)

router.route("/orders/orders").get(isAuthenticatedUser,myOrder)

router.route("/admin/orders").get(isAuthenticatedUser,authorizRoles("admin"),getAllOrder)

router.route("/admin/order/:id").put(isAuthenticatedUser,authorizRoles("admin"), UpdateOrder)

router.route("/admin/order/:id").delete(isAuthenticatedUser,authorizRoles("admin"),deleteOrder)
module.exports=router