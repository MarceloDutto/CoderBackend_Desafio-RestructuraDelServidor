import mongoose from "mongoose";

const productsCollection = 'products';

const productSchema = mongoose.Schema({
    name: String,
    description: String,
    category: String,
    code: {
        type: String,
        index: true
    },
    price: Number,
    thumbnail: Array,
    stock: Number
});

const Product = mongoose.model(productsCollection, productSchema);

export default Product;