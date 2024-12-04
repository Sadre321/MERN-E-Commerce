const express = require("express");
const router = express.Router();

// '/products' için GET isteği
router.get("/",async (req, res) => {
    res.send("Product ekranı");  // Cevap olarak "Product ekranı" göndereceğiz
});

module.exports = router;
