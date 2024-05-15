import * as Actions from "../constants"
import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"

const initialState = {
  notification: [],
  loading: false,
  success: "",
  fail: ""
}

const notificationReducers = (state = initialState, action = {}) => {
  // console.log("data", { state, action })
  switch (action?.type) {
    case Actions.SET_SUCCESS_NOTIFICATION:
      return {
        ...state,
        success: action?.payload
      }
    case Actions.SET_FAIL_NOTIFICATION:
      return {
        ...state,
        fail: action?.payload
      }
    case Actions.SET_LOADING_NOTIFICATION:
      return {
        ...state,
        loading: action?.payload
      }
    case Actions.RESET_NOTIFICATION:
      return initialState;
    case Actions.SET_NOTIFICATION:
      return {
        ...state,
        notification: action?.payload
      };
    default:
      return initialState
  }
}

const persistConfig = {
  key: "Notification",
  storage,
  blacklist: ["loading", "fail", "success"],
};

export default persistReducer(persistConfig, notificationReducers);