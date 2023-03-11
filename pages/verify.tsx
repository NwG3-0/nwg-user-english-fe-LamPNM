import { verify } from '@utils/api'
import { NOTIFICATION_TYPE, notify } from '@utils/notify'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useRef } from 'react'

const VerifyPage: NextPage = () => {
  const router = useRouter()
  const otpValue = useRef() as React.MutableRefObject<HTMLInputElement>

  const onVerify = async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault()
      if (otpValue.current.value !== '') {
        const { success } = await verify({
          email: JSON.parse(localStorage.getItem('verify_email') ?? '').email,
          otpCode: otpValue.current.value,
        })
        if (success) {
          notify(NOTIFICATION_TYPE.SUCCESS, 'Verify success')
          router.push('/login')
        }
      }
    } catch (error) {}
  }

  return (
    <div className="relative bg-[url('/images/background.webp')] bg-cover h-screen w-full font-library">
      <div className="w-full h-full bg-[#00000075] relative z-1"></div>
      <div className="absolute w-[calc(100%-30px)] sm:w-[500px] translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] bg-transparent sm:bg-[#BA8C63] z-100 sm:rounded-md">
        <div className="text-white text-center text-[32px] mt-[20px]">Verify Code</div>
        <form className="p-[20px]" onSubmit={onVerify}>
          <div>
            <label htmlFor="email" className="block text-[18px] text-white">
              Verify Code:
            </label>
            <input
              id="email"
              name="email"
              ref={otpValue}
              className="w-full rounded-sm mt-[5px] outline-none px-[10px] py-[5px] border-[1px] border-[#808080] bg-transparent text-[#ffffffb6]"
            />
          </div>
          <button className="w-full py-[8px] bg-[#FFFFFF] mt-[20px] rounded-sm" type="submit">
            Verify
          </button>
        </form>
      </div>
    </div>
  )
}

export default VerifyPage
