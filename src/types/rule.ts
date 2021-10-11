export type RuleParams = {
  rule: {
    group_id: number,
    wakeup_time: string,
    charge: string
  }
}

export type Rule = {
  id: number
  charge: number
  createdAt: string
  groupId: number
  updatedAt: string
}