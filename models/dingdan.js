const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 创建Schema
const ddSchema = new Schema({
  ddId: {
    type: Number,
    required: true
  },
  fDz: {
    type: String
  },
  fName: {
    type: String
  },
  fNum: {
    type: Number
  },
  sDz: {
    type: String,
  },
  sName: {
    type: String
  },
  sNum: {
    type: Number
  },
  fp: {
    type: String
  },
  money: {
    type: Number
  },
});

module.exports = Profile = mongoose.model('dd', ddSchema);
