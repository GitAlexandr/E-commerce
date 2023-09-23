const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./auth/authRouter');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use("/auth", authRouter);

const start = async () => {
    try {
        const dbURI = 'mongodb+srv://sasha:bushuev2003@cluster0.uhh4prv.mongodb.net/jsdb';
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.error(e);
    }
};

start();
