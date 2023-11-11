import express from 'express';
const router = express.Router();
import { addtoCart, deleteCart, deleteCartForUser, getCart, updateCart } from '../controllers/cartController.js';

// add to cart
router.post("/add", addtoCart);

//get the cart
router.get("/:userId", getCart);


// update the cart

router.patch("/update/:userId", updateCart);

// delete cart item
router.delete("/remove/:itemId", deleteCart);


// delete entire cart
router.delete("/delete/:userId", deleteCartForUser);

export default router;