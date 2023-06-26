const mongoose = require('mongoose')
const Schema = mongoose.Schema

const markerSchema = new Schema(
  {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true,
    },
  },
)

const Marker = mongoose.model('Marker', markerSchema)

module.exports = Marker
