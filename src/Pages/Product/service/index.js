import apiMethod from "../../../utility/apiMethod";
import {
  GET_LIST_PRODUCTS,
  DELETE_DETAIL_PRODUCT,
  UPLOAD_PRODUCT,
  CREATE_PRODUCT
} from "./api";

export const createProduct = async (payload) => {
  const { data } = await apiMethod.post(CREATE_PRODUCT, {
    ...payload
  })
  return data
}

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

export const uploadImgProduct = (payload) => {
  return apiMethod.post(UPLOAD_PRODUCT, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};