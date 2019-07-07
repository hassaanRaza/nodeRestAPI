const mongoose = require('mongoose');
const connection = require('./config.json');
const Book = require('./models/Book');

mongoose.connect(process.env.MOONG_DB || connection.connectionString, {useNewUrlParser: true}).then(
    ()=>{
        console.log('Connected!');
    },
(err)=>{
    console.log('Error in connection');
}
)
module.exports = {
    Book
}
