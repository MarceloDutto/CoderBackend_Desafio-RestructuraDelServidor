import User from "../models/user.models.js";

class UserManager {

    registerUser = async (newUserInfo) => {
        try {
            const newUser = await User.create(newUserInfo);
            return newUser;
        } catch (error) {
            console.log(error);
        }
    };

    findUserByEmail = async (emailRef) => {
        try {
            const user = await User.findOne({email: emailRef});
            return user? user : {}
        } catch(error) {
            console.log(error);
        }
    };
};

export default UserManager;

