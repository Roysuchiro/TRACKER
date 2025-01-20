import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  uniqueCode: { type: String, unique: true },
});

export default mongoose.model('User', userSchema);
