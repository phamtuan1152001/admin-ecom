import apiMethod from "../../../utility/apiMethod";
import {
  GET_LIST_PRODUCTS,
  DELETE_DETAIL_PRODUCT,
  UPLOAD_PRODUCT,
  CREATE_PRODUCT,
  CREATE_MULTIPLE_PRODUCTS,
  GET_DETAIL_PRODUCT,
  UPDATE_DETAIL_PRODUCT,
  UPLOAD_MULTIPLE_IMG_PRODUCT,
  CREATE_IMPORT,
  GET_LIST_IMPORTS,
  GET_DETAIL_IMPORT,
  UPDATE_DETAIL_IMPORT,
  DELETE_DETAIL_IMPORT
} from "./api";

/* PRODUCTS */
export const createMultipleProducts = async (payload) => {
  const { data } = await apiMethod.post(CREATE_MULTIPLE_PRODUCTS, {
    ...payload
  })
  return data
}

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

/* UPLOAD TO CLOUDINARY */
export const uploadImgProduct = (payload) => {
  return apiMethod.post(UPLOAD_PRODUCT, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const uploadMultipleImgProduct = (payload) => {
  return apiMethod.post(UPLOAD_MULTIPLE_IMG_PRODUCT, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/* Manage Imports */

export const getListImports = async (payload) => {
  const { data } = await apiMethod.post(GET_LIST_IMPORTS, {
    ...payload
  })
  return data
}

export const createImport = async (payload) => {
  const { data } = await apiMethod.post(CREATE_IMPORT, {
    ...payload
  })
  return data
}

export const getDetailImport = async (payload) => {
  const { data } = await apiMethod.post(GET_DETAIL_IMPORT + `/${payload?.importId}`, {
    userId: payload?.userId
  })
  return data
}

export const updateDetailImport = async (payload) => {
  const { data } = await apiMethod.put(UPDATE_DETAIL_IMPORT + `/${payload?._id}`, {
    ...payload
  })
  return data
}

export const deleteDetailImport = async (payload) => {
  const { data } = await apiMethod.delete(DELETE_DETAIL_IMPORT + `/${payload?.importId}`)
  return data
}