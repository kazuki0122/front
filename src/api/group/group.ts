import client from "api/user/client"
import Cookies from "js-cookie"
import { Group } from "types/group"

export const createGroupData = (params: Group) => {
  return client.post('groups', params, {
    headers: {
      'access-token': Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid")
    }
  } )
}
export const fetchGroupData = (id: number) => {
  return client.get(`groups/${id}`,{
    headers: {
      'access-token': Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid")
    }
  } )
}