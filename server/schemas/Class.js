const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
    name: {type: String, required: true, unique: true},
    attendants: [{type: mongoose.Schema.Types.ObjectId, ref: 'Attendance'}]
});

const Class = mongoose.model('Class', classSchema);
module.exports = Class;