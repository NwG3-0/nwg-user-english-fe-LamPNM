import { useRef } from 'react'

interface Props {
  onCloseTopicModal: () => void
  onCreate: ({ topicName }: { topicName: string }) => void
}

export const AddTopicModal = ({ onCreate }: Props) => {
  const refNameValue = useRef() as React.MutableRefObject<HTMLInputElement>

  return (
    <div className="w-[100%] h-[50px] flex gap-x-[8px]">
      <input
        ref={refNameValue}
        placeholder="Enter your topic name"
        className="flex-1  bg-slate-200 rounded-full pl-[16px]"
      ></input>
      <button
        className=" bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 px-[32px] py-[8px] rounded-full"
        onClick={() => onCreate({ topicName: refNameValue.current.value })}
      >
        Create
      </button>
    </div>
  )
}
