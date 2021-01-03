const express = require('express')
const router = express.Router()

// MIDDLEWARE
const { auth } = require('../middleware/auth')

// MODELS
const { User } = require('../models/user')

router.post('/register', (req, res) => {
  const user = new User(req.body)

  user.save((err, doc) => {
    if (err) return res.status(401).json({ message: 'Something went wrong' })
    res.status(200).json({
      success: true,
      user: doc,
    })
  })
})

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        auth: false,
        message: 'Login fail, please check your email or passowrd',
        userData: false,
      })

    user.comparePasswords(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.status(401).json({
          auth: false,
          message: 'Wrong password or email',
          userData: false,
        })

      // token
      user.generateToken((err, user) => {
        if (err) return res.status(401).send(err)
        res.cookie('auth', user.token).json({
          auth: true,
          userData: {
            id: user._id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
          },
        })
      })
    })
  })
})

router.get('/auth', auth, (req, res) => {
  res.json({
    auth: true,
    userData: {
      id: req.user._id,
      email: req.user.email,
      firstname: req.user.firstname,
      lastname: req.user.lastname,
    },
  })
})

router.get('/logout', auth, (req, res) => {
  req.user.deleteToken(req.token, (err, user) => {
    if (err) return res.status(401).send(err)
    res.status(200).send('goodbye!')
  })
})

module.exports = router
