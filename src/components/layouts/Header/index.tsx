import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { MenuIcon } from '@components/common/CustomIcon'
import { DropdownMenu } from '@components/common/Dropdown'
import { DropdownMenuRelative } from '@components/common/DropdownMenu'
import { useClickOutside } from '@hooks/useClickOutSide'
import { useOpenHeaderStore } from '@src/zustand'
import { isLogin } from '@utils/api'
import { MENU_HEADER, DROPDOWN_USER_MENU, MenuHeader } from '@utils/common'
import { useRouter } from 'next/router'

export const Header = () => {
  const router = useRouter()
  const contentRef = useRef() as any
  const childRef = useRef() as any
  useClickOutside(contentRef, childRef, (value) => setIsOpen(value))

  const [showUpTop, setShowUpTop] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useOpenHeaderStore((state: any) => [state.isOpen, state.setIsOpen])
  const hiddenPosition = 300

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScroll = () => {
    setIsOpen(false)
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    if (scrollTop > hiddenPosition) {
      setShowUpTop(true)
    } else {
      setShowUpTop(false)
    }
  }

  const handleClickMenu = (id: string) => {
    const menuEl = document.getElementById(id)
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' })
      setShowUpTop(true)
    }
  }

  const renderToTOP = () => {
    const backToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      setShowUpTop(false)
    }

    return (
      <div className="hidden md:block fixed right-[30px] bottom-[100px] z-100">
        <div className={showUpTop === false ? 'hidden' : ''}>
          <button
            className="bg-black bg-opacity-50 hover:bg-opacity-70 rounded-lg sm:flex flex-col justify-center px-[12px]
          py-[3px] hidden"
            onClick={backToTop}
          >
            <div className="self-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="1 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
              </svg>
            </div>
            <span className="text-gray-400 text-center text-[13px]">TOP</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`${router.pathname === '/' ? 'bg-transparent' : 'bg-[#808080]'} fixed w-full z-50 top-0 left-0`}>
      <div className="flex justify-between items-center container lg:w-[1240px] mx-auto py-[20px]" ref={contentRef}>
        <div className="max-sm:ml-[20px]">
          <Link href={'/'}>
            <img src="/images/logo.svg" alt="Logo Web" />
          </Link>
        </div>
        <div className="block md:hidden cursor-pointer px-[20px]" onClick={() => setIsOpen(!isOpen)}>
          <MenuIcon width={35} height={35} color={isOpen ? '#FFFFFF' : '#808080'} />
        </div>
        {isOpen && (
          <div
            className="absolute z-100 h-screen w-full top-[78px] left-0 flex md:hidden flex-col bg-[#4d4d4dfd] text-[white]"
            ref={childRef}
          >
            {MENU_HEADER.map((item: MenuHeader) => (
              <Link
                href={{
                  pathname: '/',
                  hash: item.id,
                }}
                scroll={false}
                key={`sub_${item.id}`}
                onClick={() => handleClickMenu(item.id)}
                role="menuitem"
              >
                {item.name}
              </Link>
            ))}

            {isLogin() ? (
              <div className="relative">
                <DropdownMenuRelative classNameCustom="" title="User Profile " list={DROPDOWN_USER_MENU} />
              </div>
            ) : (
              <Link className="font-bold text-[22px] p-[10px]" href={'/login'}>
                Login
              </Link>
            )}
          </div>
        )}
        <div className="hidden md:flex gap-[20px] items-center">
          <div className="flex items-center gap-[20px] text-[#FFFFFF]">
            {MENU_HEADER.map((item) => (
              <Link
                className="font-bold text-[22px] relative menu-link"
                href={{
                  pathname: '/',
                  hash: item.id,
                }}
                scroll={false}
                key={`sub_${item.id}`}
              >
                {item.name}
              </Link>
            ))}

            {isLogin() ? (
              <div className="relative">
                <DropdownMenu classNameCustom="" title="User Profile " subMenu={DROPDOWN_USER_MENU} />
              </div>
            ) : (
              <Link className=" font-bold text-[22px] " href={'/login'}>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* <div className="w-full pb-[10px] hidden md:block">
        <p className="text-center text-[#FFFFFF] text-[18px]">Tips: Press Alt + M to open the dictionary</p>
      </div> */}
      {renderToTOP()}
    </div>
  )
}
