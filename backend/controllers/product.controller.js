import Product from "../models/product.model.js";
import mongoose from "mongoose";


// Get All Products
export const getProducts = async (req, res) => {
    try{
        // ถ้าส่ง objectว่าง {} เข้าไป มันจะไปเอาทุกตัวใน Product model (products collection) ออกมา
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products}); 
    } catch (error) {
        console.error(`Error in fetching product :  ${error.message}`);
        res.status(500).json({ success: false, message: "Server Error"});
    }
}


// Create a Product
export const createProduct = async (req, res) => {
    const product = req.body;

    // ถ้าไม่มีข้อมูล name หรือ price หรือ image ให้ตอบกลับเป็น error 400
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({ success: false, message: "Please provide all fields"});
    }

    // ถ้ามีข้อมูลให้นำมาสร้างเป็น newProduct
    const newProduct = new Product(product);

    // บันทึก newProduct ลง database
    try{
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct});
    } catch (error) {
        console.error(`Error in create product :  ${error.message}`);
        res.status(500).json({ success: false, message: "Server Error"});
    }
}


// Update a Product
export const updateProduct =  async (req, res) => {
    const {id} = req.params;
    const product = req.body;

    // เช็กว่ามี product id ใน collection ไหม ถ้าไม่มีให้ return error
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid Product ID"})
    }

    // อัปเดตข้อมูล
    try{
        // {new:true} จะ return ข้อมูล product ที่อัปเดตแล้วกลับมา
        // จากนั้นเก็บลงตัวแปร updatedProduct
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.error(`Error in update product :  ${error.message}`);
        res.status(500).json({ success: false, message: "Server Error"});
    }

}


// Delete a Product
export const deleteProduct = async (req, res) => {

    const {id} = req.params;

    // เช็กว่ามี product id ใน collection ไหม ถ้าไม่มีให้ return error
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid Product ID"})
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, massage: "Product deleted"});
    } catch (error) {
        console.error(`Error in delete product :  ${error.message}`);
        res.status(500).json({ success: false, message: "Server Error"});
    }

}