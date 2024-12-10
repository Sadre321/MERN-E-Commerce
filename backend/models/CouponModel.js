const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema({
    name:{type:String,required:true},
    discountPercent:{type:Number,required:true}
});

const Coupon = mongoose.model("Coupon",CouponSchema);
module.exports = Coupon;