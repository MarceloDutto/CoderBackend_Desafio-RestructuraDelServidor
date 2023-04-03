import ProductManager from "../dao/persistence/products.manager.js";

const pm = new ProductManager();

export const getAllProducts = async () => {
    try {
        const allProducts = await pm.getAllProducts();
        if(allProducts === []) return 'La base de datos no contiene productos';
        return allProducts;
    } catch (error) {
        console.log(error);
    }
};

export const getProductById = async (idRef) => {
    try {
        const productById = await pm.getProductById(idRef);
        if(Object.keys(productById).length === 0) return 'Producto no encontrado en la base de datos';
        return productById;
    } catch (error) {
        console.log(error);
    }
};

export const getProductByCode = async (codeRef) => {
    try {
        const productByCode = await pm.getProductByCode(codeRef);
        return productByCode;
    } catch (error) {
        console.log(error);
    }
};

export const addProduct = async (productInfo) => {
    try {
        const { code } = productInfo;
        const productByCode = await getProductByCode(code);
        if(productByCode.length !== 0) return 'El producto ya se encuentra ingresado en la base de datos'

        const newProduct = await pm.addProduct(productInfo);
        return newProduct;
    } catch (error) {
        console.log(error);
    }
};

export const updateProduct = async (idRef, updates) => {
    try {
        const product = await getProductById(idRef);
        if(Object.keys(product).length === 0) return 'Producto no encontrado en la base de datos';

        Object.keys(updates).forEach(key => {
            if(updates[key] && updates[key] !== product[key]) product[key] = updates[key];
        })

        const updatedProduct = await pm.updateProduct(idRef, product);
        return updatedProduct;
    } catch (error) {
        console.log(error);
    }
};

export const deleteProduct = async (idRef) => {
    try {
        const response = await pm.deleteProduct(idRef);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const deleteAllProducts = async () => {
    try {
        const response = await pm.deleteAllProducts();
        return response;
    } catch (error) {
        console.log(error);
    }
};