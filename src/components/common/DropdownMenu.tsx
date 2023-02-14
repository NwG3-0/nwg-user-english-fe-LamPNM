import { useState } from 'react'
import Link from 'next/link'
import { DropdownArrow } from './CustomIcon'
import { Dropdown } from '@utils/common'

interface Props {
  title: string
  classNameCustom: string
  list: Dropdown[]
}

export const DropdownMenuRelative = ({ title, list, classNameCustom }: Props) => {
  const [dropMenuDown, setDropMenuDown] = useState<boolean>(false)

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
          {list.map((li: Dropdown) => (
            <div className="text-[18px] flex gap-[10px] items-center" key={li.path}>
              <div className="w-[6px] h-[6px] rounded-full bg-[#FFFFFF]" />
              <Link href={li.path}>{li.content}</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
