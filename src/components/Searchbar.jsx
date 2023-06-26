import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { displayMarkers } from '../features/modalSlice'

const Searchbar = () => {
  const [searchInput, setSearchInput] = useState('')
  const dispatch = useDispatch()
  const [filteredData, setFilteredData] = useState([])
  const { hobbyList } = useSelector((store) => store.modal)

  //   const handleChange = (e) => {
  //     e.preventDefault()
  //     // setSearchInput(e.target.value)
  //     if (e.target.value === '') {
  //       setFilteredData([])
  //     } else {
  //       const data = hobbyList.filter((hobby) =>
  //         hobby.hobby.toLowerCase().match(e.target.value.toLowerCase())
  //       )
  //       setFilteredData(data)
  //       //   console.log(filteredData)
  //     }
  //   }

  const handleChange = (e) => {
    e.preventDefault()
    const input = e.target.value
    if (input === '') {
      setFilteredData([])
    } else {
      setSearchInput(input)
      const uniqueNames = Array.from(
        new Set(
          hobbyList
            .filter((hobby) =>
              hobby.hobby.toLowerCase().includes(searchInput.toLowerCase())
            )
            .map((item) => item.hobby)
        )
      )
      setFilteredData(uniqueNames)
      console.log(filteredData)
    }
  }

  return (
    <div>
      <div>
        <input
          id="searchInput"
          name="searchInput"
          type="text"
          onChange={handleChange}
          placeholder="Search/Filter for event"
          className="form-control"
        />
        <label htmlFor="searchInput" className="form-label"></label>
      </div>

      <div className='list-group'>
        {filteredData.slice(0, 15).map((hobby) => (
          <a className='list-group-item list-group-item-action' key={hobby} onClick={() => dispatch(displayMarkers(hobby))}>
            <p>{hobby}</p>
          </a>
        ))}
      </div>
    </div>
  )
}
export default Searchbar
