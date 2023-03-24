import create from 'zustand'
import { DataLoginInfo, DataOpenMenu, UserInfo } from '@utils/zustand'

export const useDataLoginInfoStore = create<DataLoginInfo>((set) => ({
  userInfo: undefined,
  accessToken: undefined,
  setUserInfo: (info: UserInfo) => set({ userInfo: info }),
  setAccessToken: (token: string) => set({ accessToken: token }),
}))

export const useOpenHeaderStore = create<DataOpenMenu>((set) => ({
  isOpen: false,
  setIsOpen: (info: boolean) => set({ isOpen: info }),
}))
