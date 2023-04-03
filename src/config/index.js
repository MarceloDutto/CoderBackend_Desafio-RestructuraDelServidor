import * as dotenv from 'dotenv';
dotenv.config();

const config = {
    app: {
        port: process.env.PORT || 3000,
    },
    db: {
        userDB: process.env.USER_DB,
        passDB: process.env.PASS_DB,
        hostDB: process.env.HOST_DB
    }
}

export default config;