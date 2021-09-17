import client from "api/user/client"
import Cookies from "js-cookie"
import { MessageParams } from "types/message"

// メッセージの作成
export const createMessageData = (id: number, params: MessageParams) => {
  return client.post(`/groups/${id}/messages`, params, {
    headers: {
      'access-token': Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid")
    }
  })
}

// メッセージの取得
export const fetchMessageData = (id: number) => {
  return client.get(`/groups/${id}/messages`, {
    headers: {
      'access-token': Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid")
    }
  })
}