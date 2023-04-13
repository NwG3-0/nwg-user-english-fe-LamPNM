import { ChangeEvent, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid'
import { LoadingButton } from '@components/common/LoadingButton'

type FormData = {
  username: string
  roomName: string
  password: string
}

export const Step2Creation = () => {
  const router = useRouter()
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)
  const [formData, setFormData] = useState<FormData>({
    username: '',
    roomName: '',
    password: '',
  })

  const uniqueId = uuidv4()

  const onBack = () => {
    void router.back()
  }

  const onTogglePassword = () => {
    setIsShowPassword((prev) => !prev)
  }

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = () => {}

  return (
    <div className="w-[600px] py-[200px] mx-auto">
      <button type="button" className=" hover:underline" onClick={onBack}>
        Back
      </button>
      <p className="text-center text-3xl mb-8">Create a room</p>
      <div className="flex flex-col gap-y-4">
        <p className="text-lg mb-6">
          Your room ID: <span className="font-bold text-xl">{uniqueId}</span>
        </p>
        <div>
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Username 1"
            required
            value={formData.username}
            onChange={onChangeInput}
          />
        </div>
        <div>
          <label htmlFor="roomName" className="block mb-2 text-sm font-medium text-gray-900">
            Room name
          </label>
          <input
            type="text"
            id="roomName"
            name="roomName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Room 1"
            required
            value={formData.roomName}
            onChange={onChangeInput}
          />
        </div>
        <div className="mb-6 relative">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
            Password
          </label>
          <input
            type={isShowPassword ? 'text' : 'password'}
            id="password"
            name="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="•••••••••"
            required
            value={formData.password}
            onChange={onChangeInput}
          />
          <Image
            src={isShowPassword ? '/icons/eye_close.svg' : '/icons/eye_open.svg'}
            alt={isShowPassword ? 'Hide' : 'Show'}
            width={16}
            height={16}
            className="cursor-pointer absolute top-[calc(50%+4px)] right-2"
            onClick={onTogglePassword}
          />
        </div>
        <LoadingButton type="button" content="Create" isLoading={true} onClick={onSubmit} />
      </div>
    </div>
  )
}
