import create from 'zustand'
import { DataLoginInfo, UserInfo } from '@utils/zustand'

export const useDataLoginInfoStore = create<DataLoginInfo>((set) => ({
  userInfo: undefined,
  accessToken: undefined,
  setUserInfo: (info: UserInfo) => set({ userInfo: info }),
  setAccessToken: (token: string) => set({ accessToken: token }),
}))
