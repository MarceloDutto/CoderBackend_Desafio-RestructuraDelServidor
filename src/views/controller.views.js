import { Router } from "express";
import { getAllProducts } from "../products/service.products.js";
import { getCartById } from "../carts/service.carts.js";
import handlePolicies from "../middlewares/handlePolicies.js";

const router = Router();

router.get('/', handlePolicies('PUBLIC'), (req, res) => {
    res.redirect('/products');
});

router.get('/signup', handlePolicies('PUBLIC'), (req, res) => {
    res.render('signup', {
        title: 'Registrate',
        style: 'signup.css'
    })
});

router.get('/login', handlePolicies('PUBLIC'), (req, res) => {
    res.render('login', {
        title: 'Iniciar sesión',
        style: 'login.css'
    })
});

router.get('/profile', handlePolicies(['USER', 'ADMIN']), (req, res) => {
    const user = req.session.user;

    res.render('profile', {
        title: 'Perfil',
        style: 'profile.css',
        user
    })
});

router.get('/products', handlePolicies(['USER', 'ADMIN']), async (req, res) => {
    const user = req.session.user;

    let products = [];
    let showProducts = false;

    try {
        products = await getAllProducts();
        products.length > 0 ? showProducts = true : showProducts = false;

        res.render('products', {
            title: 'Productos',
            style: 'products.css',
            user,
            showProducts,
            products: products.map(prod => prod.toJSON())
        });
    } catch(error) {
        console.log(error);
        res.render('products', {
            title: 'Productos',
            style: 'products.css',
            showProducts
        });
    }
});

router.get('/cart/:cid', handlePolicies(['USER', 'ADMIN']), async (req, res) => {
    const { cid } = req.params;
    let showProducts = false;

    try {
        const cart = await getCartById(cid);
        const products = cart.products;
        products.length > 0 ? showProducts = true : showProducts = false;

        res.render('cart', {
            title: 'Mi carrito',
            style: 'cart.css',
            showProducts,
            products: products.map(prod => prod.toJSON())
        });
    } catch(error) {
        console.log(error);
        res.render('cart', {
            showProducts,
            style: 'cart.css'
        });
    }

});
export default router;