import apiMethod from "../../../utility/apiMethod";
import { GET_LIST_NOTIFICATION_API } from "../constants";

export const apiGetListNotification = async (payload) => {
  const { data } = await apiMethod.post(GET_LIST_NOTIFICATION_API, payload)
  return data
}