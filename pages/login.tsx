import InputPassword from '@components/common/InputPassword'
import { AUTH_TOKEN, USER_INFO } from '@src/models/api'
import { useDataLoginInfoStore } from '@src/zustand'
import { login } from '@utils/api'
import { NOTIFICATION_TYPE, notify } from '@utils/notify'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useRef } from 'react'

const LoginPage: NextPage = () => {
  const [setUserInfo, setAccessToken] = useDataLoginInfoStore((state: any) => [state.setUserInfo, state.setAccessToken])
  const emailValue = useRef() as React.MutableRefObject<HTMLInputElement>
  const passwordValue = useRef() as React.MutableRefObject<HTMLInputElement>
  const router = useRouter()

  const onLogin = async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault()
      if (emailValue.current.value !== '' && passwordValue.current.value !== '') {
        const { success, data } = await login({
          email: emailValue.current.value,
          password: passwordValue.current.value,
        })

        if (success) {
          localStorage.setItem(USER_INFO, JSON.stringify(data))
          localStorage.setItem(AUTH_TOKEN, data.token)
          setUserInfo(data)
          setAccessToken(data.token)
          notify(NOTIFICATION_TYPE.SUCCESS, 'Login success')

          router.push('/')
        }
      }
    } catch (error) {}
  }

  return (
    <div className="relative bg-[url('/images/background.webp')] bg-cover h-screen w-full font-library">
      <div className="w-full h-full bg-[#00000075] relative z-1"></div>
      <div className="absolute w-[500px] translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] bg-[#BA8C63] z-100 rounded-md">
        <div className="text-white text-center text-[32px] mt-[20px]">Login</div>
        <form className="p-[20px]" onSubmit={onLogin}>
          <div>
            <label htmlFor="email" className="block text-[18px] text-white">
              Email:
            </label>
            <input
              id="email"
              name="email"
              ref={emailValue}
              className="w-full rounded-sm mt-[5px] outline-none px-[10px] py-[5px] border-[1px] border-[#808080] bg-transparent text-[#ffffffb6]"
            />
          </div>
          <div className="mt-[10px]">
            <label htmlFor="password" className="block text-[18px] text-white">
              Password:
            </label>
            <InputPassword classNameCustom="text-[#ffffffb6] mt-[5px] rounded-sm" ref={passwordValue} />
          </div>
          <div className="flex justify-end mt-[10px]">
            <Link href="/register" className="text-white underline">
              Don't have an account ?
            </Link>
          </div>
          <button className="w-full py-[8px] bg-[#FFFFFF] mt-[20px] rounded-sm" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
