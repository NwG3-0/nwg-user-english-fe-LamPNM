import { useCallback, useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { FillWord } from './FillWord'
import { KeyBoard } from './KeyBoard'
import { SettingIcon } from '@components/common/CustomIcon'
import { useDataLoginInfoStore } from '@src/zustand'
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

interface Status {
  isFalse: boolean
  isCorrect: boolean
  isStart: boolean
  isFinish: boolean
  isOnProcess: boolean
}

export const WordTest = () => {
  const queryClient = useQueryClient()
  const [userInfo, accessToken] = useDataLoginInfoStore((state: any) => [state.userInfo, state.accessToken])

  const [isStatus, setIsStatus] = useState<Status>({
    isFalse: false,
    isCorrect: false,
    isStart: false,
    isFinish: false,
    isOnProcess: false,
  })

  const [openSetupModal, setOpenSetupModal] = useState<boolean>(false)

  const [level, setLevel] = useState<string>('')

  const [inCorrectLetter, setInCorrectLetter] = useState<string[]>([])
  const [wordData, setWordData] = useState<any[]>([])
  const [word, setWord] = useState({
    wordToGuess: '',
    wordMeaning: '',
    wordPhonetic: '',
  })

  const [heart, setHeart] = useState<string[]>(['3', '2', '1'])
  const [result, setResult] = useState<any>([])
  const [guessedLetters, setGuessedLetter] = useState<string[]>([])

  const [numberWord] = useState<number>(5)
  const [topicName, setTopicName] = useState<string>('')

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
    [QUERY_KEYS.WORD_TEST, userInfo, accessToken, isStatus.isStart],
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
      enabled: !!accessToken && !!userInfo && isStatus.isStart,
    },
  )

  useEffect(() => {
    if (rdWord && rdWord.data?.length > 0) {
      setWordData([...rdWord.data])

      setWord({
        wordToGuess: rdWord.data[0]?.Word,
        wordPhonetic: rdWord.data[0]?.Phonetic,
        wordMeaning: JSON.parse(rdWord.data[0]?.Meanings ?? '{}')[0]?.definitions[0].definition,
      })
    }
  }, [rdWord, isStatus.isStart])

  useEffect(() => {
    if (wordData && wordData?.length > 0 && (isStatus.isCorrect || isStatus.isFalse)) {
      const arrWordData = wordData.filter((_word: any, index: number) => index !== 0)
      setWordData(arrWordData)

      setIsStatus((prev: Status) => ({ ...prev, isFalse: false, isCorrect: false }))

      setWord({
        wordToGuess: arrWordData[0]?.Word,
        wordPhonetic: arrWordData[0]?.Phonetic,
        wordMeaning: JSON.parse(arrWordData[0]?.Meanings ?? '{}')[0]?.definitions[0].definition,
      })

      setResult((prev: any) => [...prev, { word: word.wordToGuess, fault: inCorrectLetter.length }])

      setGuessedLetter([])
    }
  }, [isStatus.isCorrect, isStatus.isFalse])

  useEffect(() => {
    if (deck && deck.data?.length > 0) {
      setTopicName(deck.data[0].topicName)
    }
  }, [deck, openSetupModal])

  const onSetupWord = async () => {
    if (!checkUser.success) {
      try {
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

            setIsStatus((prev: Status) => ({ ...prev, isStart: true }))
          }
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
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

            setIsStatus((prev: Status) => ({ ...prev, isStart: true }))
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleTopicName = (e: any) => {
    setTopicName(e.target.value)
  }

  useEffect(() => {
    const incorrectLetter = guessedLetters.filter((letter) => !word.wordToGuess.includes(letter))

    setInCorrectLetter(incorrectLetter)

    setIsStatus((prev: Status) => ({
      ...prev,
      isFalse: incorrectLetter.length > 2,
      isCorrect: word.wordToGuess?.split('').every((letter: string) => guessedLetters.includes(letter)),
    }))
  }, [guessedLetters, word.wordToGuess])

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isStatus.isCorrect || isStatus.isFalse) return
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
      setIsStatus((prev: Status) => ({ ...prev, isFinish: true, isOnProcess: false }))
    }
  }, [wordData])

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

  const onSaveResult = async () => {
    try {
      if (accessToken) {
        const { success } = await addResultWordTest({
          resultTest: JSON.stringify(result),
          topicName: topicName,
          accessToken,
          userId: userInfo.id,
        })

        if (success) {
          setIsStatus({
            isFalse: false,
            isCorrect: false,
            isStart: false,
            isFinish: false,
            isOnProcess: false,
          })
          setResult([])
          notify(NOTIFICATION_TYPE.SUCCESS, 'Save the result successfully')
        }
      }
    } catch (error) {
      notify(NOTIFICATION_TYPE.ERROR, 'Save the result fail')
    }
  }

  return (
    <div className="w-full">
      <div className="relative w-full h-[800px] bg-[url('/images/Post/banner_post.png')] bg-cover overflow-hidden">
        <div className="absolute top-[50%] left-[50%] text-center -translate-x-[50%] -translate-y-[50%]">
          <p className="text-white font-bold text-[32px]">
            Our IELTS blog is your one-stop destination for all things IELTS, from practice materials to success
            stories.
          </p>
        </div>
      </div>
      <div className="w-[1100px] h-[400px] relative m-auto flex flex-col mt-[40px] mb-[40px]">
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
                <p className="">Choose the difficult of word :</p>
                <div className="flex items-center gap-[4px]">
                  <input
                    onChange={() => setLevel('easy')}
                    checked={level === 'easy'}
                    value={'easy'}
                    type="checkbox"
                    className=" checked:bg-blue-500 block"
                  />
                  <div>
                    <p>Easy</p>
                  </div>
                </div>
                <div className="flex items-center gap-[4px]">
                  <input
                    onChange={() => setLevel('normal')}
                    checked={level === 'normal'}
                    value={'normal'}
                    type="checkbox"
                    className=" checked:bg-blue-500 block"
                  />
                  <div>
                    <p>Normal</p>
                  </div>
                </div>
                <div className="flex items-center gap-[4px]">
                  <input
                    onChange={() => setLevel('hard')}
                    checked={level === 'hard'}
                    value={'hard'}
                    type="checkbox"
                    className=" checked:bg-blue-500 block"
                  />
                  <div>
                    <p>Hard</p>
                  </div>
                </div>
              </div>
            </div>
            <button onClick={onSetupWord} className="">
              Done
            </button>
          </div>
        )}
        {!isStatus.isStart ? (
          <div className="h-full mx-auto">
            <img src="/images/readybg.webp" alt="Ready Background" />
            <button
              className="bg-gradient-to-r mx-auto block from-green-400 to-blue-500 mt-[10px] px-[48px] py-[16px] rounded-full"
              onClick={() => {
                setIsStatus((prev: Status) => ({ ...prev, isStart: true, isOnProcess: true, isFinish: false }))
              }}
            >
              Lets Go
            </button>
          </div>
        ) : isStatus.isOnProcess ? (
          <div className="relative w-full h-full border-solid border-2 border-indigo-600">
            <div className=" text-[24px] mt-[40px] p-[40px]">{word.wordMeaning}</div>
            <div className="text-[20px] text-center mt-[20px]">{word.wordPhonetic}</div>
            <div className="absolute right-[50%] bottom-[4px] translate-x-[50%]">
              {result.length + 1}/{rdWord?.data.length}
            </div>
            <div className="absolute bottom-[40px] right-[4px]">
              <p>You have 3 chance each word</p>
            </div>
            <div className="absolute bottom-[4px] right-[4px] flex">
              {heart.map(() => (
                <img className="w-[32px] h-[32px]" src="/images/HeartIcon.gif" alt="Heart Icon" />
              ))}
            </div>
          </div>
        ) : (
          isStatus.isFinish && (
            <div className=" bg-[url(/images/finishbg.webp)] h-full w-full bg-contain bg-no-repeat">
              <button
                onClick={onSaveResult}
                className="absolute bottom-[40px] right-[50%] translate-x-[50%] bg-gradient-to-r mx-auto block from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 px-[48px] py-[16px] rounded-full"
              >
                Finish
              </button>
            </div>
          )
        )}
      </div>

      {!isStatus.isFinish && isStatus.isStart && (
        <div className="w-[800px] mx-auto pb-[30px]">
          <FillWord guessedLetters={guessedLetters} wordToGuess={word.wordToGuess} />
          <div className="self-stretch">
            <KeyBoard
              activeLetter={guessedLetters.filter((letter) => word.wordToGuess.includes(letter))}
              inactiveLetter={inCorrectLetter}
              addGuessedLetter={addGuessedLetter}
            />
          </div>
        </div>
      )}
    </div>
  )
}
