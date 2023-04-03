import mongoConnection from "./mongoDB.js"

const mongoConnect = async () => {
    try {
        await mongoConnection.getInstance()
    } catch (error) {
        console.log('Failed to connect to DB.', error);
    }
}

export default mongoConnect;