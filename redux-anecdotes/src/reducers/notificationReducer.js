import { createSlice } from '@reduxjs/toolkit'

const initialState = ""

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    }
  }
})

export const { showNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer 

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch(showNotification(message))
    setTimeout(() => dispatch(clearNotification()), time * 1000)
  }
  
}