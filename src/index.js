import express from 'express';
import morgan from 'morgan';
import config from './config/index.js';
import mongoConnect from './db/index.js';
import router from './router/index.js';

const port = config.app.port;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

mongoConnect();

router(app);

export { app, port };