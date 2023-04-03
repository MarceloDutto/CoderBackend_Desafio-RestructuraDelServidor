import { isValidObjectId } from "mongoose";
import CartManager from "../dao/persistence/carts.manager.js";
import ProductManager from "../dao/persistence/products.manager.js";

const cm = new CartManager();
const pm = new ProductManager();

export const getAllCarts = async () => {
    try {
        const allCarts = await cm.getAllCarts();
        return allCarts;
    } catch (error) {
        console.log(error);
    }
};

export const getCartById = async (cidRef) => {
    try {
        const cartById = await cm.getCartById(cidRef);
        if(Object.keys(cartById).length === 0) return 'Carrito no encontrado en la base de datos';
        return cartById;
    } catch (error) {
        console.log(error);
    }
};

export const addCart = async () => {
    try {
        const newCart = await cm.addCart();
        return newCart;
    } catch (error) {
        console.log(error);
    }
};

export const addProductToCart = async (cidRef, pidRef) => {
    try {
        const cart = await cm.getCartById(cidRef);
        if(!cart) return 'No se encontró el carrito';

        const product = await pm.getProductById(pidRef);
        if(Object.keys(product).length === 0) return 'Producto no encontrado en la base de datos';

        const prodIndex = cart.products.findIndex(prod => prod.product.equals(product._id));

        if(prodIndex !== -1) {
            cart.products[prodIndex].quantity ++;
            await cm.updateCart(cidRef, cart);
            return 'Producto actualizado con éxito';
        } else {
            cart.products.push({product: pidRef, quantity: 1});
            await cm.updateCart(cidRef, cart);
            return 'Producto agregado al carrito';
        }
    } catch (error) {
        console.log(error);
    }
};

export const updateProductsfromCart = async (cidRef, products) => {
    try {
        const cart = await cm.getCartById(cidRef);
        if(!cart) return 'No se encontró el carrito';

        let updateIsValid = true;

        products.forEach(async prod => {
            let id = prod.product._id;
            const validId = isValidObjectId(id)
            if(validId) {
                try {
                    const response = pm.getProductById(id);
                    if(Object.keys(response).length === 0) updateIsValid = false;
                } catch (error) {
                    console.log(error);
                }
            } else {
                updateIsValid = false
            }
        });

        if(updateIsValid) {
            cart.products = products;
            await cm.updateCart(cidRef, cart);
            return 'Productos actualizados';
        } else {
            return 'Error al ingresar los productos';
        }
    } catch (error) {
        console.log(error);
    }
};

export const updateQuantity = async (cidRef, pidRef, quantity) => {
    try {
        const cart = await cm.getCartById(cidRef);
        if(!cart) return 'No se encontró el carrito';

        if(cart.products.length === 0) return 'El carrito no tiene productos';

        const prodIndex = cart.products.findIndex(prod => prod.products.product.equals(pidRef));
        if(prodIndex === -1) return 'El producto no se encontró en el carrito';

        cart.products[prodIndex].quantity = quantity
        await cm.updateCart(cidRef, cart);
        return 'Producto actualizado';
    } catch (error) {
        console.log(error);
    }
};

export const deleteProductfromCart = async (cidRef, pidRef) => {
    try {
        const cart = await cm.getCartById(cidRef);
        if(!cart) return 'No se encontró el carrito';

        if(cart.products.length === 0) return 'El carrito no tiene productos';

        const prodIndex = cart.products.findIndex(prod => prod.products.product.equals(pidRef));
        if(prodIndex === -1) return 'El producto no se encontró en el carrito';

        cart.products.splice(prodIndex, 1);
        await cm.updateCart(cidRef, cart);
        return 'Producto eliminado del carrito';
    } catch (error) {
        console.log(error);
    }
};

export const deleteProductsfromCart = async (cidRef) => {
    try {
        const cart = await cm.getCartById(cidRef);
        if(!cart) return 'No se encontró el carrito';

        if(cart.products.length === 0) return 'El carrito no tiene productos';

        cart.products = [];
        await cm.updateCart(cidRef, cart);
        return 'Productos eliminados del carrito';
    } catch(error) {
        console.log(error);
    }
};