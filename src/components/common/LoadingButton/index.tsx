import React from 'react'

interface Props {
  type: 'button' | 'submit' | 'reset' | undefined
  content: string
  isLoading: boolean
  classNameCustom?: string
  onClick: () => void
}

export const LoadingButton = ({ type, content, isLoading, classNameCustom = '', onClick }: Props) => {
  return (
    <button
      type={type}
      className={`bg-blue-500 text-white px-5 py-3 w-[168px] flex items-center gap-x-2 rounded-md
      transition hover:opacity-80 focus:opacity-80 ${isLoading ? 'opacity-70' : ''}
      ${classNameCustom}`}
      disabled={isLoading}
      onClick={onClick}
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
