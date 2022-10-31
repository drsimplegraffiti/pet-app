const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { cloudinary } = require('../utils/image.upload');

exports.signUpUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await cloudinary.uploader.upload(req.file.path);

    //check existing user
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
      avatarId: result.public_id,
      assetId: result.asset_id,
      avatar:
        result.secure_url ||
        'https://res.cloudinary.com/drsimple/image/upload/v1667038955/km1fellcl1u9cjc5iayz.png',
    });
    await user.save();
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ email: user.email, id: user._id }, 'test', {
      expiresIn: '1h',
    });
    return res.status(200).json({ result: user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.user;
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // delete former image from cloudinary if user wants to edit image
    if (req.file) {
      await cloudinary.uploader.destroy(user.avatarId);
      const result = await cloudinary.uploader.upload(req.file.path);
      user.avatarId = result.public_id;
      user.assetId = result.asset_id;
      user.avatar = result.secure_url;
    }

    user.name = name;
    user.email = email;
    user.password = hashedPassword;

    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
