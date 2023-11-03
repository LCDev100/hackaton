const mongoose = require('mongoose');
const { Schema } = mongoose;

const chat = new Schema({
    input: { type: String, required: true },
    output: { type: String, required: true },
    nickname: { type: String, required: true, ref: 'nickname' },
    tema: { type: String, required: false},
    fechayhora: { type: String, required: true }
    }, {
        versionKey: false
});

module.exports = mongoose.model('chat', chat);