import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true 
  },
  
  userData: {
    type: mongoose.Schema.Types.Mixed, 
    required: true
  }
}, {
  timestamps: true, 
  collection: 'instagram_users'
});

UserSchema.statics.findByUsername = function(username) {
  return this.findOne({ username: username.toLowerCase().trim() });
};

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;