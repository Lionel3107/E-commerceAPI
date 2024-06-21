const express = require("espress");
const { verifyToken } = require("./verifyToken");
const Product = require("../models/product");
const Product = require("../models/product");
const router = express.Router();

// Create new Product

router.post("/", verifyToken, async (req, res, next) => {
    const Product = new Product(req.body);
    try {
        const newProduct = await Product.save();
        res.status(200).json(newProduct);

    } catch (error) {
        res.status(500).json(error);
    }
})