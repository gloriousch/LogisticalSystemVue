const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 创建Schema
const psSchema = new Schema({
  psid: {
    type: String,
    // required: true
  },
  psName: {
    type: String
  },
  place: {
    type: String
  },
});

module.exports = Profile = mongoose.model('peisong', psSchema);
