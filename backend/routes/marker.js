const router = require('express').Router()
let Marker = require('../models/marker.model')

router.route('/').get((req, res) => {
  Marker.find()
    .then((marker) => res.json(marker))
    .catch((err) => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
  const lat = req.body.lat
  const lng = req.body.lng
  const newMarker = new Marker({ lat, lng })

  newMarker
    .save()
    .then(() => res.json('user has been successfully added'))
    .catch((err) => res.status(400).json('Error: ' + err))
})


router.route('/:id').delete((req, res) => {
  Hobby.findByIdAndDelete(req.params.id)
    .then(() => res.json('The hobby post has now been deleted'))
    .catch((err) => res.status(400).json('Your error was: ' + err))
})

module.exports = router


