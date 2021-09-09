import Cookies from "js-cookie"
import client from "../user/client"

const getHeaders = {
  headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }
}

// ユーザー情報を取得
export const fetchUserData = (pageData: number) => {
  return client.get(`users?page=${pageData}`, getHeaders )
}

// 友達申請
export const sendingFriendRequest = (id: number, currentUserId: number) => {
  return client.post("friend_requests", { to_id: id, from_id: currentUserId }, getHeaders)
}

// 申請状況を取得
export const fetchSendedFriendRequest = () => {
  return client.get('friend_requests', getHeaders )
}