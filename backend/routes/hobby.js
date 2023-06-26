const router = require('express').Router()
let Hobby = require('../models/hobby.model')

router.route('/').get((req, res) => {
  Hobby.find()
    .then((hobby) => res.json(hobby))
    .catch((err) => res.status(400).json('Error:' + err))
})

router.route('/add').post((req, res) => {
  const username = req.body.username
  const hobby = req.body.hobby
  const description = req.body.description
  const friendsOnly = req.body.friendsOnly
  const duration = Number(req.body.duration)
  const date = Date.parse(req.body.date)
  const lat = req.body.lat
  const lng = req.body.lng

  const newHobby = new Hobby({
    username,
    hobby,
    description,
    friendsOnly,
    duration,
    date,
    lat,
    lng,
  })

  newHobby
    .save()
    .then(() => res.json('Your hobby has been successfully uploaded'))
    .catch((err) => res.status(400).json('Your error was: ' + err))
})

router.route('/:id').get((req, res) => {
  Hobby.findById(req.params.id)
    .then((hobby) => res.json(hobby))
    .catch((err) => res.status(400).json('Your error was: ' + err))
})

router.route('/:id').delete((req, res) => {
  Hobby.findByIdAndDelete(req.params.id)
    .then(() => res.json('The hobby post has now been deleted'))
    .catch((err) => res.status(400).json('Your error was: ' + err))
})

router.route('/:id').put((req, res) => {
  const { id } = req.params
  const updatedHobby = req.body
  Hobby.findByIdAndUpdate(id, updatedHobby, {
    new: true,
  })
    .then((res)=>console.log("successfully updated!"))
    .catch((e) => console.log(e))
})

// router.route('/update/:id').post((req, res) => {
//   Hobby.findById(req.params.id)
//     .then((hobby) => {
//       hobby.username = req.body.username
//       hobby.hobby = req.body.hobby
//       hobby.description = req.body.description
//       hobby.friendsOnly = req.body.friendsOnly
//       hobby.duration = Number(req.body.duration)
//       hobby.date = Date.parse(req.body.date)
//       hobby.lat = hobby.lat
//       hobby.lng = hobby.lng

//       hobby
//         .save()
//         .then(() => res.json('this hobby has now been updated'))
//         .catch((err) => res.status(400).json('Your error was: ' + err))
//     })
//     .catch((err) => res.status(400).json('Your error was: ' + err))
// })

module.exports = router
