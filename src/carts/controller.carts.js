import { Router } from "express";
import { getAllCarts, getCartById, addCart, addProductToCart, updateProductsfromCart, updateQuantity, deleteProductfromCart, deleteProductsfromCart } from "./service.carts.js";

const router = Router();

router.get('/', async (req, res) => {
    try {
        const response = await getAllCarts();
        res.json({message: response});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error al acceder a los carritos'});
    }
});

router.get('/:cid', async (req, res) => {
    const { cid } = req.params;

    try {
        const response = await getCartById(cid);
        res.json({message: response});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error al acceder al carrito'});
    }
});

router.post('/', async (req, res) => {
    try {
        const response = await addCart();
        res.status(201).json({message: response});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error al crear el carrito'});
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;

    try {
        const response = await addProductToCart(cid, pid);
        res.json({message: response});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error al agregar el producto al carrito'});
    }
});

router.put('/:cid', async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;

    try {
        const response = await updateProductsfromCart(cid, products);
        res.json({message: response});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error al actualizar los productos'});
    }
});

router.put('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const response = await updateQuantity(cid, pid, quantity);
        res.json({message: response});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error al actualizar el producto'});
    }
});

router.delete('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    
    try {
        const response = await deleteProductfromCart(cid, pid);
        res.json({message: response});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error al eliminar el producto del carrito'});
    }
});

router.delete('/:cid', async (req, res) => {
    const { cid } = req.params;

    try{
        const response = await deleteProductsfromCart(cid);
        res.json({message: response});
    } catch(error) {
        console.log(error);
        res.status(500).json({message: 'Error al eliminar los productos del carrito'});
    }
});

export default router;