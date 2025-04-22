import express from 'express';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/product.controller.js';

const router = express.Router();

// Get All Products
router.get("/", getProducts)

// Create a Product
router.post("/", createProduct);

// Update a Product
router.put("/:id", updateProduct)

// Delete a Product
router.delete("/:id", deleteProduct);



export default router;