import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "NEW": 
      return `anecdote '${action.payload}' added`
    case "VOTE": 
      return `anecdote '${action.payload}' voted`
    case "RESET": 
      return ``
    default: 
      return state 
  }
}

const NotificationContext = createContext() 


export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '') 
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext