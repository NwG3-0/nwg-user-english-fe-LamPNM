import { useRef, useState } from 'react'
import Link from 'next/link'
import { DropdownArrow } from './CustomIcon'
import { useClickOutside } from '@hooks/useClickOutSide'
import { Dropdown } from '@utils/common'

export interface Props {
  title: string
  classNameCustom: string
  subMenu: Dropdown[]
}

export const DropdownMenu = ({ classNameCustom, title, subMenu }: Props) => {
  const contentRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const childRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  useClickOutside(contentRef, childRef, (value) => setShowDropdown(value))

  return (
    <div className="w-fit relative" onClick={() => setShowDropdown(!showDropdown)} ref={contentRef}>
      <div
        className={`relative flex mx-[8px] font-bold text-[22px] py-[8px] cursor-pointer menu-link dropdown ${classNameCustom}`}
      >
        {title}
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
          {subMenu.map((tab: Dropdown) => (
            <Link href={tab.path} key={tab.id}>
              <div className="dropdown-box cursor-pointer">
                <div className="mb-[8px] text-center font-bold text-[16px] py-[16px] px-[8px] hover:bg-[#FFFFFF] hover:text-[#000]">
                  {tab.content}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
