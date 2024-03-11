import apiMethod from "../../../../utility/apiMethod";
import { GET_LIST_PRODUCTS, DELETE_DETAIL_PRODUCT } from "./api";

export const getListProducts = async (payload) => {
  const { data } = await apiMethod.post(GET_LIST_PRODUCTS, {
    ...payload
  })
  return data
}

export const deleteDetailProduct = async (payload) => {
  const { productId } = payload || {}
  const { data } = await apiMethod.delete(DELETE_DETAIL_PRODUCT + `/${productId}`)
  return data
}