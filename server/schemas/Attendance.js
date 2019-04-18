const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
    class: {type: mongoose.Schema.Types.ObjectId, ref: 'Class'},
    date: Date,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance;