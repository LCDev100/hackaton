const mongoose = require('mongoose');
const { Schema } = mongoose;

const respuestaChat = new Schema({
    input: { type: String, required: true },
    response: { type: String, required: true },
    nickName: { type: String, required: true, ref: 'nickName' },
    dateTime: { type: String, required: true }
    }, {
        versionKey: false
});

module.exports = mongoose.model('respuestaChat', respuestaChat);