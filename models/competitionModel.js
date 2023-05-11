const mongoose = require('mongoose');
const slugify = require('slugify');

const competitionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Nje konkurs duhet te kete nje titull.'],
    trim: true,
    max: [30, 'Nje titull konkursi duhet te kete maksimumi 30 shkronja.'],
    min: [5, 'Nje titull konkursi duhet te kete te pakten 5 shkronja.'],
  },
  slug: { type: String },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  description: {
    type: String,
    required: [true, 'Nje konkurs duhet te permbaje nje pershkrim.'],
  },
  images: [String],
  imageCover: {
    type: String,
  },
});

competitionSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Competition = mongoose.model('Competition', competitionSchema);

module.exports = Competition;
