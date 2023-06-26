import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Hobbylist from './components/Hobbylist'
import Edithobby from './components/Edithobby'
import Createhobby from './components/Createhobby'
import Createuser from './components/Createuser'
import Navbar from './components/Navbar'
import 'react-datepicker/dist/react-datepicker.css'
import MarkerModal from './components/MarkerModal'
import { useDispatch, useSelector } from 'react-redux'
import modalSlice, { getHobby } from './features/modalSlice'
import { useEffect } from 'react'
import About from './components/About'




function App() {
  const dispatch = useDispatch()
  const { isOpen } = useSelector((state) => state.modal)
  useEffect(()=>{
    dispatch(getHobby())
  }, [])
  return (
    <Router>
      <div className="container">
        {isOpen && <MarkerModal />}
        <Navbar />
        <Routes>
          <Route path="/" element={<Hobbylist />} />
          <Route path="/edit/:id" element={<Edithobby />} />
          <Route path="/create" element={<Createhobby />} />
          <Route path="/about" element={<About />} />

          {/* <Route path="/user" element={<Createuser />} /> */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
