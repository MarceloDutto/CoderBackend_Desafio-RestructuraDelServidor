import productsController from "../products/controller.products.js";
import cartsController from "../carts/controller.carts.js";

const router = (app) => {
    app.use('/api/products', productsController);
    app.use('/api/carts', cartsController);
}

export default router;