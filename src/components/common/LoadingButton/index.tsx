import React from 'react'

interface Props {
  type: 'button' | 'submit' | 'reset' | undefined
  content: string
  isLoading: boolean
  classNameCustom?: string
}

export const LoadingButton = ({ type, content, isLoading, classNameCustom }: Props) => {
  return (
    <button
      type={type}
      className={`bg-blue-500 text-white px-[10px] py-[5px] flex items-center gap-[5px] ${classNameCustom}`}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <div className="custom-btn"></div>
          <div>Processing...</div>
        </>
      ) : (
        content
      )}
    </button>
  )
}
