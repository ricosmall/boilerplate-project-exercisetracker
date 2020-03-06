const express = require('express')
const router = express.Router()
const { UserModel, ExerciseModel } = require('../models')

app.post('/exercise/new-user', async (req, res) => {
  const { username } = req.body
  const user = new UserModel({
    username
  })
  await user.save()
  res.json(user)
})

app.get('/exercise/users', async (req, res) => {
  const users = await UserModel.find()
  res.json(users)
})

app.post('/exercise/add', async (req, res) => {
  const { userId, description, duration, date } = req.body
  const user = await UserModel.findById(userId)
  const exercise = new ExerciseModel({
    userId: user._id,
    description,
    duration,
    date
  })
  await exercise.save()
  res.json({...user, ...exercise})
})

app.get('/exercise/log', (req, res) => {
  const { userId, from, to, limit } = req.query
  const user = await UserModel.findById(userId)
  const selector = { userId: user._id }
  if (from && to) {
    selector.date = {$gte: from, $lte: to}
  }
  if (limit) {
    selector.limit = limit
  }
  const log = await ExerciseModel.find(selector)
  const count = await ExerciseModel.count(selector)
  res.json({...user, log, count})
})

module.exports = router