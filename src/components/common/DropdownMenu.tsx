import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useState } from 'react'
import Link from 'next/link'
import { DropdownArrow } from './CustomIcon'
import { Dropdown } from '@utils/common'
import { NOTIFICATION_TYPE, notify } from '@utils/notify'
import { logout } from '@utils/api'
import { useDataLoginInfoStore } from '@src/zustand'
import { AUTH_TOKEN, USER_INFO } from '@src/models/api'

dayjs.extend(utc)

interface Props {
  title: string
  classNameCustom: string
  list: Dropdown[]
}

export const DropdownMenuRelative = ({ title, list, classNameCustom }: Props) => {
  const [accessToken, setAccessToken, setUserInfo] = useDataLoginInfoStore((state: any) => [
    state.accessToken,
    state.setAccessToken,
    state.setUserInfo,
  ])
  const [dropMenuDown, setDropMenuDown] = useState<boolean>(false)

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
    <div className="w-full relative" onClick={() => setDropMenuDown(!dropMenuDown)}>
      <div
        className={`relative w-[100%] flex justify-between px-[17px] font-bold text-[22px] py-[8px] cursor-pointer dropdown ${classNameCustom}`}
      >
        <div className="">{title}</div>
        <div className={`w-fit transition-all duration-700 ${dropMenuDown ? ' dropdown-open' : ''}`}>
          <DropdownArrow width={24} height={24} color={'#FFFFFF'} />
        </div>
      </div>
      {dropMenuDown && (
        <div className="flex flex-col gap-[10px] px-[17px] pb-[20px]">
          {list.map((li: Dropdown) => {
            if (li.type === 'div' && li.content === 'Log out') {
              return (
                <div className="text-[18px] flex gap-[10px] items-center" key={li.path} onClick={onLogout}>
                  <div className="w-[6px] h-[6px] rounded-full bg-[#FFFFFF]" />
                  <p>{li.content}a</p>
                </div>
              )
            } else {
              return (
                <div className="text-[18px] flex gap-[10px] items-center" key={li.path}>
                  <div className="w-[6px] h-[6px] rounded-full bg-[#FFFFFF]" />
                  <Link href={li.path}>{li.content}</Link>
                </div>
              )
            }
          })}
        </div>
      )}
    </div>
  )
}
