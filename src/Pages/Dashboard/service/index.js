import { GET_LIST_RANKING_PRODUCTS } from "./api";
import apiMethod from "../../../utility/apiMethod";

export const getListRankingProducts = async (payload) => {
  const { data } = await apiMethod.post(GET_LIST_RANKING_PRODUCTS, {
    ...payload
  })
  return data
}