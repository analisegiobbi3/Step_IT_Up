const { Schema, model } = require('mongoose');

const routineSchema = new Schema(
    {
    author: {
        type: String,
        required: true,
        trim: true,
    },
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String, 
        required: true,
    },
}
);

const Routine = model('Routine', routineSchema)

module.exports = Routine; 