const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    likes: {
        type: Number,
        default: 0,
    },
    category: {
        type: ObjectId,
        ref: "category",
    }},
    {
        timestamps: true   
});

module.exports = mongoose.model('blogs', blogSchema);
