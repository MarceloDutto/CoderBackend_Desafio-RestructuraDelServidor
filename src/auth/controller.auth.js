import { Router } from "express";
import passport from "passport";
import config from "../config/index.js";

const { admin } = config;

const router = Router();

router.post('/', passport.authenticate('userLogin', {failureRedirect: '/api/auth/failLogin'}) , async (req, res) => {
    try {
        if(!req.user) return res.status(400).json({error: 'El usuario y la contraseña no coinciden'});

        const { first_name, last_name, email } = req.user;

        let role = 'user';
        if(email === admin.admin_email) role ='admin';

        const response = req.session.user = {
            first_name,
            last_name,
            email,
            role
        }
        res.status(401).json({message: 'Sesión iniciada', response});
    } catch(error) {
        console.log(error);
        res.status(500).json({error: 'Error interno del servidor'});
    }
});

router.get('/failLogin', (req, res) => {
    res.status(400).json({message: 'Falló la autenticación'})
});

router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if(error) return res.status(500).json({ error });
        res.redirect('/login'); // Redirección a una vista no realizada aun
    })
});

export default router