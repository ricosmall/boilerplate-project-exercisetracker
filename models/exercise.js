const mongoose = require('mongoose')
const Schema = mongoose.Schema

const exerciseShema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  description: String,
  duration: Number,
  date: { type: Date, default: Date.now() }
})

const ExerciseModel = mongoose.model('ExerciseModel', exerciseShema)

module.exports = ExerciseModel
