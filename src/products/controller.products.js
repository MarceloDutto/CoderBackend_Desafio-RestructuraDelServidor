import { Router } from "express";
import { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct } from "./service.products.js";

const router = Router();

router.get('/', async (req, res) => {
    try {
        const response = await getAllProducts();
        res.json({message: response});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error al acceder a los productos'});
    }
});

router.get('/:pid', async (req, res) => {
    const { pid } = req.params;

    try {
        const response = await getProductById(pid)
        res.json({message: response});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error al acceder a los productos'});
    }
});

router.post('/', async (req, res) => {
    const { name, description, category, code, price, thumbnail=[], stock } = req.body;
    if(!name || !description || !category || !code || !price || !stock) return res.status(400).json({message: 'Error en el ingreso de los campos'});

    const productInfo = {
        name,
        description,
        category,
        code,
        price,
        thumbnail,
        stock
    };

    try {
        const response = await addProduct(productInfo);
        res.status(201).json({message: response});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error al ingresar el producto'});
    }
});

router.patch('/:pid', async (req, res) => {
    const { pid } = req.params;
    const { name, description, category, code, price, thumbnail, stock } = req.body;

    const updates = {
        name,
        description,
        category,
        code,
        price,
        thumbnail, 
        stock
    }

    try {
        const response = await updateProduct(pid, updates);
        res.json({message: response});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error al actualizar el producto'});
    }

});

router.delete('/:pid', async (req, res) => {
    const { pid } = req.params;

    try {
        const response = await deleteProduct(pid);
        res.json({message: response});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error al eliminar el producto'});
    }
})

export default router;