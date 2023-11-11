import express from "express";
const router = express.Router();
import { createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../controllers/productController.js";


// createProduct
router.post("/create", createProduct);

// getAllProducts

router.get("/", getAllProducts);

//getsingleProduct
router.get("/:id", getSingleProduct);

// updateProduct
router.put("/:id", updateProduct);

// deleteProduct
router.delete("/:id", deleteProduct);

export default router;