const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = Schema({
    name: {
        type: String,
        required: true
    }},
    {
        timestamps: true
});

module.exports = mongoose.model('category', categorySchema);