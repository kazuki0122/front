import Cookies from "js-cookie"
import client from "../user/client"

// const getHeaders = {
//   headers: {
//     'access-token': Cookies.get("_access_token"),
//     client: Cookies.get("_client"),
//     uid: Cookies.get("_uid")
//   }
// }

// index.tsxでユーザー情報を取得
export const fetchUserData = (pageData: number) => {
  return client.get(`users?page=${pageData}`, {
    headers: {
      'access-token': Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid")
    }
  } )
}

// マイページで申請状況を取得
// 直接header情報を書かないとcurret_userがnilになる
export const fetchSendedFriendRequest = () => {
  return client.get('friend_requests',{
    headers: {
      'access-token': Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid")
    }
  })
}

// 友達申請
export const sendingFriendRequest = (id: number, currentUserId: number) => {
  return client.post("friend_requests", { to_id: id, from_id: currentUserId },{
    headers: {
      'access-token': Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid")
    }
  })
}

// 友達承認
export const friendApprove = (id: number, currentUserId: number) => {
  return client.post("friends", {to_id: currentUserId, from_id: id},{
    headers: {
      'access-token': Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid")
    }
  })
}

// 友達を取得
export const fetchFriendsData = () => {
  return client.get('friends', {
    headers: {
      'access-token': Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid")
    }
  })
}