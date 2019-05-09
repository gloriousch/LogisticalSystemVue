const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 创建Schema
const profileSchema = new Schema({
  // carNum: {
  //   type: Number,
  //   required: true
  // },
  chePaiHao: {
    type: Number,
    required: true
  },
  type: {
    type: String
  },
  describe: {
    type: String
  },
  state: {
    type: String,
    default: String
  }
});

module.exports = Profile = mongoose.model('profile', profileSchema);
