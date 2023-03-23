import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { DropdownArrow } from './CustomIcon'
import { useClickOutside } from '@hooks/useClickOutSide'
import { Dropdown } from '@utils/common'
import { useDataLoginInfoStore } from '@src/zustand'
import { NOTIFICATION_TYPE, notify } from '@utils/notify'
import { logout } from '@utils/api'
import { AUTH_TOKEN, USER_INFO } from '@src/models/api'

dayjs.extend(utc)

export interface Props {
  title: string
  classNameCustom: string
  subMenu: Dropdown[]
}

export const DropdownMenu = ({ classNameCustom, title, subMenu }: Props) => {
  const [accessToken, setAccessToken, setUserInfo] = useDataLoginInfoStore((state: any) => [
    state.accessToken,
    state.setAccessToken,
    state.setUserInfo,
  ])
  const contentRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const childRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const [showDropdown, setShowDropdown] = useState<boolean>(false)

  useClickOutside(contentRef, childRef, (value) => setShowDropdown(value))

  const onLogout = async () => {
    try {
      const { success, message } = await logout({ token: accessToken, expiredAt: dayjs.utc().add(1, 'day').unix() })

      if (success) {
        notify(NOTIFICATION_TYPE.SUCCESS, message)
        setAccessToken(undefined)
        setUserInfo(undefined)
        localStorage.removeItem(AUTH_TOKEN)
        localStorage.removeItem(USER_INFO)
      } else {
        notify(NOTIFICATION_TYPE.ERROR, message)
      }
    } catch (error) {
      notify(NOTIFICATION_TYPE.ERROR, 'Log out fail')
    }
  }

  return (
    <div className="w-fit relative" onClick={() => setShowDropdown(!showDropdown)} ref={contentRef}>
      <div
        className={`relative flex mx-[8px] font-bold text-[22px] py-[8px] cursor-pointer menu-link dropdown ${classNameCustom}`}
      >
        <span>{title}</span>
        <div
          className={`m-auto origin-center pl-[4px] transition-all duration-700 ${
            showDropdown ? ' dropdown-open' : ''
          }`}
        >
          <DropdownArrow width={16} height={16} color={'#FFFFFF'} />
        </div>
      </div>
      {showDropdown && (
        <div
          ref={childRef}
          className="absolute w-full flex z-100 flex-col bg-[#00000048] text-[#FFFFFF] rounded-b-[8px] dropdown-menu drop-shadow-2xl"
        >
          {subMenu.map((tab: Dropdown) => {
            if (tab.type === 'div' && tab.content === 'Log out') {
              return (
                <div key={tab.id} onClick={onLogout}>
                  <div className="dropdown-box cursor-pointer">
                    <div className="mb-[8px] text-center font-bold text-[16px] py-[16px] px-[8px] hover:bg-[#FFFFFF] hover:text-[#000]">
                      {tab.content}
                    </div>
                  </div>
                </div>
              )
            }

            return (
              <Link href={tab.path} key={tab.id}>
                <div className="dropdown-box cursor-pointer">
                  <div className="mb-[8px] text-center font-bold text-[16px] py-[16px] px-[8px] hover:bg-[#FFFFFF] hover:text-[#000]">
                    {tab.content}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
