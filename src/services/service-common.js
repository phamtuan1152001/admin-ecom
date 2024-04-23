import apiMethod from "../utility/apiMethod";
import { GET_ALL_CATEGORIES, VERIFY_TOKEN } from "./api-common";

export const getAllCategories = async (userId) => {
  const { data } = await apiMethod.post(GET_ALL_CATEGORIES, {
    userId
  })
  return data
}

export const verifyToken = async (accessToken) => {
  const { data } = await apiMethod.post(VERIFY_TOKEN, {
    accessToken
  })
  return data
}