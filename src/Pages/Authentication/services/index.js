import apiMethod from "../../../utility/apiMethod";
import { SIGN_IN_ADMIN } from "./api";

export const signInAdmin = async (payload) => {
  const { data } = await apiMethod.post(SIGN_IN_ADMIN, {
    ...payload
  })
  return data
}