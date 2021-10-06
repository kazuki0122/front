import client from "api/registration/client"
import Cookies from "js-cookie"
import { card } from "types/card"

export const createCustomer = () => {
  return client.get('cards/customer_create',{
    headers: {
      'access-token': Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid")
    }
  })
}

export const createCards = (params: card) => {
  return client.post('cards',params,{
    headers: {
      'access-token': Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid")
    }
  })
}