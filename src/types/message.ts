// messageParams
export type MessageParams = {
  message: {
    content: string,
    group_id: number
  }
}

export type Message = {
  id: number,
  content: string,
  groupId: number,
  userId: number,
  createdAt: string,
  updateAt: string
  userName?: string
}