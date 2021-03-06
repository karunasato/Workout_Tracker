const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: new Date()
    },
    exercises: [
        {
          type: {
              type: String
          },
          name: String,
          duration: Number,
          weight: Number,
          reps: Number,
          sets: Number,
          distance: Number
        }
      ]
});

const Workout = mongoose.model("workout", WorkoutSchema);

module.exports = Workout