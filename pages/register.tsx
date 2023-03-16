import React, { useRef, useState } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import InputPassword from '@components/common/InputPassword'
import { register } from '@utils/api'
import { NEWS_LIST, NewsList } from '@utils/common'
import { NOTIFICATION_TYPE, notify } from '@utils/notify'

const RegisterPage: NextPage = () => {
  const emailValue = useRef() as React.MutableRefObject<HTMLInputElement>
  const passwordValue = useRef() as React.MutableRefObject<HTMLInputElement>
  const confirmPasswordValue = useRef() as React.MutableRefObject<HTMLInputElement>

  const [hobbies, setHobbies] = useState<string[]>([])

  const router = useRouter()

  const [errorMessage, setErrorMessage] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const onSelectHobbies = (e: { target: { value: string; checked: boolean } }) => {
    if (e.target.checked) {
      setHobbies((prev: string[]) => [...prev, e.target.value])
    } else {
      const arrHobbies: string[] = [...hobbies]

      const arrHobbiesFilter = arrHobbies.filter((hobby: string) => hobby !== e.target.value)

      setHobbies(arrHobbiesFilter)
    }
  }

  const onRegister = async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault()
      if (
        emailValue.current.value !== '' &&
        passwordValue.current.value !== '' &&
        confirmPasswordValue.current.value !== ''
      ) {
        const { success, data } = await register({
          email: emailValue.current.value,
          hobbies,
          password: passwordValue.current.value,
        })

        if (success) {
          notify(NOTIFICATION_TYPE.SUCCESS, 'Register success')
          localStorage.setItem('verify_email', JSON.stringify(data))
          router.push('/verify')
        }
      }
    } catch (error) {
      notify(NOTIFICATION_TYPE.ERROR, 'Something went wrong')
    }
  }

  const onChangeEmail = (e: { target: { value: string } }) => {
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    const email = e.target.value

    if (!regexEmail.test(email)) {
      setErrorMessage((prev: any) => ({ ...prev, email: 'Email is not valid' }))
    } else {
      setErrorMessage((prev: any) => ({ ...prev, email: '' }))
    }
  }

  return (
    <div className="relative bg-[url('/images/background.webp')] bg-cover h-screen w-full font-library">
      <div className="w-full h-full bg-[#00000075] relative z-1"></div>
      <div className="absolute w-[calc(100%-30px)] sm:w-[500px] translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] bg-transparent sm:bg-[#BA8C63] z-100 sm:rounded-md">
        <div className="text-white text-center text-[32px] mt-[20px]">Register</div>
        <form className="p-[20px]" onSubmit={onRegister}>
          <div>
            <label htmlFor="email" className="block text-[18px] text-white">
              Email:
            </label>
            <input
              ref={emailValue}
              id="email"
              name="email"
              className="w-full rounded-sm mt-[5px] outline-none px-[10px] py-[5px] border-[1px] border-[#808080] bg-transparent text-[#ffffffb6]"
              onChange={onChangeEmail}
            />
            {errorMessage.email !== '' && <div className="text-red-500 mt-[10px]">{errorMessage.email}</div>}
          </div>
          <div className="mt-[10px]">
            <label htmlFor="password" className="block text-[18px] text-white">
              Password:
            </label>
            <InputPassword classNameCustom="text-[#ffffffb6] mt-[5px] rounded-sm" ref={passwordValue} />
          </div>
          <div className="mt-[10px]">
            <label htmlFor="password" className="block text-[18px] text-white">
              Confirm Password:
            </label>
            <InputPassword classNameCustom="text-[#ffffffb6] mt-[5px] rounded-sm" ref={confirmPasswordValue} />
          </div>
          <div className="mt-[10px]">
            <label htmlFor="hobbies" className="block text-[18px] text-white">
              Hobbies
            </label>
            <div className="flex flex-wrap gap-[10px]">
              {NEWS_LIST.map((news: NewsList) => (
                <div key={news.id} className="flex gap-[5px]">
                  <input type="checkbox" value={news.value} onChange={onSelectHobbies} />
                  <label className="text-[#FFFFFF]">{news.name}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end mt-[10px]">
            <Link href="/login" className="text-white underline">
              Already have a account ?
            </Link>
          </div>
          <button className="w-full py-[8px] bg-[#FFFFFF] mt-[20px] rounded-sm" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
