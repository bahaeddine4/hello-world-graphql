import mongoose from 'mongoose'
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name:  String,
  password: String,
});

module.exports = mongoose.model('user', userSchema);