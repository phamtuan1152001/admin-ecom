import { combineReducers } from "redux";

import notificationReducer from "./notification/reducers"

const rootReducer = combineReducers({
  notification: notificationReducer
})

export default rootReducer