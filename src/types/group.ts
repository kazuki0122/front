export type GroupParams = {
  group: {
    name: string,
    user_ids: number[]
  }
}

export type Group = {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}