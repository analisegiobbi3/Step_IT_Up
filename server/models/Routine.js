const { Schema, model } = require('mongoose');

const routineSchema = new Schema(
    {
    title: {
        type: String,
        required: true,
    },
    routine: {
        type: String, 
        required: true,
    },
}
);

const Routine = model('Routine', routineSchema)

module.exports = Routine; 