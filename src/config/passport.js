import passport from "passport";
import local from 'passport-local';
import { findUserByEmail, registerUser, findUserById } from "../users/service.users.js";
import { isValidPassword } from "../utils/passwordEncryptor.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use('registerUser', new LocalStrategy(
        {passReqToCallback: true, usernameField: 'email'}, async (req, username, password, done) => {
            const { first_name, last_name, age, email } = req.body;
            if(!first_name || !last_name || !age || !email || !password) return done(null, false);

            try{
                const user = await findUserByEmail(username);
                if(Object.keys(user).length !== 0) return done(null, false);

                const newUserInfo = {
                    first_name,
                    last_name,
                    age,
                    email,
                    password
                }
        
                const response = await registerUser(newUserInfo);
                return done (null, response);
            } catch(error) {
                return done(error);
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await findUserById(id);
        done(null, user)
    });

    passport.use('userLogin', new LocalStrategy({usernameField: 'email'}, async (username, password, done) => {
        try {
            const user = await findUserByEmail(username);
            if(!user) {
                console.log('No existe usuario registrado con este email');
                return done(null, false);
            }
            if(!isValidPassword(user, password)) return done(null, false);
            return done(null, user);
        } catch(error) {
            return done(error);
        }
    }));
};

export default initializePassport;