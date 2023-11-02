const mongoose = require('mongoose');
const { Schema } = mongoose;

const nickName = new Schema({
    nickName: { type: String, required: true }
    }, {
    versionKey: false
});

module.exports = mongoose.model('nickName', nickName);
