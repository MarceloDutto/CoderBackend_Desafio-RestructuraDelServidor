import UserManager from "../dao/persistence/users.manager.js";
import { addCart } from "../carts/service.carts.js";
import { createHash } from "../utils/passwordEncryptor.js";

const um = new UserManager();

export const registerUser = async (newUserData) => {
    const { first_name, last_name, age, email, password } = newUserData;

    try {
        const newUserCart = await addCart();

        const newUserInfo = {
            first_name,
            last_name,
            age,
            email,
            password: createHash(password),
            cart: newUserCart._id
        };

        const newUser = await um.registerUser(newUserInfo);
        return newUser;
    } catch(error) {
        console.log(error);
    }
};

export const findUserByEmail = async (emailRef) => {
    try {
        const user = await um.findUserByEmail(emailRef);
        return user;
    } catch(error) {
        console.log(error);
    }
};

export const findUserById = async (idRef) => {
    try {
        const user = await um.findUserById(idRef);
        return user;
    } catch(error) {
        console.log(error);
    }
}
