import client from "api/registration/client"
import Cookies from "js-cookie"

export const fetchResultData = (id: number) => {
  return client.get('results',{
    params: {
      id: id
    },
    headers: {
      'access-token': Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid")
    }
  })
}