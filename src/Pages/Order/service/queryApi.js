import { useQuery } from "react-query";
import apiMethod from "../../../utility/apiMethod";

const GET_ORDER_PRODUCTS = "/order/get-all"
const GET_ORDER_CUSTOMIZED_PRODUCTS = "/order-customized-product/get-all"
const GET_TRACKING_VISISTORS = "/tracking/visitors"

export const orderApi = {
  getOrderProducts(payload) {
    return apiMethod.post(GET_ORDER_PRODUCTS, { ...payload })
  },
  getOrderCustomizedProduct(payload) {
    return apiMethod.post(GET_ORDER_CUSTOMIZED_PRODUCTS, { ...payload })
  },
  getTrackingVisitors(payload) {
    console.log(payload)
  }
}

export const useOrderProducts = ({
  params,
  option
}) => {
  const config = {
    select: (res) => res.data,
    ...option
  }
  return useQuery({
    queryKey: [GET_ORDER_PRODUCTS],
    queryFn: () => orderApi.getOrderProducts(params),
    ...config
  })
}

export const useOrderCustomizedProducts = ({
  params,
  option
}) => {
  const config = {
    select: (res) => res.data,
    ...option
  }
  return useQuery({
    queryKey: [GET_ORDER_CUSTOMIZED_PRODUCTS],
    queryFn: () => orderApi.getOrderCustomizedProduct(params),
    ...config
  })
}