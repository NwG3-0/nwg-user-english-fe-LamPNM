import { CustomModal } from '@components/common/CustomModal'
import { InputCodeModal } from '@components/widgets/InputCodeModal'
import { useDataLoginInfoStore } from '@src/zustand'
import { DataLoginInfo } from '@utils/zustand'
import jwtDecode from 'jwt-decode'
import { useMemo, useState } from 'react'

export const UserProfile = () => {
  const [accessToken] = useDataLoginInfoStore((state: DataLoginInfo) => [state.accessToken])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const user: any = useMemo(() => {
    if (accessToken) {
      return jwtDecode(accessToken)
    }
  }, [accessToken])

  console.log(user)
  return (
    <div className="mt-[150px] pb-[50px]">
      <div className="flex mx-auto container md:w-[1100px]">
        <div className="text-center">
          <img src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" alt="Ảnh avatar" />
          <p className="mt-[20px]">Email: {user.email}</p>
          <p>{user.hobbies}</p>
          <div
            className="bg-yellow-500 py-[5px] px-[10px] rounded-md text-white mt-[10px] cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            Kích hoạt thành viên
          </div>
        </div>
      </div>
      {!user.role && (
        <CustomModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} classNameCustom="w-[500px]">
          <InputCodeModal />
        </CustomModal>
      )}
    </div>
  )
}
