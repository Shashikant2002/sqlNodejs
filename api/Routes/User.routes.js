import express from "express";
import {
  deleteUserById,
  deleteUserByIdFromListOnly,
  getAllUsers,
  getUserByUserID,
  registerUser,
  updateUserById,
} from "../controllers/userController.js";
const router = express.Router();

// Register Users ===============>>>>>>>>>>>>
router.post("/register", registerUser); // Create User

// Get user ===============>>>>>>>>>>>>
router.get("/get/all/users", getAllUsers); // Getting All Users With Filter
router.get("/get/user/:userid", getUserByUserID); // Getting User by User ID

// Update User user ===============>>>>>>>>>>>>
router
  .route("/update/user/:userid")
  .put(updateUserById) // Update Data
  .patch(updateUserById); // Update Data

// Delete User ===============>>>>>>>>>>>>>>>>>>>
router
  .route("/delete/user/:userid")
  .delete(deleteUserById) // Delete From Database
  .patch(deleteUserByIdFromListOnly); // Make deleted True and False

export default router;
