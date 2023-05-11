const mongoose = require('mongoose');
const slugify = require('slugify');

const partnerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Nje partner duhet te kete nje titull.'],
    trim: true,
    max: [30, 'Nje titull partneri duhet te kete maksimumi 30 shkronja.'],
    min: [5, 'Nje titull partneri duhet te kete te pakten 5 shkronja.'],
  },
  slug: { type: String },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  description: {
    type: String,
    required: [true, 'Nje partner duhet te permbaje nje pershkrim.'],
  },
  imageCover: {
    type: String,
  },
  link: {
    type: String,
  },
});

partnerSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Partner = mongoose.model('Partner', partnerSchema);

module.exports = Partner;
