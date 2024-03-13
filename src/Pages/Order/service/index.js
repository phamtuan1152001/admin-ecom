import apiMethod from "../../../utility/apiMethod";
import {
  GET_LIST_ORDERS_ADMIN,
  GET_DETAIL_ORDER_ADMIN,
  UPDATE_DETAIL_ORDER_ADMIN,
  DELETE_DETAIL_ORDER_ADMIN
} from "./api";

export const getListOrdersAdmin = async (payload) => {
  const { data } = await apiMethod.post(GET_LIST_ORDERS_ADMIN, {
    ...payload
  })
  return data
}

export const getDetailOrderAdmin = async (payload) => {
  const { data } = await apiMethod.get(GET_DETAIL_ORDER_ADMIN + `/${payload}`)
  return data
}

export const deleteDetailOrderAdmin = async (payload) => {
  const { data } = await apiMethod.delete(DELETE_DETAIL_ORDER_ADMIN + `/${payload}`)
  return data
}