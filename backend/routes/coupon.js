const express = require("express");
const Coupon = require("../models/CouponModel");
const router = express.Router();

router.post("/", (req, res) => {
    Coupon.findOne({ code: req.body.code })
        .then(existingCoupon => {
            if (existingCoupon) {
                return res.status(400).json({ error: "Coupon already exists" });
            }
            // If no existing coupon, proceed to create a new one
            const newCoupon = new Coupon(req.body);
            return newCoupon.save();  // Save the new coupon
        })
        .then(savedCoupon => {
            // Send the saved coupon as a response
            res.status(201).json(savedCoupon);
        })
        .catch(error => {
            // Catch any errors during the process and send a server error response
            console.error(error);
            res.status(500).json({ error: "Server error" });
        });
})

router.get("/", (req, res) => {
    Coupon.find().then(coupon => {
        res.status(200).json(coupon);
    }).catch(error => {
        console.log(error);
        res.status(500).json({ error: "Server error" })
    })
});

router.get("/:couponId", (req, res) => {
    Coupon.findById(req.params.couponId).then(existingCoupon => {
        if (!existingCoupon) {
            res.status(404).json({ error: "Coupon not found." })
        }

        res.status(200).json(existingCoupon);
    }).catch(error => {
        console.log(error);
        res.status(500).json({ error: "Server error" })
    })
});

router.get("/code/:couponCode", (req, res) => {
    Coupon.findOne({ code: req.params.couponCode }).then(existingCoupon => {
        if (!existingCoupon) {
            res.status(404).json({ error: "Coupon not found" });
        }

        res.status(200).json(existingCoupon);
    }).catch(error => {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    })
})

router.put("/:couponId", (req, res) => {
    Coupon.findById(req.params.couponId)
        .then(existingCoupon => {
            if (!existingCoupon) {
                return res.status(400).json({ error: "Coupon not found" });
            }

            Coupon.findByIdAndUpdate(req.params.couponId, req.body, { new: true })
                .then(updatedCoupon => {
                    res.status(200).json(updatedCoupon);
                })
                .catch(error => {
                    console.log(error);
                    res.status(400).json({ error: "Users error" });
                });
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ error: "Users error" });
        });
});

router.delete("/:couponId", (req, res) => {
    Coupon.findOneAndDelete(req.params.couponId)
        .then(deletedCoupon => {
            if (!deletedCoupon) {
                return res.status(404).json({ error: "Coupon not found" });
            }
            res.status(200).json(deletedCoupon);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "Server error" });
        });
});

module.exports = router;