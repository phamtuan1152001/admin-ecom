import apiMethod from "../../../utility/apiMethod";
import {
  GET_LIST_PRODUCTS,
  DELETE_DETAIL_PRODUCT,
  UPLOAD_PRODUCT,
  CREATE_PRODUCT,
  GET_DETAIL_PRODUCT,
  UPDATE_DETAIL_PRODUCT
} from "./api";

export const updateDetailProduct = async (payload) => {
  const { productId, ...rest } = payload || {}
  const { data } = await apiMethod.put(UPDATE_DETAIL_PRODUCT + `/${productId}`, {
    ...rest
  })
  return data
}

export const getDetailProduct = async (payload) => {
  const { data } = await apiMethod.get(GET_DETAIL_PRODUCT + `/${payload?.cateSlug}` + `/${payload?.slug}`)
  return data
}

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