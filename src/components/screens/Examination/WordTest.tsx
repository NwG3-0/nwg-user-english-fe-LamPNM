import { SettingIcon } from '@components/common/CustomIcon'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  addResultWordTest,
  checkUserId,
  getDeckList,
  randomWord,
  setUpRandomWord,
  UpdateSetUpRandomWord,
} from '@utils/api'
import { QUERY_KEYS } from '@utils/keys'
import { NOTIFICATION_TYPE, notify } from '@utils/notify'
import { useCallback, useEffect, useState } from 'react'
import { FillWord } from './FillWord'
import { KeyBoard } from './KeyBoard'
import { useDataLoginInfoStore } from '@src/zustand'

export const WordTest = () => {
  const queryClient = useQueryClient()
  const [userInfo, accessToken] = useDataLoginInfoStore((state: any) => [state.userInfo, state.accessToken])

  const [wordToGuess, setWordToGuess] = useState<string>('')
  const [level, setLevel] = useState<string>('')
  const [isFalse, setIsFalse] = useState<boolean>(false)
  const [isCorrect, setIsCorrect] = useState<boolean>(false)
  const [inCorrectLetter, setInCorrectLetter] = useState<string[]>([])
  const [isStart, setIsStart] = useState<boolean>(true)
  const [isFinish, setIsFinish] = useState<boolean>(false)
  const [isOnProcess, setIsOnProcess] = useState<boolean>(false)
  const [wordData, setWordData] = useState<any[]>([])
  const [wordMeaning, setWordMeaning] = useState<string[]>([])
  const [wordPhonetic, setWordPhonetic] = useState<string[]>([])
  const [Heart, setHeart] = useState<string[]>(['3', '2', '1'])
  const [result, setResult] = useState<any>([])

  const [numberWord] = useState<number>(5)
  const [guessedLetters, setGuessedLetter] = useState<string[]>([])
  const [topicName, setTopicName] = useState<string>('')
  const [openSetupModal, setOpenSetupModal] = useState<boolean>(false)

  const { data: checkUser } = useQuery(
    [QUERY_KEYS.USER_RANDOM_CHECK],
    async () => {
      if (accessToken && userInfo) {
        try {
          const response = await checkUserId(userInfo.id, accessToken)

          return response
        } catch (error) {
          console.log(error)
        }
      }
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      enabled: !!accessToken && !!userInfo,
    },
  )

  const { data: deck } = useQuery(
    [QUERY_KEYS.TOPIC_LIST],
    async () => {
      try {
        const response = await getDeckList(userInfo?.id)

        return response
      } catch (error) {
        console.log(error)
      }
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      enabled: !!userInfo,
    },
  )

  const { data: rdWord } = useQuery(
    [QUERY_KEYS.WORD_TEST],
    async () => {
      if (accessToken && userInfo) {
        try {
          const response = await randomWord(userInfo?.id, accessToken)
          return response
        } catch (error) {
          console.log(error)
        }
      }
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      enabled: !!accessToken && !!userInfo,
    },
  )

  useEffect(() => {
    if (rdWord && rdWord.data?.length > 0) {
      setWordData(rdWord.data.map((w: any) => w))
      if (wordData) {
        setWordToGuess(wordData[0]?.Word)
        setWordPhonetic(wordData[0]?.Phonetic)
        setWordMeaning(JSON.parse(wordData[0]?.Meanings ?? '{}')[0]?.definitions[0].definition)
      }
    }
  }, [rdWord, isStart])

  useEffect(() => {
    if (isCorrect || isFalse) {
      wordData.shift()
      setWordData(wordData)

      setIsFalse(false)
      setIsCorrect(false)
      if (wordData) {
        setWordToGuess(wordData[0]?.Word)
        setWordPhonetic(wordData[0]?.Phonetic)
        setWordMeaning(JSON.parse(wordData[0]?.Meanings ?? '{}')[0]?.definitions[0].definition)
        setResult((prev: any) => [...prev, { word: wordToGuess, fault: inCorrectLetter.length }])
      }

      setGuessedLetter([])
    }
  }, [isCorrect, isFalse])

  useEffect(() => {
    if (deck && deck.data?.length > 0) {
      setTopicName(deck.data[0].topicName)
    }
  }, [deck, openSetupModal])

  const onSetupWord = async () => {
    if (!checkUser.success) {
      try {
        {
          if (accessToken) {
            const { success } = await setUpRandomWord({
              number: numberWord,
              userId: userInfo.id,
              isActivated: true,
              topicName: topicName,
              level: level || 'easy,normal,hard',
            })
            if (success) {
              notify(NOTIFICATION_TYPE.SUCCESS, 'Saved success')
              queryClient.invalidateQueries([QUERY_KEYS.WORD_TEST])
              setGuessedLetter([])
              setOpenSetupModal(false)
              setIsStart(true)
            }
          }
        }
      } catch (error) {}
    } else {
      try {
        {
          if (accessToken) {
            const { success } = await UpdateSetUpRandomWord({
              number: numberWord,
              userId: userInfo.id,
              topicName: topicName,
              level: level || 'easy,normal,hard',
            })
            if (success) {
              queryClient.invalidateQueries([QUERY_KEYS.WORD_TEST])
              notify(NOTIFICATION_TYPE.SUCCESS, 'Update success')
              setGuessedLetter([])
              setOpenSetupModal(false)
              setIsStart(true)
            }
          }
        }
      } catch (error) {}
    }
  }

  const handleTopicName = (e: any) => {
    setTopicName(e.target.value)
  }

  useEffect(() => {
    const incorrectLetter = guessedLetters.filter((letter) => !wordToGuess.includes(letter))

    setInCorrectLetter(incorrectLetter)
    setIsFalse(incorrectLetter.length > 2)
    setIsCorrect(wordToGuess?.split('').every((letter: string) => guessedLetters.includes(letter)))
  }, [guessedLetters, wordToGuess])
  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isCorrect || isFalse) return
      setGuessedLetter((currentLetters) => [...currentLetters, letter])
    },
    [guessedLetters],
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      if (!key.match(/^[a-z]$/)) return
      e.preventDefault()
      addGuessedLetter(key)
    }
    document.addEventListener('keypress', handler)

    return () => {
      document.removeEventListener('keypress', handler)
    }
  }, [guessedLetters])

  useEffect(() => {
    if (wordData.length === 0) {
      setIsFinish(true)
      setIsOnProcess(false)
    }
  })

  useEffect(() => {
    if (inCorrectLetter.length === 0) {
      setHeart(['3', '2', '1'])
    } else if (inCorrectLetter.length === 1) {
      setHeart(['2', '1'])
    } else if (inCorrectLetter.length === 2) {
      setHeart(['1'])
    } else {
      return
    }
  }, [inCorrectLetter.length])

  console.log(inCorrectLetter, Heart.length)

  const onReTry = () => {
    setIsStart(true)
    setIsFinish(false)
    queryClient.invalidateQueries([QUERY_KEYS.WORD_TEST])
  }

  const onSaveResult = async () => {
    try {
      {
        if (accessToken) {
          result.shift()
          setResult(result)
          const { success } = await addResultWordTest({
            resultExam: JSON.stringify(result),
            topicName: topicName,
            accessToken,
            userId: userInfo.id,
          })
          if (success) {
            notify(NOTIFICATION_TYPE.SUCCESS, 'Saved success')
          }
        }
      }
    } catch (error) {}
  }
  return (
    <div className="flex w-[60%] m-auto flex-col mt-[40px] mb-[40px]">
      <div className=" w-full h-[400px] mb-[20px] relative ">
        <button
          className="absolute align-center right-[4px] top-[4px] flex z-1 hover:animate-spin"
          onClick={() => {
            setOpenSetupModal(!openSetupModal)
          }}
        >
          <SettingIcon width={32} height={32} color="" />
        </button>

        {openSetupModal && (
          <div className="w-[200px] absolute right-0 top-[40px] p-[12px] bg-slate-200 rounded-[8px]">
            <div className="flex w-full gap-[10px] items-center flex-col">
              <div className="w-full">
                <div>Choose the topic name of word :</div>
                <select onChange={handleTopicName} name="topic" id="topic">
                  {deck?.data?.map((tpName: any) => {
                    return <option>{tpName.topicName}</option>
                  })}
                </select>
              </div>
              <div className="w-full">
                <div className="">Choose the difficult of word :</div>
                <div className="flex items-center gap-[4px]">
                  <input
                    onChange={() => setLevel('easy')}
                    checked={level === 'easy'}
                    value={'easy'}
                    type="checkbox"
                    className=" checked:bg-blue-500 block"
                  />
                  <div>Easy</div>
                </div>
                <div className="flex items-center gap-[4px]">
                  <input
                    onChange={() => setLevel('normal')}
                    checked={level === 'normal'}
                    value={'normal'}
                    type="checkbox"
                    className=" checked:bg-blue-500 block"
                  />
                  <div>Normal</div>
                </div>
                <div className="flex items-center gap-[4px]">
                  <input
                    onChange={() => setLevel('hard')}
                    checked={level === 'hard'}
                    value={'hard'}
                    type="checkbox"
                    className=" checked:bg-blue-500 block"
                  />
                  <div>Hard</div>
                </div>
              </div>
            </div>
            <button onClick={onSetupWord} className="">
              Done
            </button>
          </div>
        )}
        {isStart ? (
          <div className="bg-[url(/images/readybg.webp)] h-full w-full bg-contain bg-no-repeat ">
            <button
              className="absolute bottom-0 right-[50%] translate-x-[50%] bg-gradient-to-r mx-auto block from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 px-[48px] py-[16px] rounded-full hover:animate-pulse"
              onClick={() => {
                setIsStart(false)
                setIsOnProcess(true)
              }}
            >
              Lets Go
            </button>
          </div>
        ) : isOnProcess ? (
          <div
            data-aos="fade-right"
            data-aos-offset="50"
            data-aos-duration="500"
            data-aos-delay="300"
            className="relative w-full h-full border-solid border-2 border-indigo-600"
          >
            <div className=" text-[24px] mt-[40px] p-[40px]">{wordMeaning}</div>
            <div className="text-[20px] text-center mt-[20px]">{wordPhonetic}</div>
            <div className="absolute right-[50%] bottom-[4px] translate-x-[50%]">
              {result.length}/{rdWord?.data.length}
            </div>
            <div className="absolute bottom-[40px] right-[4px]">You have 3 chance each word</div>
            <div className="absolute bottom-[4px] right-[4px]  flex">
              {Heart.map(() => (
                <img className="w-[32px] h-[32px]" src="/images/HeartIcon.gif" />
              ))}
            </div>
          </div>
        ) : isFinish ? (
          <div className=" bg-[url(/images/finishbg.webp)] h-full w-full bg-contain bg-no-repeat ">
            <button
              onClick={onReTry}
              className="absolute bottom-0 right-[50%] translate-x-[50%] bg-gradient-to-r mx-auto block from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 px-[48px] py-[16px] rounded-full"
            >
              Try again
            </button>
            <button
              onClick={onSaveResult}
              className="absolute bottom-[40px] right-[50%] translate-x-[50%] bg-gradient-to-r mx-auto block from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 px-[48px] py-[16px] rounded-full"
            >
              Finish
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>

      {!isStart && (
        <div>
          <FillWord guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
          <div className="self-stretch">
            <KeyBoard
              activeLetter={guessedLetters.filter((letter) => wordToGuess.includes(letter))}
              inactiveLetter={inCorrectLetter}
              addGuessedLetter={addGuessedLetter}
            />
          </div>
        </div>
      )}
    </div>
  )
}
