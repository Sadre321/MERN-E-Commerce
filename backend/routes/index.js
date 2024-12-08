const express = require("express");
const router = express.Router();

const productsRouter = require("./products");  // 'products' route dosyasını dahil ediyorsunuz
const categoriesRouter = require("./categories");  // 'products' route dosyasını dahil ediyorsunuz
const authRouter = require("./auth");
const couponRouter = require("./coupon");

// '/products' ile başlayan tüm istekleri 'productsRouter' yönlendiriyor
router.use('/products', productsRouter);
router.use('/categories', categoriesRouter);
router.use('/auth', authRouter);
router.use('/coupon', couponRouter);

module.exports = router;
