const mongoose = require('mongoose')
const Schema = mongoose.Schema

const hobbySchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    hobby: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // friendsOnly: {
    //   type: String,
    //   required: false,
    // },
    duration: {
      type: Number,
      required: true,
    },
    date: {
      type: Number,
      required: true,
    },
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
)

const Hobby = mongoose.model('Hobby', hobbySchema)

module.exports = Hobby
