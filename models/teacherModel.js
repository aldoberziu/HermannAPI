const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Specifiko nje emer per mesuesin/en.'],
    trim: true,
    min: [3, 'Emri duhet te kete te pakten 3 shkronja.'],
  },
  image: {
    type: String,
    default: 'default.png',
  },
  nickname: {
    type: String,
    default: 'SOS',
  },
  specialization: {
    type: [String],
    required: [true, 'Percakto specializimet e mesuesit/es'],
  },
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
