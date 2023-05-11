const mongoose = require('mongoose');
const validator = require('validator');

const employmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Specifiko titullin e vendit te punes.'],
    trim: true,
    min: [3, 'Titulli duhet te kete te pakten 3 shkronja.'],
  },
  experience: {
    type: Boolean,
    required: [true, 'Specifiko eksperiencen (true/false).'],
  },
  email: {
    type: String,
    required: [true, 'Specifiko emailin e kompanise punedhenese.'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Ju lutem vendosni nje email te sakte.']
  },
  imageCover: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Employment = mongoose.model('Employment', employmentSchema);

module.exports = Employment;
