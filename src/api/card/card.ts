import client from "api/registration/client"
import Cookies from "js-cookie"

export const createCustomer = () => {
  return client.get('cards/customer_create',{
    headers: {
      'access-token': Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid")
    }
  })
}