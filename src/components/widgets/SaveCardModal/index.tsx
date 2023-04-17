import { useDataLoginInfoStore } from '@src/zustand'
import { useQuery } from '@tanstack/react-query'
import { createCard, getDeckList } from '@utils/api'
import { QUERY_KEYS } from '@utils/keys'
import { NOTIFICATION_TYPE, notify } from '@utils/notify'
import { useEffect, useState } from 'react'

interface Props {
  word: any
  onRequestClose: () => void
}

export const SaveCardModal = ({ word, onRequestClose }: Props) => {
  const [level, setLevel] = useState<string>('')
  const [topicName, setTopicName] = useState<string>('')
  const [userInfo, accessToken] = useDataLoginInfoStore((state) => [state.userInfo, state.accessToken])

  const { data: deck } = useQuery(
    [QUERY_KEYS.TOPIC_LIST, userInfo, accessToken],
    async () => {
      try {
        if (userInfo && accessToken) {
          const response = await getDeckList(userInfo?.id, accessToken)

          return response
        }
      } catch (error) {
        console.log(error)
      }
    },
    {
      refetchInterval: false,
      enabled: !!userInfo && !!accessToken,
      refetchOnWindowFocus: false,
    },
  )

  useEffect(() => {
    if (deck) {
      setTopicName(deck?.data[0]?.topicName)
    }
  }, [deck])

  const handleTopicName = (e: any) => {
    setTopicName(e.target.value)
  }

  const onCreate = async () => {
    try {
      if (accessToken && userInfo) {
        await createCard({
          topicName: topicName,
          word: word.word,
          phonetic: JSON.stringify(word?.phonetics[1]?.text ?? ''),
          audio: JSON.stringify(word?.phonetics[0]?.audio ?? ''),
          meanings: JSON.stringify(word?.meanings ?? ''),
          level: level,
          accessToken,
          userId: userInfo.id,
        })

        onRequestClose()
        notify(NOTIFICATION_TYPE.SUCCESS, 'Save successful')
      }
    } catch (error) {
      console.log(error)
      notify(NOTIFICATION_TYPE.ERROR, 'Save fail')
    }
  }

  return (
    <div className="w-[400px]">
      <div className="flex w-full gap-[10px] items-center flex-col">
        {word && <div className="text-[22px] font-semibold">{word.word}</div>}
        <div className="w-full flex items-center gap-[20px]">
          <p className="">Choose the topic name of word :</p>
          {deck && (
            <select
              onChange={handleTopicName}
              name="topic"
              id="topic"
              defaultValue={topicName}
              className="border-[#808080] text-[18px] py-[5px] border-[0.5px]"
            >
              {deck?.data?.map((tpName: any) => {
                return <option>{tpName.topicName}</option>
              })}
            </select>
          )}
        </div>
        <div className="w-full">
          <div className="">Choose the difficult of word :</div>
          <div className="flex items-center justify-between mt-[10px]">
            <div className="flex items-center gap-[4px]">
              <input
                onChange={() => setLevel('easy')}
                checked={level === 'easy'}
                value={'easy'}
                type="checkbox"
                className=" checked:bg-blue-500 block mt-[1px] cursor-pointer"
              />
              <div className="text-[18px]">Easy</div>
            </div>
            <div className="flex items-center gap-[4px]">
              <input
                onChange={() => setLevel('normal')}
                checked={level === 'normal'}
                value={'normal'}
                type="checkbox"
                className=" checked:bg-blue-500 block mt-[1px] cursor-pointer"
              />
              <div className="text-[18px]">Normal</div>
            </div>
            <div className="flex items-center gap-[4px]">
              <input
                onChange={() => setLevel('hard')}
                checked={level === 'hard'}
                value={'hard'}
                type="checkbox"
                className=" checked:bg-blue-500 block mt-[1px] cursor-pointer"
              />
              <div className="text-[18px]">Hard</div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={onCreate} className="w-full text-center text-[#FFFFFF] py-[10px] bg-[#0ca3a3] mt-[10px]">
        Create
      </button>
    </div>
  )
}
