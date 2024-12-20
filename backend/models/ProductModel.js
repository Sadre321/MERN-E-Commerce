const mongoose = require("mongoose");

const ReviewsSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,ref:"User"
    }
})

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    img:[{type:String,required:true}],
    colors:[{
        type:String,
        required:true
    }],
    sizes:[{
        type:String,
        required:true
    }],
    price:{
        current:{type:Number,required:true},
        discount:{
            type:Number
        }
    },
    description:{
        type:String,
        required:true
    }, 
    reviews:[ReviewsSchema],
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
},{timestamps:true});

const Product = mongoose.model("Product",ProductSchema);
module.exports = Product;