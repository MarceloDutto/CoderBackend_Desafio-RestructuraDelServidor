import mongoose from "mongoose";

const usersCollection = 'users';

const userSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    age: Number,
    email: {
        type: String,
        unique: true
    },
    password: String,
    cart: String,
    role: {
        type: String,
        default: 'user'
    }
});

const User = mongoose.model(usersCollection, userSchema);

export default User;
