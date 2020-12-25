const mongoose = require('mongoose')
const bycrpt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/config').get(process.env.NODE_ENV)

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  firstname: {
    type: String,
    maxlength: 100,
  },
  lastname: {
    type: String,
    maxlength: 100,
  },
  role: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
  },
})

userSchema.pre('save', function (next) {
  let user = this
  if (user.isModified('password')) {
    bycrpt.genSalt(10, (err, salt) => {
      if (err) return next(err)
      bycrpt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err)
        user.password = hash
        next()
      })
    })
  } else {
    next()
  }
})

userSchema.methods.comparePasswords = function (candPassword, cb) {
  let user = this
  bycrpt.compare(candPassword, user.password, (err, isMatch) => {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}

userSchema.methods.generateToken = function (cb) {
  let user = this
  let token = jwt.sign(user._id.toHexString(), config.SECRET)

  user.token = token
  user.save((err, user) => {
    if (err) return cb(err)
    cb(null, user)
  })
}

userSchema.statics.findByToken = function (token, cb) {
  let user = this

  jwt.verify(token, config.SECRET, (err, decoded) => {
    user.findOne({ "_id": decoded, "token": token }, (err, user) => {
      if (err) return cb(err)
      cb(null, user)
    })
  })
}

userSchema.methods.deleteToken = function (token, cb) {
  let user = this
  user.updateOne({ $unset: { token: 1 } }, (err, user) => {
    if (err) return cb(err)
    cb(null, user)
  })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }
