const mongoose = require('mongoose');
const slugify = require('slugify');

const notifSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Nje njoftim duhet te kete nje titull.'],
    trim: true,
    max: [30, 'Nje titull njoftimi duhet te kete maksimumi 30 shkronja.'],
    min: [5, 'Nje titull njoftimi duhet te kete te pakten 5 shkronja.'],
    unique: true,
  },
  slug: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  imageCover: {
    type: String,
  },
  description: {
    type: String,
    required: [true, 'Nje njoftim duhet te permbaje nje pershkrim.'],
  },
  images: [String],
  pdfFile: {
    type: String,
  },
});

notifSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Notif = mongoose.model('Notif', notifSchema);

module.exports = Notif;
