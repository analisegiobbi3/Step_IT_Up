const { Schema, model } = require('mongoose');

const calorieScheduleSchema = new Schema(
    {
    date: {
        type: Date,
        required: true,
    },
    calorie: {
        type: Number, 
        required: true,
    },
}
);

const CalorieSchedule = model('CalorieSchedule', calorieScheduleSchema)

module.exports = CalorieSchedule; 