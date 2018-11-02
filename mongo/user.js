import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  password: String,
});

module.exports = mongoose.model('user', userSchema);
