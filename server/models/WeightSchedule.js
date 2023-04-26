const { Schema, model } = require('mongoose');

const weightScheduleSchema = new Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  weight: {
    type: Number,
    required: true,
  },
});

const WeightSchedule = model('WeightSchedule', weightScheduleSchema)

module.exports = WeightSchedule; 