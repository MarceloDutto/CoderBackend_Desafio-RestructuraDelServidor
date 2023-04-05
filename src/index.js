import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import config from './config/index.js';
import mongoConnect from './db/index.js';
import initializePassport from './config/passport.js';
import router from './router/index.js';

const port = config.app.port;
const { userDB, passDB, hostDB } = config.db
const sessionSecret = config.session.sessionSecret;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://${userDB}:${passDB}@${hostDB}?retryWrites=true&w=majority`,
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true}
    }),
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false
}));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

mongoConnect();

router(app);

export { app, port };