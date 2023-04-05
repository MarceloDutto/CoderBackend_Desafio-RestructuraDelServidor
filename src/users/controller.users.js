import { Router } from "express";
import { registerUser, findUserByEmail } from "./service.users.js";

const router = Router();

router.post('/', async (req, res) => {
    const { first_name, last_name, age, email, password } = req.body;
    if(!first_name || !last_name || !age || !email || !password) return res.status(400).json({error: 'Debe rellenar todos los campos'});

    const user = await findUserByEmail(email);
    if(Object.keys(user).length !== 0) return res.status(400).json({error: 'Ya existe un usuario registrado con ese correo electrónico'});

    try {
        const newUserInfo = {
            first_name,
            last_name,
            age,
            email,
            password
        }

        const response = await registerUser(newUserInfo);
        res.status(201).json({message: 'Usuario creado con éxito', response});
    } catch(error) {
        console.log(error);
        res.status(500).json({error: 'Error al registrar el usuario'});
    }
});

export default router;