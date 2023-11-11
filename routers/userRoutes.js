import express from "express";
const router = express.Router();
import { createUser, getAllUsers, getSingleUser, updateUser, deleteUser } from "../controllers/userController.js";


// create user

router.post("/create", createUser);

// get all users
router.get("/", getAllUsers);

// get single user
router.get("/:id", getSingleUser);

// update user
router.put("/:id", updateUser);

// delete user
router.delete("/:id", deleteUser);




export default router;



