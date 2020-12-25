const express = require('express')
const router = express.Router()

const { Book } = require('../models/book')
const { auth } = require('../middleware/auth')

router
  .route('/book')
  .get((req, res) => {
    let id = req.query.id

    Book.find({ _id: id })
      .populate('ownerId', 'firstname lastname')
      .exec((err, doc) => {
        if (err) return res.status(400).send(err)
        res.send(doc)
      })
  })
  .post(auth, (req, res) => {
    const book = new Book({
      ...req.body,
      ownerId: req.user._id,
    })

    book.save((err, doc) => {
      if (err) res.status(400).send(err)
      res.status(200).json({
        post: true,
        bookId: doc._id,
      })
    })
  })
  .patch((req, res) => {
    Book.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true },
      (err, doc) => {
        if (err) return res.status(400).send(err)
        res.status(200).send({
          success: true,
          doc,
        })
      }
    )
  })
  .delete((req, res) => {
    let id = req.query.id
    Book.findByIdAndDelete({ _id: id }, (err, doc) => {
      if (err) return res.status(400).send(err)
      res.status(200).send({
        success: true,
      })
    })
  })

router.route('/all_books').get((req, res) => {
  let skip = req.query.skip ? parseInt(req.query.skip) : 0
  let limit = req.query.limit ? parseInt(req.query.limit) : 50
  let order = req.query.order ? req.query.order : 'asc'
  let byOwner = req.query.byOwner ? { ownerId: req.query.byOwner } : {}

  Book.find(byOwner)
    .skip(skip)
    .limit(limit)
    .sort({_id:order})
    .exec((err, doc) => {
      if (err) return res.status(400).send(err)
      res.status(200).send(doc)
    })
})

module.exports = router
