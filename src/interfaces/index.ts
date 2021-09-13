// サインアップ
export interface SignUpParams {
  name: string
  email: string
  password: string
  user_id: string
  phone_number: string
  passwordConfirmation: string
}

// サインイン
export interface SignInParams {
  email: string
  password: string
}

// ユーザー
export interface User {
  id: number
  uid: string
  provider: string
  email: string
  name: string
  nickname: string
  phoneNumber: string
  userId: string
  image?: string
  allowPasswordChange: boolean
  created_at: Date
  updated_at: Date
}