require('dotenv').config();

// ========== Import Dependencies ==========
const express = require('express');
const createError = require('http-errors');
const cors = require('cors');
const helmet = require('helmet');

// ========== Basic Setup ==========
const app = express();


// ========== Global Middlewares ==========
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());


// ========== Routes ==========
app.get('/', (request, response) => {
    response.status(200).json({ message: "App Successfully Working" });
})


// ========== Error Handling ==========
app.use((request, response, next) => next(createError(404)));
app.use(({ status, message }, request, response, next) => response.status(status || 500).json({ message }));


// ========== Port Listening ==========
app.listen(process.env.PORT, () => console.log(`The server running on PORT ${process.env.PORT}`));


module.exports = app;