import { useRef } from 'react'

interface Props {}

export const Recorder = ({}: Props) => {
  const refNameValue = useRef() as React.MutableRefObject<HTMLInputElement>

  return (
    <div className="w-[100%] h-[50px] flex gap-x-[8px]">
      <input
        ref={refNameValue}
        placeholder="Enter your topic name"
        className="flex-1  bg-slate-200 rounded-full pl-[16px]"
      ></input>
    </div>
  )
}
