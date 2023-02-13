import { MenuIcon } from '@components/common/CustomIcon'
import { DropdownMenu } from '@components/common/Dropdown'
import { useClickOutside } from '@hooks/useClickOutSide'
import { isLogin } from '@utils/api'
import { MENU_HEADER, DROPDOWN_TEST_MENU, DROPDOWN_USER_MENU, DROPDOWN_PRACTICE_MENU } from '@utils/common'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export const testSubMenu = [
  {
    content: 'Word Test',
    type: 'link',
  },
  {
    content: 'Total Test',
    type: 'link',
  },
]

const Header = () => {
  const contentRef = useRef() as any
  const childRef = useRef() as any
  useClickOutside(contentRef, childRef, (value) => setMenuActive(value))

  const [showUpTop, setShowUpTop] = useState(false)
  const [menuActive, setMenuActive] = useState(false)
  const hiddenPosition = 300

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScroll = () => {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    if (scrollTop > hiddenPosition) {
      setShowUpTop(true)
    } else {
      setShowUpTop(false)
    }
  }

  const renderToTOP = () => {
    const backToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      setShowUpTop(false)
    }

    return (
      <div className="hidden md:block fixed right-[30px] bottom-[100px] z-[101]">
        <div className={showUpTop === false ? 'hidden' : ''}>
          <button
            className="bg-black
          bg-opacity-50 hover:bg-opacity-70 rounded-lg sm:flex flex-col justify-center px-[12px]
          py-[3px]  hidden"
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
    <div className="bg-[#00000048] fixed w-full z-50 top-0 left-0">
      <div className="flex justify-between items-center container lg:w-[1240px] mx-auto py-[20px]" ref={contentRef}>
        <div data-aos-offset="0" data-aos="flip-left" data-aos-delay="500" className="">
          <Link href={'/'}>
            <img src="/images/ielts-logo.png" className="w-[100px] object-contain max-md:px-[20px]" alt="Logo Web" />
          </Link>
        </div>
        <div className="block md:hidden cursor-pointer px-[20px]" onClick={() => setMenuActive(!menuActive)}>
          <MenuIcon width={35} height={35} color={menuActive ? '#FFFFFF' : '#808080'} />
        </div>
        {menuActive && (
          <div
            className="absolute top-[75px] flex md:hidden flex-col bg-[#00000048] text-[white] w-full"
            ref={childRef}
          >
            {MENU_HEADER.map((item) => (
              <Link className=" font-bold text-[22px] block relative menu-link p-[10px]" key={item.id} href={item.path}>
                {item.name}
              </Link>
            ))}

            {isLogin() ? (
              <div className="relative">
                <DropdownMenu classNameCustom="" title="User Profile " subMenu={DROPDOWN_USER_MENU} />
              </div>
            ) : (
              <Link className="font-bold text-[22px] p-[10px]" href={'/login'}>
                Login
              </Link>
            )}
          </div>
        )}
        <div
          data-aos-offset="0"
          data-aos="fade-left"
          data-aos-delay="1000"
          className="hidden md:flex gap-[20px] items-center"
        >
          <div className="flex items-center gap-[20px] text-[#FFFFFF]">
            {MENU_HEADER.map((item) => (
              <Link className=" font-bold text-[22px] relative menu-link" key={item.id} href={item.path}>
                {item.name}
              </Link>
            ))}
            <DropdownMenu classNameCustom="" title="Test" subMenu={DROPDOWN_TEST_MENU} />
            <DropdownMenu classNameCustom="" title="Practice" subMenu={DROPDOWN_PRACTICE_MENU} />

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

      {renderToTOP()}
    </div>
  )
}

export default Header
