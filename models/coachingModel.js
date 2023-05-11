const mongoose = require('mongoose');
const slugify = require('slugify');

const coachingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Nje trajnim duhet te kete nje titull.'],
    trim: true,
    max: [30, 'Nje titull trajnimi duhet te kete maksimumi 30 shkronja.'],
    min: [5, 'Nje titull trajnimi duhet te kete te pakten 5 shkronja.'],
  },
  slug: { type: String },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  description: {
    type: String,
    required: [true, 'Nje trajnim duhet te permbaje nje pershkrim.'],
  },
  imageCover: {
    type: String,
  },
  images: [String],
});

coachingSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Coaching = mongoose.model('Coaching', coachingSchema);

module.exports = Coaching;
