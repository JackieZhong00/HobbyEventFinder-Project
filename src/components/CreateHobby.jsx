import { useState } from 'react'
import { Form } from 'react-router-dom'
import ReactDatePicker from 'react-datepicker'
import axios from 'axios'

const Createhobby = ({ id }) => {
  const [hobby, setHobby] = useState({
    userName: '',
    hobby: '',
    description: '',
    // friendsOnly: false,
    duration: 0,
    date: new Date(),
    lat: id.lat,
    lng: id.lng,
  })

  const changeUser = (user) => {
    setHobby({ ...hobby, userName: user })
  }

  const changeHobby = (newHobby) => {
    setHobby({ ...hobby, hobby: newHobby })
  }

  const changeDescription = (newDescription) => {
    setHobby({ ...hobby, description: newDescription })
  }

  // const changeFriendsOnly = (e) => {
  //   const checked = e.target.checked
  //   setHobby({ ...hobby, friendsOnly: checked })
  // }

  const changeDuration = (newDuration) => {
    setHobby({ ...hobby, duration: newDuration })
  }

  const changeDate = (newDate) => {
    setHobby({ ...hobby, date: Date.parse(newDate) })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const username = formData.get('username') // these values correspond to the name attribute of input elements of the form
    const hobby = formData.get('hobby')
    const description = formData.get('description')
    // const friendsOnly = formData.get('friendsOnly')
    const duration = formData.get('duration')
    const date = formData.get('date')
    const lat = id.lat
    const lng = id.lng

    const hobbyPost = {
      username,
      hobby,
      description,
      // friendsOnly,
      duration,
      date,
      lat,
      lng,
    }

    console.log(hobbyPost)
    axios
      .post('http://localhost:5017/hobby/add', hobbyPost) // first argument = endpoint that we're sending req body to, second argument = req body ; /add comes from route specified in backend file hobby.js
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))

    setHobby({
      username: '',
      hobby: '',
      description: '',
      // friendsOnly: false,
      duration: 0,
      date: new Date(),
      lat: 0,
      lng: 0,
    })
    window.location.reload()

    // window.location = '/'
    // e.currentTarget.reset()
  }
  return (
    <div>
      <h3>Create an event/activity</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-floating">
          <input
            type="text"
            id="username"
            name="username"
            onChange={changeUser}
            placeholder="instagram handle"
            className="form-control"
          />
          <label htmlFor="username" className="form-label">
            instagram handle
          </label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            id="hobby"
            name="hobby"
            onChange={changeHobby}
            placeholder="hobby/event"
            className="form-control"
          />
          <label htmlFor="hobby" className="form-label">
            Hobby
          </label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            id="description"
            name="description"
            onChange={changeDescription}
            placeholder="description"
            className="form-control"
          />
          <label htmlFor="description" className="form-label">
            Description
          </label>
        </div>

        <div className="form-floating">
          <input
            type="number"
            id="duration"
            name="duration"
            onChange={changeDuration}
            placeholder="duration"
            className="form-control"
          />
          <label htmlFor="duration" className="form-label">
            Duration in minutes
          </label>
        </div>
        {/* <div className="btn-group">
          <input
            type="checkbox"
            id="friendsOnly"
            name="friendsOnly"
            onChange={changeFriendsOnly}
            checked={hobby.friendsOnly}
            className="btn-check"
            autoComplete="off"
          />
          <label htmlFor="friendsOnly" className="btn btn-outline-primary">
            Friends Only?
          </label>
        </div> */}
        <div>
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <ReactDatePicker
            id="date"
            name="date"
            selected={hobby.date}
            onChange={changeDate}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}
export default Createhobby
