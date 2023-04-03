import mongoose from "mongoose";
import config from "../config/index.js";

const { userDB, passDB, hostDB } = config.db

class mongoConnection {
    static #instance;

    constructor() {
        mongoose.connect(`mongodb+srv://${userDB}:${passDB}@${hostDB}/?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true});
    }

    static getInstance() {
        if(this.#instance) {
            console.log('db is already connected');
            return this.#instance;
        }

        this.#instance = new mongoConnection();
        console.log('db succesfully connected');
        return this.#instance;
    }
}

export default mongoConnection;