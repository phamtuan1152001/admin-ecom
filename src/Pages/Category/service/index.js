import apiMethod from "../../../utility/apiMethod";
import { GET_DETAIL_CATEGORY, CREATE_CATEGORY, GET_ALL_CATEGORIES_ADMIN, UPDATE_DETAIL_CATEGORY, DELETE_DETAIL_CATEGORY } from "./api";

export const createCategory = async (payload) => {
  const { data } = await apiMethod.post(CREATE_CATEGORY, {
    ...payload
  })
  return data
}

export const getAllCategories = async (payload) => {
  const { data } = await apiMethod.post(GET_ALL_CATEGORIES_ADMIN, {
    ...payload
  })
  return data
}

export const getDetailCategory = async (payload) => {
  const { data } = await apiMethod.post(GET_DETAIL_CATEGORY + `/${payload.categoryId}`, {
    userId: payload?.userId
  })
  return data
}

export const updateDetailCategory = async (payload) => {
  const { cateId, ...rest } = payload || {}
  const { data } = await apiMethod.put(UPDATE_DETAIL_CATEGORY + `/${cateId}`, {
    ...rest
  })
  return data
}

export const deleteDetailCategory = async (payload) => {
  const { data } = await apiMethod.delete(DELETE_DETAIL_CATEGORY + `/${payload?.cateId}`)
  return data
}