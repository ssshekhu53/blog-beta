const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const commentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    blog: {
        type: ObjectId,
        ref: "blogs",
    }},
    {
        timestamps: true
});

module.exports = mongoose.model('comments', commentSchema);
