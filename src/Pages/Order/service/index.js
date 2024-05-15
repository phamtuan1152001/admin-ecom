import apiMethod from "../../../utility/apiMethod";
import {
  GET_LIST_ORDERS_ADMIN,
  GET_DETAIL_ORDER_ADMIN,
  UPDATE_DETAIL_ORDER_ADMIN,
  DELETE_DETAIL_ORDER_ADMIN,
  SEND_NOTI_TO_CLIENT
} from "./api";

export const getListOrdersAdmin = async (payload) => {
  const { data } = await apiMethod.post(GET_LIST_ORDERS_ADMIN, {
    ...payload
  })
  return data
}

export const getDetailOrderAdmin = async (payload) => {
  const { data } = await apiMethod.post(GET_DETAIL_ORDER_ADMIN + `/${payload?.orderId}`, {
    userId: payload?.userId
  })
  return data
}

export const deleteDetailOrderAdmin = async (payload) => {
  const { data } = await apiMethod.delete(DELETE_DETAIL_ORDER_ADMIN + `/${payload}`)
  return data
}

export const updateStatusOrderAdmin = async (payload) => {
  const { data } = await apiMethod.put(UPDATE_DETAIL_ORDER_ADMIN + `/${payload?._id}`, {
    ...payload
  })
  return data
}

export const sendNotiToClient = async (payload) => {
  const { data } = await apiMethod.post(SEND_NOTI_TO_CLIENT, payload)
  return data
}