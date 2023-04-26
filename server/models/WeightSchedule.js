const { Schema, model } = require('mongoose');

const weightScheduleSchema = new Schema(
    {
    date: {
        type: Date,
        required: true,
    },
    weight: {
        type: Number, 
        required: true,
    },
}
);

const WeightSchedule = model('WeightSchedule', weightScheduleSchema)

module.exports = WeightSchedule; 