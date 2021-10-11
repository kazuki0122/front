// groupParams
export type GroupParams = {
  group: {
    name: string,
    user_ids: number[]
  }
}
// グループデータ
export type Group = {
  id: number
  name: string
  createdAt: string
  updatedAt: string
  createUser?: string
}

export type GroupRequestParams = {
  group_request: {
    name: string,
    to_ids: number[]
  }
}