import apiMethod from "../../../utility/apiMethod";
import {
  GET_LIST_ORDER_CUSTOMIZED_PRODUCT_ADMIN,
  GET_DETAIL_ORDER_CUSTOMIZED_PRODUCT_ADMIN,
  UPDATE_DETAIL_ORDER_CUSTOMIZED_PRODUCT_ADMIN,
  DELETE_DETAIL_ORDER_CUSTOMIZED_PRODUCT_ADMIN
} from "./api";

export const getListOrderCustomizedProductAdmin = async (payload) => {
  const { data } = await apiMethod.post(
    GET_LIST_ORDER_CUSTOMIZED_PRODUCT_ADMIN, {
    ...payload
  }
  )
  return data
}

export const getDetailOrderCustomizedProductAdmin = async (payload) => {
  const { data } = await apiMethod.post(
    GET_DETAIL_ORDER_CUSTOMIZED_PRODUCT_ADMIN + `/${payload?.orderId}`, {
    userId: payload?.userId
  }
  )
  return data
}

export const updateDetailOrderCustomizedProductAdmin = async (payload) => {
  const { data } = await apiMethod.put(
    UPDATE_DETAIL_ORDER_CUSTOMIZED_PRODUCT_ADMIN + `/${payload?._id}`, {
    ...payload
  }
  )
  return data
}

export const deleteDetailOrderCustomizedProductAdmin = async (payload) => {
  const { data } = await apiMethod.delete(
    DELETE_DETAIL_ORDER_CUSTOMIZED_PRODUCT_ADMIN + `/${payload?.id}`
  )
  return data
}