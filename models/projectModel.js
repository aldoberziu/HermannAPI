const mongoose = require('mongoose');
const slugify = require('slugify');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Specifiko nje titull per projektin.'],
    trim: true,
    min: [3, 'Titulli duhet te kete te pakten 3 shkronja.'],
  },
  slug: { type: String },
  description: {
    type: String,
    required: [true, 'Specifiko nje pershkrim per projektin.'],
  },
  teamName: {
    type: String,
    required: [true, 'Specifiko emrin e ekipit.'],
  },
  createdAt: {
    type: Date,
    required: [true, 'Specifiko daten e prezantimit.'],
    default: Date.now(),
  },
  images: [String],
  imageCover: {
    type: String,
  },

});

projectSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;