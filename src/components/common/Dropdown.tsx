import Link from 'next/link'
import { useRef, useState } from 'react'
import { useClickOutside } from '@hooks/useClickOutSide'
import { DropdownArrow } from './CustomIcon'

export interface Props {
  title: string
  classNameCustom: string
  subMenu: any[]
}

export const DropdownMenu = ({ classNameCustom, title, subMenu }: Props) => {
  const contentRef = useRef() as any
  const childRef = useRef() as any
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  useClickOutside(contentRef, childRef, (value) => setShowDropdown(value))

  return (
    <div className="w-fit" onClick={() => setShowDropdown(!showDropdown)} ref={contentRef}>
      <div
        className={`relative flex mx-[8px] font-bold text-[22px] py-[8px] cursor-pointer menu-link dropdown ${classNameCustom}`}
      >
        {title}
        <div
          className={`m-auto origin-center pl-[4px] transition-all duration-700 ${
            showDropdown ? ' dropdown-open' : ''
          } `}
        >
          <DropdownArrow width={16} height={16} color={'#FFFFFF'} />
        </div>
      </div>
      {showDropdown && (
        <div
          ref={childRef}
          className="absolute flex z-100 flex-col bg-slate-50 rounded-b-[8px] dropdown-menu drop-shadow-2xl "
        >
          {subMenu.map((tab) => (
            <div className="dropdown-box ">
              <div className=" z-200 mb-[8px] text-center font-bold text-[16px] py-[16px] px-[8px]  hover:opacity-115 hover:bg-slate-100">
                <Link href={tab.path}>{tab.content}</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
