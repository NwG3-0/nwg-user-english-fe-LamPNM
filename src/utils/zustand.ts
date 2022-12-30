export interface UserInfo {
  email: string
  id: string
  token: string
}

export interface DataLoginInfo {
  userInfo?: UserInfo
  accessToken?: string
  setUserInfo: (state: UserInfo) => void
  setAccessToken: (state: string) => void
}
