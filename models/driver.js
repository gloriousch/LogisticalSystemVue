const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 创建Schema
const driverSchema = new Schema({
  name: {
    type: String,
    // required: true
  },
  sex: {
    type: String
  },
  num: {
    type: Number
  },
  state: {
    type: String,
    default: String
  }
});

module.exports = Profile = mongoose.model('driver', driverSchema);
