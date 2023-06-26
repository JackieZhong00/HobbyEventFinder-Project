import { useState } from 'react'
import axios from 'axios'

//still need to add validation feature

const Createuser = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
  })

  const createUsername = (newUsername) => {
    setUser({ ...user, username: newUsername })
  }

  const createPassword = (newPassword) => {
    setUser({ ...user, password: newPassword })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // const user = {username: e.} // this var holds the request body
    const formData = new FormData(e.currentTarget)
    const username = formData.get('username')
    const password = formData.get('password')
    const user = { username, password }

    axios
      .post('http://localhost:5017/user/add', user) // first argument = endpoint that we're sending req body to, second argument = req body ; /add comes from route specified in backend file user.js
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))
    setUser({ username: '', password: '' })
  }
  return (
    <div>
      <h3>Create Account</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="username"
          name="username"
          onChange={createUsername}
        />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="password"
          name="password"
          onChange={createPassword}
        />
        <label htmlFor="password">Password</label>

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
export default Createuser
