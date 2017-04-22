
let mongoose = require('mongoose');

//create a model class
let contactSchema = mongoose.Schema({
    Name:String,
    Phone:Number,
    Email:String
},
{
    collections: "contacts"
});

module.exports = mongoose.model('contacts', contactSchema);