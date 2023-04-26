const { Schema, model } = require('mongoose');

const routineScheduleSchema = new Schema(
    {
    date: {
        type: Date,
        required: true,
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
}
);

const RoutineSchedule = model('RoutineSchedule', routineScheduleSchema)

module.exports = RoutineSchedule; 