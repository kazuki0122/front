import client from "api/registration/client"
import Cookies from "js-cookie"
import { RuleParams } from "types/rule"

// ルールの取得
export const fetchRulesData = (id: number) => {
  return client.get('rules', {
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

// ルールの作成
export const createRulesData = (params: RuleParams) => {
  return client.post('rules', params, {
    headers: {
      'access-token': Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid")
    }
  })
}