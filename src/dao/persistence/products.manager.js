import { isValidObjectId } from "mongoose";
import Product from "../models/product.models.js";

class ProductManager {

    getAllProducts = async () => {
        try {
            const data = await Product.find();
            return data;
        } catch(error) {
            console.log(error);
        }
    };

    getProductById = async (idRef) => {
        try {
            const data = await Product.findById(idRef);
            return data? data : {}
        } catch (error) {
            console.log(error);
        }
    };

    getProductByCode = async (codeRef) => {
        try {
            const data = await Product.find({code: codeRef});
            return data? data : {};
        } catch (error) {
            console.log(error);
        }
    };

    addProduct = async (productInfo) => {
        try {
            const newProduct = await Product.create(productInfo);
            return newProduct;
        } catch (error) {
            console.log(error);
        }
    };

    updateProduct = async (idRef, product) => {
        try {
            await Product.findByIdAndUpdate(idRef, product);
            return product;
        } catch (error) {
            console.log(error);
        }
    };

    deleteProduct = async (idRef) => {
        try {
            await Product.findByIdAndDelete(idRef);
            return 'Producto eliminado de la base de datos';
        } catch (error) {
            console.log(error);
        }
    };

    deleteAllProducts = async () => {
        try {
            await Product.deleteMany();
            return 'Todos los productos fueron eliminados';
        } catch (error) {
            console.log(error);
        }
    };
}

export default ProductManager;