import React, { useRef } from 'react'
import { CloseIcon1, SearchIcon, StarIcon } from '../CustomIcon'
import { LoadingbtnAnimate } from '../LoadingButton/LoadingbtnAnimate'

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
  const searchWordInput = useRef() as React.MutableRefObject<HTMLInputElement>

  return (
    <div data-aos-offset="50" data-aos="fade-left" className=" fixed  h-[60vh] w-[320px] top-[20%] right-[16px] z-10">
      <div className="dictionary w-full h-full absolute rounded-t-[24px] px-[10px] opacity-80 pt-[5px] z-100  shadow-2xl bg-slate-50">
        <div className="flex w-full bg-white rounded-[24px] border-b-2 border-slate-600">
          <input
            placeholder="Enter word"
            ref={searchWordInput}
            className=" outline-none bg-transparent mx-auto block rounded-[4px]"
          />
          <div className="m-2 cursor-pointer overflow-hidden" onClick={() => onSearch(searchWordInput.current.value)}>
            <SearchIcon width={24} height={24} color="#000" />
          </div>
        </div>
        {word &&
          (isLoading ? (
            <div className="absolute top-[50%]  right-[50%] translate-y-[-50%] translate-x-[50%]">
              <LoadingbtnAnimate />
            </div>
          ) : (
            <>
              <div className="absolute top-[64px] overflow-y-scroll h-[70%]">
                <div>
                  <div className="font-bold ">Pronunciation:</div>
                  {word &&
                    word[0]?.phonetics.map((spelling: any, index: number) => {
                      return <div key={`spelling ${index}`}>{spelling.text}</div>
                    })}
                </div>
                {word &&
                  word[0]?.meanings.map((mean: any, index: number) => {
                    return (
                      <div key={`word ${index}`}>
                        <div className="font-bold">{mean?.partOfSpeech}:</div>
                        <div>
                          {mean?.definitions.map((define: any) => {
                            return <div>{define.definition}</div>
                          })}
                        </div>
                      </div>
                    )
                  })}
                {word &&
                  word[0]?.phonetics.map((voice: any, index: number) => {
                    return (
                      <div className="my-[16px]" key={`voice ${index}`}>
                        <div className="font-bold text-blue-800">Spelling:</div>
                        {voice.audio != '' && (
                          <audio controls>
                            <source src={voice.audio} type="audio/ogg" />
                          </audio>
                        )}
                      </div>
                    )
                  })}
              </div>
            </>
          ))}

        <audio src="https://api.dictionaryapi.dev/media/pronunciations/en/hello-au.mp3"></audio>
        <div className="absolute bottom-[-48px] right-[50%] translate-x-[50%]" onClick={onCloseDictionaryModal}>
          <CloseIcon1 width={28} height={28} color="#000" />
        </div>

        {word &&
          (isSave ? (
            <div className="absolute right-[10%] top-[15%]">
              <StarIcon width={24} height={24} color="yellow" />
            </div>
          ) : (
            <div className="absolute right-[10%] top-[15%]">
              <StarIcon width={24} height={24} color="#000" />
            </div>
          ))}

        <div>
          <button
            onClick={onOpenSaveCardModal}
            className="absolute rounded-full hover:rounded-lg bg-cyan-400 py-[16px] px-[48px] bottom-[20px] right-[50%] translate-x-[50%]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
