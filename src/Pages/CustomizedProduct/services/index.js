import apiMethod from "../../../utility/apiMethod";
import {
  GET_LIST_CUSTOMIZED_PRODUCT_ADMIN,
  UPDATE_DETAIL_CUSTOMIZED_PRODUCT_ADMIN,
  DELETE_DETAIL_CUSTOMIZED_PRODUCT_ADMIN
} from "./api";

export const getListCustomizedProductAdmin = async (payload) => {
  const { data } = await apiMethod.post(
    GET_LIST_CUSTOMIZED_PRODUCT_ADMIN,
    {
      ...payload
    }
  )
  return data
}

export const updateStatusProductAdmin = async (payload) => {
  const { data } = await apiMethod.put(
    UPDATE_DETAIL_CUSTOMIZED_PRODUCT_ADMIN + `/${payload?._id}`,
    {
      payload
    }
  )
  return data
}

export const deleteDetailCustomizedProductAdmin = async (payload) => {
  const { data } = await apiMethod.delete(
    DELETE_DETAIL_CUSTOMIZED_PRODUCT_ADMIN + `/${payload?._id}`
  )
  return data
}