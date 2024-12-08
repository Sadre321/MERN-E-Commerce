const express = require("express");
const Product = require("../models/ProductModel");
const router = express.Router();

// '/products' için GET isteği

router.post("/", (req, res) => {
    const newProduct = new Product(req.body);

    newProduct.save()
        .then(savedProduct => {
            res.status(201).json(savedProduct);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: "Server error"});
        });
});

router.get("/", (req, res) => {
    Product.find()
        .then(products => {
            res.status(200).json(products);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: "Server error"});
        });
});

router.get("/:productId", (req, res) => {
    Product.findById(req.params.productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({error: "Product not found"});
            }
            res.status(200).json(product);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({error: "Product not found"});
        });
});

router.delete("/:productId", (req, res) => {
    Product.findOneAndDelete(req.params.productId)
        .then(deletedProduct => {
            if (!deletedProduct) {
                return res.status(404).json({ error: "Product not found" });
            }
            res.status(200).json(deletedProduct);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "Server error" });
        });
});

module.exports = router;
