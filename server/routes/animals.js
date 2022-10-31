const express = require('express');
const {
  getAnimals,
  createAnimal,
  updateAnimal,
  deleteAnimal,
  singleAnimal,
} = require('../controllers/animals');
const { upload } = require('../utils/image.upload');
const router = express.Router();

router.get('/', getAnimals);
router.post('/', upload.single('image'), createAnimal);
router.delete('/:id', deleteAnimal);
router.put('/:id', upload.single('image'), updateAnimal);
router.get("/:id", singleAnimal)

module.exports = router;
