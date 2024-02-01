const express=require('express');
const { registerUser, loginUser, logOutUser, forgotPassword, resetPassword, getUserDetails, updateUserpass, updateUserProfile, getAllUsers, getSingleUsers, updateUserRole, deleteUser } = require('../controllers/userController');
const { isAuthenticatedUser, authorizRoles } = require('../middleware/auth');

const router=express.Router();

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/password/forgot").post(forgotPassword)

router.route("/password/reset/:token").put(resetPassword)

router.route("/logout").get(logOutUser)

router.route("/me").get(isAuthenticatedUser, getUserDetails)

router.route("/password/update").put(isAuthenticatedUser, updateUserpass)

router.route("/me/update").put(isAuthenticatedUser,updateUserProfile)

router.route("/admin/users").get(isAuthenticatedUser,authorizRoles("admin"),getAllUsers)

router.route("/admin/user/:id")
.get(isAuthenticatedUser,authorizRoles("admin"),getSingleUsers)
.put(isAuthenticatedUser,authorizRoles("admin"),updateUserRole)
.delete(isAuthenticatedUser,authorizRoles("admin"),deleteUser)
module.exports=router;