import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../features/modalSlice'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Edithobby from './Edithobby'

const MarkerModal = () => {
  const [hobby, setHobby] = useState({})
  const { lat, lng, hobbyList } = useSelector((store) => store.modal)
  const dispatch = useDispatch()
  console.log(hobbyList)
  // console.log(lng)
  // console.log(specificHobby[1].lng)
  //   console.log(specificHobby.find((event)=>event.lng===lng))

  const markerHobby = hobbyList.find((event) => {
    return event.lat === lat && event.lng === lng
  })

  const deleteHobby = async (id) => {
    try {
      await axios.delete('http://localhost:5017/hobby/' + id)
      console.log('delete successful')
      window.location.reload()
    } catch (e) {
      console.log(e)
    }
  }

  const editHobby = () => {
    window.location = '/edit/' + markerHobby._id
  }

  return (
    <aside className="modal-container">
      <div className="hobby-display">
        <li>instagram handle: {markerHobby.username}</li>
        <li>hobby: {markerHobby.hobby}</li>
        <li>description: {markerHobby.description}</li>
        <li>duration: {markerHobby.duration}</li>
        <li>date:{new Date(markerHobby.date).toString()}</li>
        {/* <li>friendsOnly: {markerHobby.friendsOnly}</li> */}
        <li>{markerHobby._id}</li>
        {/* <Link onClick={() => deleteHobby(hobby._id)}>Delete</Link>
        <Link to={'/edit/' + hobby._id}>Edit</Link> */}
      </div>
      <div className="btn-container">Remove?</div>
      <div className="btn-container">
        <button
          type="button"
          className="confirm-btn"
          onClick={() => {
            // deleteMarker
            deleteHobby(markerHobby._id)
            dispatch(closeModal())
          }}
        >
          confirm
        </button>
        <button type='button' className='confirm-btn' onClick={()=>editHobby()}>Edit</button>
        <button
          type="button"
          className="clear-btn"
          onClick={() => {
            dispatch(closeModal())
          }}
        >
          cancel
        </button>
      </div>
    </aside>


    // <div className="modal fade modal-lg">
    //   <div className="modal-dialog">
    //     <div className="modal-content">
    //       <div className="modal-body">
    //         <li>instagram handle: {markerHobby.username}</li>
    //         <li>hobby: {markerHobby.hobby}</li>
    //         <li>description: {markerHobby.description}</li>
    //         <li>duration: {markerHobby.duration}</li>
    //         <li>date:{new Date(markerHobby.date).toString()}</li>
    //         <li>friendsOnly: {markerHobby.friendsOnly}</li>
    //         <li>{markerHobby._id}</li>
    //         {/* <Link onClick={() => deleteHobby(hobby._id)}>Delete</Link>
    //     <Link to={'/edit/' + hobby._id}>Edit</Link> */}
    //       </div>

    //       <div className="modal-footer">
    //         <div className="btn-container">Remove?</div>
    //         <button
    //           type="button"
    //           className="btn btn-primary"
    //           onClick={() => {
    //             // deleteMarker
    //             deleteHobby(markerHobby._id)
    //             dispatch(closeModal())
    //           }}
    //         >
    //           confirm
    //         </button>
    //         <button
    //           type="button"
    //           className="btn btn-primary"
    //           onClick={() => editHobby()}
    //         >
    //           Edit
    //         </button>
    //         <button
    //           type="button"
    //           className="btn btn-primary"
    //           onClick={() => {
    //             dispatch(closeModal())
    //           }}
    //         >
    //           cancel
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}
export default MarkerModal
