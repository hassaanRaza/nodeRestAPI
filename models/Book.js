const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    BookName: {
        type: String,
        required: true
    },
    BookDescription: {
        type: String
    },

});

module.exports = mongoose.model('Book', BookSchema);