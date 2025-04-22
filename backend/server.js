// add "type": "module", in package.json to use "import" syntax 
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import productRoutes from "./routes/product.route.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); //middleware ทำให้สามารถรับ JSON data ผ่านทาง req.body ได้

// ใช้ Routes
app.use("/api/products", productRoutes);





app.listen(PORT, () => {
    connectDB();
    console.log(`server is started at http://localhost:${PORT}`);
})