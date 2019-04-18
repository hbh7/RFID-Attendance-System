const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    rin: {type: Number, unique: true},
    cardID: {type: Number, required: true}
});

const User = mongoose.model('User', userSchema);
module.exports = User;