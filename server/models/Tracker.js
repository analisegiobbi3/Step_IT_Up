const { Schema, model } = require('mongoose');

const trackerSchema = new Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
  },
  scheduledRoutines: [
    {
      routineName: {
        type: String,
        require: false,
      },
      complete: {
        type: Boolean,
        default: false,
      },
    },
  ],
  weight: {
    type: Number,
    required: false,
  },
  calorie: {
    type: Number,
    required: false,
  }
});

const Tracker = model('Tracker', trackerSchema)

module.exports = Tracker; 