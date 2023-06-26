import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  isOpen: false,
  lat: 0,
  lng: 0,
  isLoading: false,
  hobbyList: [],
  markersGenre: ''
}

export const getHobby = createAsyncThunk('modal/getHobby', async () => {
  try {
    const response = await axios.get('http://localhost:5017/hobby/')
    return response.data
  } catch (err) {
    console.log(err)
    throw err
  }
})

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true
      const lat = action.payload.lat
      const lng = action.payload.lng
      state.lat = lat
      state.lng = lng
    },
    closeModal: (state, action) => {
      state.isOpen = false
    },
    displayMarkers: (state, action) => {
      state.markersGenre = action.payload
    },
  },
  extraReducers: {
    [getHobby.pending]: (state) => {
      state.isLoading = true
    },
    [getHobby.fulfilled]: (state, action) => {
      console.log(action)
      state.isLoading = false
      state.hobbyList = [...action.payload]
    },
    [getHobby.rejected]: (state) => {
      state.isLoading = false
    },
  },
})

export const { openModal, closeModal, displayMarkers } = modalSlice.actions
export default modalSlice.reducer
