import apiMethod from "../../../utility/apiMethod";
import { GET_LIST_NOTIFICATION_API, UPDATE_NOTIFICATION_STATUS_API, PUSH_NOTI_TO_CLIENT_FOR_CONFIRM, READ_ALL_NOTIFICATION } from "../constants";

export const apiGetListNotification = async (payload) => {
  const { data } = await apiMethod.post(GET_LIST_NOTIFICATION_API, payload)
  return data
}

export const apiUpdateStatusNotification = async (payload) => {
  const { data } = await apiMethod.put(UPDATE_NOTIFICATION_STATUS_API, payload)
  return data
}

export const pushNotiToClientForConfirming = async (payload) => {
  const { data } = await apiMethod.post(PUSH_NOTI_TO_CLIENT_FOR_CONFIRM, payload)
  return data
}

export const readAllNotification = async (payload) => {
  const { data } = await apiMethod.put(READ_ALL_NOTIFICATION, payload)
  return data
}