import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { BinIcon, RotateLeftIcon, SearchIcon } from '@components/common/CustomIcon'
import { CustomModal } from '@components/common/CustomModal'
import { AddTopicModal } from '@components/widgets/AddTopicModal'
import { useDataLoginInfoStore } from '@src/zustand'
import { createDeck, deleteDeck, getCard, getDeckList } from '@utils/api'
import { QUERY_KEYS } from '@utils/keys'
import { NOTIFICATION_TYPE, notify } from '@utils/notify'

const settings = {
  dots: false,
  slidesToShow: 1,
  slidesToScroll: 1,
}

export const Collection = () => {
  const queryClient = useQueryClient()
  const [userInfo, accessToken] = useDataLoginInfoStore((state: any) => [state.userInfo, state.accessToken])

  const [isOpenAddTopicModal, setIsOpenAddTopicModal] = useState<boolean>(false)
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [isOutOfLengthTopic, setIsOutOfLengthTopic] = useState<boolean>(false)

  const [limit] = useState<number>(5)
  const [page] = useState<number>(1)

  const [_mean, setMean] = useState<any>([])
  const [keyword] = useState<string>('')
  const [level, setLevel] = useState<string[]>([])
  const [tpName, setTopicName] = useState<string>('')

  const { data: deck, isLoading: isDeckLoading } = useQuery(
    [QUERY_KEYS.TOPIC_LIST, userInfo, accessToken],
    async () => {
      try {
        const response = await getDeckList(userInfo?.id, accessToken)

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

  const { data: card, isLoading: isCardLoading } = useQuery(
    [QUERY_KEYS.CARD_LIST, tpName, limit, page, keyword, level],
    async () => {
      try {
        const topicName = tpName
        const response = await getCard({ limit, page, keyword, level: level.join(','), topicName })

        return response
      } catch (error) {
        console.log(error)
      }
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      enabled: tpName !== '',
    },
  )

  useEffect(() => {
    if (card && !isCardLoading) {
      setMean(
        card?.data?.map((m: any) => {
          return JSON.parse(m.meanings)
        }),
      )
    }
  }, [card])

  useEffect(() => {
    if (deck && !isDeckLoading) {
      if (deck?.data.length === 7) {
        setIsOutOfLengthTopic(true)
      }

      setTopicName(deck?.data[0].topicName)
    }
  }, [deck])

  const onDelete = async (id: any) => {
    try {
      if (id !== '') {
        const { success } = await deleteDeck(id)

        if (success) {
          notify(NOTIFICATION_TYPE.SUCCESS, 'Delete success')
          queryClient.invalidateQueries([QUERY_KEYS.TOPIC_LIST])
        }
      }
    } catch (error) {
      notify(NOTIFICATION_TYPE.ERROR, 'Delete topic name Fail')
    }
  }

  const onOpenTopicModal = () => {
    setIsOpenAddTopicModal(true)
  }

  const onCloseTopicModal = () => {
    setIsOpenAddTopicModal(false)
  }

  const onSelect = (topic: string) => {
    setTopicName(topic)
  }

  const onShowDetail = () => {
    setShowDetail(!showDetail)
  }

  const handleCheck = (e: { target: { checked: boolean; value: string } }) => {
    let updatedList: string[] = [...level]
    if (e.target.checked) {
      updatedList = [...level, e.target.value]
    } else {
      updatedList.splice(level.indexOf(e.target.value), 1)
    }
    setLevel(updatedList)
  }

  const onAddTopic = async ({ topicName }: { topicName: string }) => {
    try {
      if (accessToken && topicName !== '') {
        const { success } = await createDeck({
          topicName: topicName,
          userId: userInfo?.id,
          accessToken,
        })

        if (success) {
          onCloseTopicModal()
          notify(NOTIFICATION_TYPE.SUCCESS, 'Create topic name success')
          queryClient.invalidateQueries([QUERY_KEYS.TOPIC_LIST])
        }
      } else {
        notify(NOTIFICATION_TYPE.ERROR, 'Invalid topic name')
      }
    } catch (error) {
      notify(NOTIFICATION_TYPE.ERROR, 'Create topic name fail')
    }
  }

  if (!userInfo && !accessToken) {
    return (
      <div>
        <div>Please login to access the collection</div>
      </div>
    )
  }

  return (
    <div className="w-[80%] grid grid-cols-6 m-auto gap-x-[48px] gap-y-[32px] my-[48px]">
      <div className="col-span-4 h-[550px] border-[#808080] border-[1px] bg-[#e9e8e8] p-[15px] flex flex-col justify-center">
        <div className="px-[20px]">
          <Slider {...settings} className="slide-collection h-[100%]">
            {card &&
              card?.data?.map((item: any, index: number, arr: any) => {
                return (
                  <div key={index} className="w-full h-[460px] px-[10px] relative">
                    {!showDetail ? (
                      <>
                        <div className="text-[120px] text-center mt-[80px]">{item.word}</div>
                        <div className="text-center text-[32px]">{item.phonetic}</div>
                      </>
                    ) : (
                      <div>
                        {JSON.parse(item.meanings)?.map((wordDetail: any) => {
                          return (
                            <div className="flex flex-col gap-y-[12px]">
                              <div className="italic">{wordDetail?.partOfSpeech}</div>
                              <div>
                                <div className="font-semibold">Definition :</div>
                                <div>-{wordDetail?.definitions[0]?.definition}</div>
                              </div>
                              <div>{wordDetail?.synonyms}</div>
                            </div>
                          )
                        })}
                      </div>
                    )}

                    <button className="absolute top-0 right-0" onClick={onShowDetail}>
                      <RotateLeftIcon width={32} height={32} color={''} />
                    </button>
                    <div className="absolute bottom-[0px] text-[16px] right-[50%]">
                      {index + 1}/{arr.length}
                    </div>
                  </div>
                )
              })}
          </Slider>
        </div>
      </div>
      <div className="col-span-2 h-[550px] border-[#808080] border-[1px] bg-[#e9e8e8] rounded-b lg:rounded-b-none lg:rounded-r p-[15px] flex flex-col">
        <div className="flex w-full bg-[#FFFFFF] rounded-md">
          <input
            placeholder="Enter topic name"
            className="w-full px-[12px] outline-none bg-transparent mx-auto block rounded-[4px]"
          />
          <div className="p-2 cursor-pointer">
            <SearchIcon width={24} height={24} color="#000" />
          </div>
        </div>
        <div className={`h-[300px] ${deck && deck?.data?.length > 4 && 'overflow-y-scroll'} mt-[10px]`}>
          {deck &&
            deck?.data?.map((topic: any) => {
              return (
                <div className="flex items-center gap-[20px]" key={topic.id}>
                  <div
                    className={`w-[80%] hover:bg-sky-400 cursor-pointer border-[1px] border-[#808080] bg-slate-100 rounded-md p-4 flex flex-col mt-[10px] ${
                      topic.topicName === tpName && 'bg-sky-400'
                    }`}
                    onClick={() => {
                      if (topic.topicName !== tpName) onSelect(topic.topicName)
                    }}
                  >
                    {topic?.topicName}
                  </div>
                  <button className="pt-[5px]" onClick={() => onDelete(topic.id)}>
                    <BinIcon width={24} height={24} color={'red'} />
                  </button>
                </div>
              )
            })}
        </div>
        <div className="m-auto">
          <div className="flex w-full justify-center gap-[30px] items-center">
            <div className="flex items-center gap-[4px]">
              <input onChange={handleCheck} value={'easy'} type="checkbox" className=" checked:bg-blue-500 block" />
              <div>Easy</div>
            </div>
            <div className="flex items-center gap-[4px]">
              <input onChange={handleCheck} value={'normal'} type="checkbox" className=" checked:bg-blue-500 block" />
              <div>Normal</div>
            </div>
            <div className="flex items-center gap-[4px]">
              <input onChange={handleCheck} value={'hard'} type="checkbox" className=" checked:bg-blue-500 block" />
              <div>Hard</div>
            </div>
          </div>
          <button
            onClick={onOpenTopicModal}
            className={`mt-[16px] mx-auto block ${
              !isOutOfLengthTopic
                ? 'bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-[#FFFFFF]'
                : 'bg-[#808080] text-[#000]'
            } px-[48px] py-[16px] rounded-full`}
            disabled={isOutOfLengthTopic}
          >
            Create
          </button>
          <div>*Notice: You have just only 7 topic name</div>
          <CustomModal
            classNameCustom="w-[500px]"
            isOpen={isOpenAddTopicModal}
            onRequestClose={() => setIsOpenAddTopicModal(false)}
          >
            <AddTopicModal onCloseTopicModal={onCloseTopicModal} onCreate={onAddTopic} />
          </CustomModal>
        </div>
      </div>
    </div>
  )
}
