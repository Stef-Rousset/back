const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const sanitizerPlugin = require('mongoose-sanitizer');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

userSchema.plugin(uniqueValidator);
userSchema.plugin(sanitizerPlugin); // sanitize all the fields

module.exports = mongoose.model('User', userSchema);
