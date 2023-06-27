import { useState, useEffect } from 'react'
import { Form, useParams } from 'react-router-dom'
import ReactDatePicker from 'react-datepicker'
import axios from 'axios'

const Edithobby = () => {
  const [theHobby, setHobby] = useState({
    userName: '',
    hobby: '',
    description: '',
    // friendsOnly: false,
    duration: 0,
    date: new Date(),
    lat: 0,
    lng: 0,
  })

  const { id } = useParams()

  const changeUser = (newUser) => {
    setHobby({ ...theHobby, userName: newUser })
  }

  const changeHobby = (e) => {
    const newHobby = e.target.value
    setHobby({ ...theHobby, hobby: newHobby })
  }

  const changeDescription = (e) => {
    const newDescription = e.target.value
    setHobby({ ...theHobby, description: newDescription })
  }

  // const changeFriendsOnly = (e) => {
  //   console.log(e.target.checked)
  //   const checked = e.target.checked
  //   setHobby((prevHobby) => ({ ...prevHobby, friendsOnly: checked }))
  // }

  const changeDuration = (e) => {
    const newDuration = e.target.value
    setHobby({ ...theHobby, duration: newDuration })
  }

  const changeDate = (newDate) => {
    setHobby({ ...theHobby, date: Date.parse(newDate) })
  }

  useEffect(() => {
    axios
      .get('http://localhost:5017/hobby/' + id)
      .then((res) => {
        setHobby({
          ...res.data,
        })
      })
      .catch((e) => console.log(e))
  }, [])

  const putRequest = async (id, post) => {
    try {
      await axios.put('http://localhost:5017/hobby/' + id, post)
      console.log('success')
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const username = formData.get('username') // these values correspond to the name attribute of input elements of the form
    const hobby = formData.get('hobby')
    const description = formData.get('description')
    // const friendsOnly = formData.get('friendsOnly')
    const duration = formData.get('duration')
    const date = Date.parse(formData.get('date'))
    const lat = theHobby.lat
    const lng = theHobby.lng
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

    putRequest(id, hobbyPost)

    // setHobby({
    //   username: '',
    //   hobby: '',
    //   description: '',
    //   friendsOnly: false,
    //   duration: 0,
    //   date: new Date(),
    //   lat: 0,
    //   lng: 0,
    // })

    window.location = '/'
    // e.currentTarget.reset()
  }
  return (
    <div>
      <h3>Edit event/activity</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">username</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={changeUser}
            defaultValue={theHobby.username}
          />
        </div>
        <div>
          <label htmlFor="hobby">Hobby</label>
          <input
            type="text"
            id="hobby"
            name="hobby"
            onChange={changeHobby}
            value={theHobby.hobby}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            onChange={changeDescription}
            value={theHobby.description}
          />
          {/* <div>
            <label htmlFor="friendsOnly">Friends Only?</label>
            <input
              type="checkbox"
              id="friendsOnly"
              name="friendsOnly"
              onChange={changeFriendsOnly}
              checked={theHobby.friendsOnly}
              value={theHobby.friendsOnly===true?'true':'true'}
            />
            <input type='hidden' name='friendsOnly'value='false'/>
          </div> */}
          <div>
            <label htmlFor="duration">Duration in minutes</label>
            <input
              type="number"
              id="duration"
              name="duration"
              onChange={changeDuration}
              value={theHobby.duration}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <ReactDatePicker
              id="date"
              name="date"
              selected={theHobby.date}
              onChange={changeDate}
              value={theHobby.date}
            />
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
export default Edithobby
