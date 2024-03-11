import apiMethod from "../utility/apiMethod";
import { GET_ALL_CATEGORIES } from "./api-common";

export const getAllCategories = async (userId) => {
  const { data } = await apiMethod.post(GET_ALL_CATEGORIES, {
    userId
  })
  return data
}