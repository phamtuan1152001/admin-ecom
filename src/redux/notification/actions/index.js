import * as Actions from "../constants"

export const setNotification = (payload) => {
  return {
    type: Actions.SET_NOTIFICATION,
    payload
  }
}

export const getListNotification = (payload) => {
  return {
    type: Actions.GET_LIST_NOTIFICATION,
    payload
  }
}

export const createNotification = (payload) => {
  return {
    type: Actions.CREATE_NOTIFICATION,
    payload
  }
}

export const deleteNotification = (payload) => {
  return {
    type: Actions.DELETE_NOTIFICATION,
    payload
  }
}

export const updateNotification = (payload) => {
  return {
    type: Actions.UPDATE_NOTIFICATION,
    payload
  }
}

export const resetNotification = (payload) => {
  return {
    type: Actions.RESET_NOTIFICATION,
    payload
  }
}

export const setSuccessNotification = (payload) => {
  return {
    type: Actions.SET_SUCCESS_NOTIFICATION,
    payload
  }
}

export const setFailNotification = (payload) => {
  return {
    type: Actions.SET_FAIL_NOTIFICATION,
    payload
  }
}

export const setLoadingNotification = (payload) => {
  return {
    type: Actions.SET_LOADING_NOTIFICATION,
    payload
  }
}