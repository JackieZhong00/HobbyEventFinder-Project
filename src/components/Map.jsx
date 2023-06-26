import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import { useEffect, useMemo, useState } from 'react'
import Createhobby from './Createhobby'
import { openModal } from '../features/modalSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

export default function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.API_KEY,
  })
  // isLoaded is a prop that can be accessed on all useLoadScript responses
  if (!isLoaded) return <div>loading...</div>

  return <Maps />
}

function Maps() {
  const dispatch = useDispatch()
  const { hobbyList, markersGenre } = useSelector((store) => store.modal)
  const [markers, setMarkers] = useState([])
  const center = useMemo(() => ({ lat: 32.88, lng: -117.22 }), [])
  const [toggleValue, setToggleValue] = useState(null)

  // console.log(markersList)
  const lastIndexOfMarkers = markers.length - 1
  const onMapClick = (e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      },
    ])
    setToggleValue(1)
  }

  useEffect(() => {
    axios
      .get('http://localhost:5017/hobby/')
      .then((res) => setMarkers(res.data))
      .catch((e) => console.log(e))
  }, [])

  useEffect(() => {
    const genre = hobbyList.filter((hobby) => hobby.hobby === markersGenre)
    setMarkers(genre)
  }, [markersGenre])
    
  

  return (
    <div>
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="map-container"
        onClick={onMapClick}
      >
        {markers.map((marker) => (
          <Marker
            onClick={() =>
              dispatch(openModal({ lat: marker.lat, lng: marker.lng }))
            }
            key={marker._id}
            position={{
              lat: marker.lat,
              lng: marker.lng,
            }}
          />
        ))}
      </GoogleMap>
      {toggleValue && <Createhobby id={markers[lastIndexOfMarkers]} />}
    </div>
  )
}
