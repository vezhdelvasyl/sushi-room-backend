import express from 'express';
import mongoose from 'mongoose';
import { registerValidation } from './validations/auth.js';
import cors from 'cors';

import checkAuth from './utils/checkAuth.js';
import { register, login, profile, addFavourite, removeFavourite, update } from './controllers/UserController.js';

mongoose
    .connect('mongodb+srv://admin:prototype28@sushi-room.io6uttd.mongodb.net/sushi-room?retryWrites=true&w=majority')
    .then(() => console.log('Database reached successfuly'))
    .catch((err) => console.log("Error. Can't reach database", err))

const app = express();
app.use(cors());
app.use(express.json());

app.post('/auth/login', login);
app.post('/auth/register', registerValidation, register);
app.get('/auth/profile', checkAuth, profile);

app.patch('/auth', registerValidation, checkAuth, update);
app.patch('/auth/addFavourite', checkAuth, addFavourite);
app.patch('/auth/removeFavourite', checkAuth, removeFavourite);

app.listen(4444, (err) => {
    if (err) {
        return console.log("Error. Can't start server", err);
    }

    console.log('Server started successfuly');
});