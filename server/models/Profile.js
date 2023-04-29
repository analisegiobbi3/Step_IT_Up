const { Schema, model } = require('mongoose');


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
    activityLevel: {
        type: Number, 
        required: true,
    },
    calories: {
        type: Number,
        required: false
    }
}
);

const Profile = model('Profile', profileSchema)

module.exports = Profile; 