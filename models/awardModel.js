const mongoose = require('mongoose');
const slugify = require('slugify');

const awardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Specifiko nje emer per cmimin.'],
    trim: true,
    min: [3, 'Titulli duhet te kete te pakten 3 shkronja.'],
  },
  slug: { type: String },
  wonBy: {
    type: [String],
    required: [true, 'Specifiko emrat per fituesin/en/it.'],
  },
  description: {
    type: String,
    required: [true, 'Specifiko nje pershkrim per eventin.'],
  },
  organizer: {
    type: String,
    required: [true, 'Specifiko organizatorin e eventit.'],
  },
  year: {
    type: Date,
    required: [true, 'Specifiko daten e eventit.'],
    default: Date.now(),
  },
  images: [String],
  imageCover: {
    type: String,
  },

});

awardSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Award = mongoose.model('Award', awardSchema);

module.exports = Award;


//titull, emri ekipit, createdAt, images, imageCover, description