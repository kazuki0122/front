import client from "api/user/client"
import Cookies from "js-cookie"
import { GroupParams, GroupRequestParams } from "types/group"

// current_userが所属してるグループ一覧
export const fetchGroupsIndex = () => {
  return client.get('groups',{
    headers: {
      'access-token': Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid")
    }
  })
}
// グループ作成
export const createGroupData = (params: GroupParams) => {
  return client.post('groups', params, {
    headers: {
      'access-token': Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid")
    }
  })
}
// グループの個別ページの情報を取得
export const fetchGroupData = (id: number) => {
  return client.get(`groups/${id}`,{
    headers: {
      'access-token': Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid")
    }
  })
}

// リクエスト承諾
export const accept = () => {
  return client.get('groups/enter_group',{
    headers: {
      'access-token': Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid")
    }
  })
}

// リクエスト拒否
export const refused = () => {
  return client.delete('groups/refused_to_enter',{
    headers: {
      'access-token': Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid")
    }
  })
}