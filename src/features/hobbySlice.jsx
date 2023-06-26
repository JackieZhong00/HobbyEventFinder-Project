import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  hobby: axios.get('http:localhost:5017/hobby/'),
}

const hobbySlice = createSlice({
  name: 'hobbySlice',
  initialState,
  reducers: {
    displayModal: (state, action) => {
        const hobbyId = action.payload
        state.hobby.filter((hobby) => hobby.id === hobbyId)
    },
  },
})

export const { displayModal } = hobbySlice.actions
export default hobbySlice.reducer
