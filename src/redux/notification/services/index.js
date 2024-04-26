import apiMethod from "../../../utility/apiMethod";
import { GET_LIST_NOTIFICATION_API, UPDATE_NOTIFICATION_STATUS_API } from "../constants";

export const apiGetListNotification = async (payload) => {
  const { data } = await apiMethod.post(GET_LIST_NOTIFICATION_API, payload)
  return data
}

export const apiUpdateStatusNotification = async (payload) => {
  const { data } = await apiMethod.put(UPDATE_NOTIFICATION_STATUS_API, payload)
  return data
}