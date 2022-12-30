import { DropdownMenu } from '@components/common/Dropdown'
import { isLogin } from '@utils/api'
import { MENU_HEADER, DROPDOWN_TEST_MENU, DROPDOWN_USER_MENU, DROPDOWN_PRACTICE_MENU } from '@utils/common'
import Link from 'next/link'

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
  return (
    <div className="bg-[#f0d0b4]">
      <div className="flex justify-between items-center container lg:w-[1240px] mx-auto py-[20px]">
        <div data-aos-offset="0" data-aos="flip-left" data-aos-delay="500">
          <Link href={'/'}>
            <img src="/images/Logo.webp" className="w-[100px] h-[100px]" alt="Logo Web" />
          </Link>
        </div>
        <div data-aos-offset="0" data-aos="fade-left" data-aos-delay="1000" className="flex gap-[20px] items-center">
          <div className="flex items-center gap-[20px]">
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
    </div>
  )
}

export default Header
