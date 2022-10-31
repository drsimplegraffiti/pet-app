const mongoose = require('mongoose');
const Animal = require('../models/Animals');

const { cloudinary } = require('../utils/image.upload');

exports.getAnimals = async (req, res) => {
  try {
    const animals = await Animal.find().sort({
      createdAt: -1,
    });
    return res.status(200).json(animals);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err.message });
  }
};

exports.createAnimal = async (req, res) => {
  try {
    const { name, species, age } = req.body;
    let emptyFields = [];

    if (!name) {
      emptyFields.push('name');
    }

    if (!species) {
      emptyFields.push('species');
    }

    if (!age) {
      emptyFields.push('age');
    }

    if (emptyFields.length > 0) {
      return res.status(400).json({
        error: 'Please fill in all fields',
        emptyFields,
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result);
    const animal = new Animal({
      name: name,
      species: species,
      age: age,
      photoId: result.public_id,
      assetId: result.asset_id,
      photo:
        result.secure_url ||
        'https://res.cloudinary.com/drsimple/image/upload/v1667038955/km1fellcl1u9cjc5iayz.png',
    });
    await animal.save();
    return res.status(201).json(animal);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.updateAnimal = async (req, res) => {
  try {
    const { name, species, age } = req.body;
    console.log(JSON.parse(JSON.stringify(req.body)));
    const animal = await Animal.findById(req.params.id);

    // delete old picture from cloudinary
    await cloudinary.uploader.destroy(animal.photoId);

    // upload new picture to cloudinary
    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' });
    }
    const result = await cloudinary.uploader.upload(req.file.path);
    animal.name = name;
    animal.species = species;
    animal.age = age;
    animal.photo = result.secure_url;
    await animal.save();
    return res.status(200).json(animal);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteAnimal = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        error: 'No such animal',
      });
    }
    const animal = await Animal.findOneAndDelete({ _id: id });

    // delete picture from cloudinary
    await cloudinary.uploader.destroy(animal.photoId);

    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' });
    }
    return res.status(200).json(animal);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.singleAnimal = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        error: 'No such animal',
      });
    }
    const animal = await Animal.findOne({ _id: id });
    console.log({ animal });
    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' });
    }
    return res.status(200).json(animal);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
