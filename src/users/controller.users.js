import { Router } from "express";
import passport from "passport";

const router = Router();

router.post('/', passport.authenticate('registerUser', {failureRedirect: '/api/users/failRegister'}) ,async (req, res) => {
    try {
        const newUser = req.user;
        res.status(201).json({message: 'Usuario creado con éxito', user: newUser});
    } catch(error) {
        console.log(error);
        if(error.code === 11000) return res.status(400).json({error: 'Ya existe un usuario con ese correo electrónico'});
        res.status(500).json({error: 'Error interno del servidor'});
    }
});

router.get('/failRegister', async (req, res) => {
    console.log('Falló el registro del usuario');
    res.status(500).json({message: 'Falló el registro del usuario'});
});

export default router;