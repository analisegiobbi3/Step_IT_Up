const { Schema, model } = require('mongoose');

const routineScheduleSchema = new Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  routine: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const RoutineSchedule = model('RoutineSchedule', routineScheduleSchema)

module.exports = RoutineSchedule; 