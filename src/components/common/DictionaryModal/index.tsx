import React, { useRef } from 'react'
import { CloseIcon1, SearchIcon } from '../CustomIcon'
import { LoadingbtnAnimate } from '../LoadingButton/LoadingbtnAnimate'
import { useDataLoginInfoStore } from '@src/zustand'
import Link from 'next/link'

interface Props {
  isLoading: boolean
  word: any
  onSearch: (wordSearch: string) => void
  onCloseDictionaryModal: () => void
  onOpenSaveCardModal: () => void
  isSave: boolean
}

export const DictionaryModal = ({
  isLoading,
  word,
  onSearch,
  onCloseDictionaryModal,
  onOpenSaveCardModal,
  isSave,
}: Props) => {
  const [accessToken, userInfo] = useDataLoginInfoStore((state: any) => [state.userInfo, state.accessToken])
  const searchWordInput = useRef() as React.MutableRefObject<HTMLInputElement>

  const onKeyDown = (e: any) => {
    if (searchWordInput.current.value !== '' && e.keyCode === 13) {
      onSearch(searchWordInput.current.value)
    }
  }

  return (
    <div
      data-aos-offset="50"
      data-aos="fade-left"
      className="fixed z-1 top-[20%] shadow-2xl right-[16px] h-[65vh] bg-slate-50 w-[330px] rounded-lg"
    >
      <div className="bg-[#FFFFFF] w-full h-full absolute rounded-t-[24px] px-[15px] pt-[5px] z-100 shadow-2xl">
        <div className="flex items-center justify-between py-[5px]">
          <div className="text-[22px] font-semibold">Dictionary</div>
          <div onClick={onCloseDictionaryModal} className="mr-[10px] cursor-pointer">
            <CloseIcon1 width={18} height={18} color="#000" />
          </div>
        </div>
        <div className="flex w-full items-center p-[10px] rounded-md justify-between border-[0.5px] border-[#808080]">
          <input
            placeholder="Enter word"
            ref={searchWordInput}
            className="outline-none w-[calc(100%-30px)] block rounded-[4px]"
            onKeyDown={onKeyDown}
          />
          <div className="cursor-pointer overflow-hidden">
            <SearchIcon width={24} height={24} color="#000" />
          </div>
        </div>
        <div className={`${word && 'overflow-y-scroll dictionary'} px-[5px] h-[70%] overflow-hidden mt-[20px]`}>
          {word &&
            (isLoading ? (
              <div className="absolute top-[50%] right-[50%] -translate-y-[50%] -translate-x-[50%]">
                <LoadingbtnAnimate />
              </div>
            ) : (
              <>
                <div className="flex justify-between">
                  <p className="font-bold">Pronunciation:</p>
                  {word && <div>{word?.phonetics[0].text}</div>}
                </div>
                {word &&
                  word?.meanings.map(
                    (mean: { partOfSpeech: string; definitions: { definition: string }[] }, index: number) => {
                      return (
                        <div key={`word ${index}`}>
                          <div className="font-bold capitalize">{mean?.partOfSpeech}:</div>
                          <div>
                            {mean?.definitions.map((define: { definition: string }) => {
                              return <div key={define.definition}>- {define.definition}</div>
                            })}
                          </div>
                        </div>
                      )
                    },
                  )}
                {word &&
                  word?.phonetics.map((voice: { audio: string }, index: number) => {
                    return (
                      <div className="my-[16px]" key={`voice ${index}`}>
                        <p className="font-bold text-blue-800">Spelling:</p>
                        {voice.audio != '' && (
                          <audio controls className="w-full">
                            <source src={voice.audio} type="audio/ogg" />
                          </audio>
                        )}
                      </div>
                    )
                  })}
              </>
            ))}
        </div>
        {userInfo && accessToken ? (
          word &&
          (isSave ? (
            <button
              disabled={true}
              className="block cursor-not-allowed rounded-lg bg-[#808080] py-[16px] mx-auto w-[150px] text-center"
            >
              Saved
            </button>
          ) : (
            <button
              onClick={onOpenSaveCardModal}
              className="block rounded-lg bg-cyan-400 py-[16px] mx-auto w-[150px] text-center"
            >
              Save
            </button>
          ))
        ) : (
          <Link
            href={'/login'}
            className="block cursor-not-allowed rounded-lg bg-cyan-400 py-[16px] mx-auto w-[150px] text-center"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  )
}
