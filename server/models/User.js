const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      sparse: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      sparse: true,
    },
    avatar: {
      type: String,
      default:
        'https://res.cloudinary.com/drsimple/image/upload/v1667038955/km1fellcl1u9cjc5iayz.png',
    },
    avatarId: {
      type: String,
    },
    assetId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
