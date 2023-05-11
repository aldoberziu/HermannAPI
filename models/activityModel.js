const mongoose = require('mongoose');
const slugify = require('slugify');

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Nje aktivitet duhet te kete nje titull.'],
    trim: true,
    max: [30, 'Nje titull aktiviteti duhet te kete maksimumi 30 shkronja.'],
    min: [5, 'Nje titull aktiviteti duhet te kete te pakten 5 shkronja.'],
  },
  slug: { type: String },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  description: {
    type: String,
    required: [true, 'Nje aktivitet duhet te permbaje nje pershkrim.'],
  },
  imageCover: {
    type: String,
  },
  images: [String],
});

activitySchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
