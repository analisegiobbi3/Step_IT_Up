const { Schema, model } = require('mongoose');

const routineSchema = require('./Routine');

const profileSchema = new Schema(
    {
    age: {
        type: Number,
        required: true,
    },
    sex: {
        type: String, 
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true, 
    },
    goalWeight: {
        type: Number, 
        required: true,
    },
    dailyCalories: {
        type: Number,
        required: false
    },
    savedRoutines: [routineSchema],
}
);

const Profile = model('Profile', profileSchema)

module.exports = Profile; 