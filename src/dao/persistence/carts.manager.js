import Cart from "../models/cart.models.js";

class CartManager {

    getAllCarts = async () => {
        try {
            const data = await Cart.find();
            return data
        } catch (error) {
            console.log(error);
        }
    };

    getCartById = async (idRef) => {
        try {
            const data = await Cart.findById(idRef);
            return data? data : {};
        } catch (error) {
            console.log(error);
        }
    };

    addCart = async () => {
        try {
            const newCart = await Cart.create({products: []});
            return newCart;
        } catch (error) {
            console.log(error);
        }
    };

    updateCart = async (cidRef, update) => {
        try {
            await Cart.updateOne({_id: cidRef}, update);
        } catch (error) {
            console.log(error);
        }
    };
}

export default CartManager;