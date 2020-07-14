const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.options('*', cors());
app.use(express.json());

// Connecting to MongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;

//Verfiying MongoDB Connection
connection.once('open', () => {
    console.log('MongoDB Connection established');
});

//If error in connection then logging error
connection.on('error', (err) => {
    console.log(err);
});

//Importing routes
const blogsRouter = require('./routes/blogs');
const categoryRouter = require('./routes/category');
const commentsRouter = require('./routes/comments');

//Creating routes
app.use('/blogs', blogsRouter);
app.use('/category', categoryRouter);
app.use('/comments', commentsRouter);

app.listen(port, () => {
    console.log(`Here we go on port: ${port}`);
});