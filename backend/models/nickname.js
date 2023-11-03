const mongoose = require('mongoose');
const { Schema } = mongoose;

const nickname = new mongoose.Schema({
    nickname: { type: String, required: true }
    }, {
    versionKey: false
});

module.exports = mongoose.model('nickname', nickname);
