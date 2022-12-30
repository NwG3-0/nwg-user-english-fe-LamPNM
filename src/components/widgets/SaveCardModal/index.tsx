import { AUTH_TOKEN, USER_INFO } from '@src/models/api'
import { useQuery } from '@tanstack/react-query'
import { createCard, getDeckList } from '@utils/api'
import { safeParseJSON } from '@utils/json'
import { QUERY_KEYS } from '@utils/keys'
import { NOTIFICATION_TYPE, notify } from '@utils/notify'
import { useMemo, useState } from 'react'

interface Props {
  word: any
}

export const SaveCardModal = ({ word }: Props) => {
  const [level, setLevel] = useState<string>('')
  const [topicName, setTopicName] = useState<string>('')

  const userInfo: any = useMemo(() => {
    if (typeof window !== 'undefined') {
      return safeParseJSON(localStorage.getItem(USER_INFO) as string)
    }
  }, [])
  const accessToken = useMemo(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(AUTH_TOKEN)
    }
  }, [])

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
      enabled: !!userInfo,
    },
  )

  const handleTopicName = (e: any) => {
    setTopicName(e.target.value)
  }
  const onCreate = async () => {
    try {
      {
        if (accessToken) {
          const { success } = await createCard({
            topicName: topicName,
            word: word[0].word,
            phonetic: JSON.stringify(word[0].phonetics[1].text) || 'emty',
            audio: JSON.stringify(word[0].phonetics[0].audio) || 'emty',
            meanings: JSON.stringify(word[0].meanings) || 'emty',
            level: level,
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
    <div className="w-[500px] h-[400px]">
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
      <button onClick={onCreate} className="">
        Create
      </button>
    </div>
  )
}
