import { ChangeEvent, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { LoadingButton } from '@components/common/LoadingButton'
import { REACT_QUERY_KEYS } from '@src/models/keys'
import { fetchListRoom } from '@utils/api/drawGame'

type FormData = {
  roomId: string
  username: string
  roomName: string
  password: string
}

export const Step2Join = () => {
  const router = useRouter()
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)
  const [formData, setFormData] = useState<FormData>({
    roomId: '',
    username: '',
    roomName: '',
    password: '',
  })

  const {
    data: listRoom,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [REACT_QUERY_KEYS.LIST_ROOM],
    queryFn: fetchListRoom,
  })

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

  const onChangeRoomId = (roomId: string, name: string) => {
    setFormData((prev) => ({ ...prev, roomId, roomName: name }))
  }

  const onSubmit = () => {}

  return (
    <div className="w-[800px] py-[200px] mx-auto flex gap-x-10">
      <div className="w-[70%]">
        <button type="button" className=" hover:underline" onClick={onBack}>
          Back
        </button>
        <p className="text-center text-3xl mb-8">Join a room</p>
        <div className="flex flex-col gap-y-4">
          <p className="text-lg text-blue-500">Please choose the roomId from the list on the right</p>
          <label htmlFor="roomId" className="block mb-2 text-sm font-medium text-gray-900">
            Your room ID
          </label>
          <input
            type="text"
            id="roomId"
            name="roomId"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Room 1"
            required
            disabled
            value={formData.roomId}
            onChange={onChangeInput}
          />
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
              disabled
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

      <div className="pt-[50px] w-[30%]">
        <p className="text-3xl mb-4">List rooms</p>
        <ul>
          {isLoading ? (
            <p>Processing...</p>
          ) : isError || !listRoom?.success ? (
            <p>An error occurred</p>
          ) : listRoom?.data.length === 0 ? (
            <p>There are no rooms yet</p>
          ) : (
            listRoom.data.map(({ id, name }: { id: string; name: string }) => (
              <li key={id} className="mb-4">
                <button
                  type="button"
                  className="px-3 py-1 rounded transition hover:bg-[#ebebeb]"
                  onClick={() => onChangeRoomId(id, name)}
                >
                  {id}
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}
