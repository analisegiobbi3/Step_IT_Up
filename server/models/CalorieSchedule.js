const { Schema, model } = require('mongoose');

const calorieScheduleSchema = new Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  calorie: {
    type: Number,
    required: true,
  },
});

const CalorieSchedule = model('CalorieSchedule', calorieScheduleSchema)

module.exports = CalorieSchedule; 