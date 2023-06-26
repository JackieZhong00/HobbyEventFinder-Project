import axios from 'axios'
import { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Edithobby from './Edithobby'
import Map from './Map'
import { useSelector } from 'react-redux'
import Searchbar from './Searchbar'


//this page holds the READ and DELETE part of CRUD -- should have interactive map with bubbles representing activity at each specified location
//TODO: send get request to retrieve all inputted activities --> plot activity on map base on where user clicked (use id )
const Hobbylist = () => {
  // const [hobbyList, setHobbylist] = useState([])
  // const displayHobbies = () => {
  //   axios
  //     .get('http://localhost:5017/hobby/')
  //     .then((res) => setHobbylist(res.data)) //.data method
  //     .catch((e) => console.log(e))
  // }
  // const {specificHobby} = useSelector((store) => store.modal)


  // const deleteHobby = async (id) => {
  //   try {
  //     await axios.delete('http://localhost:5017/hobby/' + id)
  //     setHobbylist(hobbyList.filter((hobby) => hobby._id !== id))
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  // useEffect(()=>{
  //   setHobbylist(specificHobby)
  // }, [])

  // useEffect(() => {
  //   const displayHobbies = () => {
  //     axios
  //       .get('http://localhost:5017/hobby/')
  //       .then((res) => setHobbylist(res.data)) //res.data = object holding all properties assoc w each activity
  //       .catch((e) => console.log(e))
  //   }
  //   displayHobbies()
  // }, [])

  return (
      <div>
        <h3>Post Your Activity/Hobby</h3>

        <ul>
          {/* {hobbyList.map((hobby) => {
            return (
              <HobbyPost key={hobby._id} {...hobby}/> 
            )
          })} */}
        </ul>
        <Searchbar/>
        <Map />
      </div>
  )
}
export default Hobbylist
