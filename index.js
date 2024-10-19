const express = require("express");

const authorsRoute = require("./router/authorsRoute.js");
const booksRoute = require("./router/booksRoute.js");

const morgan = require('morgan');
const dotenv = require('dotenv/config');

const app = express();
const port = 10000;
const host = "localhost";

app.use(express.json());
app.use(express.urlencoded({ extended:true }))
app.use(morgan('dev'))

// authors
app.use('/api/authors', authorsRoute);
app.use('/api/books', booksRoute);

app.listen(port,host,()=>{
    console.log(`server berjalan di http://${process.env.HOST}:${process.env.PORT}`);
});

module.exports = app;