import { BinIcon, RotateLeftIcon, SearchIcon } from '@components/common/CustomIcon'
import { CustomModal } from '@components/common/CustomModal'
import { AddTopicModal } from '@components/widgets/AddTopicModal'
import { useDataLoginInfoStore } from '@src/zustand'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createDeck, deleteDeck, getCard, getDeckList } from '@utils/api'
import { QUERY_KEYS } from '@utils/keys'
import { NOTIFICATION_TYPE, notify } from '@utils/notify'
import React, { useEffect, useRef, useState } from 'react'
import Slider from 'react-slick'

export const Collection = () => {
  const [userInfo, accessToken] = useDataLoginInfoStore((state: any) => [state.userInfo, state.accessToken])
  const queryClient = useQueryClient()
  const [limit] = useState<number>(5)
  const [page] = useState<number>(1)
  const [keyword] = useState<string>('')
  const refTopicName = useRef() as React.MutableRefObject<HTMLInputElement>
  const [isOpenAddTopicModal, setIsOpenAddTopicModal] = useState<boolean>(false)
  const [level, setLevel] = useState<string[]>([])
  const [tpName, setTopicName] = useState<string>('')
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [_mean, setMean] = useState<any>([])

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

  const { data: card } = useQuery(
    [QUERY_KEYS.CARD_LIST, tpName, limit, page, keyword, level, deck],
    async () => {
      try {
        const topicName = tpName || deck?.data[0].topicName
        const response = await getCard({ limit, page, keyword, level: level.join(','), topicName })

        return response
      } catch (error) {
        console.log(error)
      }
    },
    {
      refetchInterval: false,
      enabled: deck && deck.data !== null,
    },
  )

  useEffect(() => {
    if (card) {
      setMean(
        card?.data?.map((m: any) => {
          return JSON.parse(m.meanings)
        }),
      )
    }
  }, [card])

  // const onCreate = async (event: { preventDefault: () => void }) => {
  //   try {
  //     event.preventDefault()
  //     if (accessToken) {
  //       const { success } = await createDeck({
  //         topicName: refTopicName.current.value,
  //         userId: userInfo?.id,
  //         accessToken,
  //       })

  //       if (success) {
  //         notify(NOTIFICATION_TYPE.SUCCESS, 'Delete success')
  //       }
  //     }
  //   } catch (error) {}
  // }

  const onDelete = async (id: any) => {
    try {
      if (id !== '') {
        const { success } = await deleteDeck(id)

        if (success) {
          notify(NOTIFICATION_TYPE.SUCCESS, 'Delete success')
          queryClient.invalidateQueries([QUERY_KEYS.TOPIC_LIST])
        }
      }
    } catch (error) {}
  }

  const onOpenTopicModal = () => {
    setIsOpenAddTopicModal(true)
  }
  const onCloseTopicModal = () => {
    setIsOpenAddTopicModal(false)
  }
  const onSelect = (tpN: string) => {
    console.log(refTopicName)
    setTopicName(tpN)
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
          notify(NOTIFICATION_TYPE.SUCCESS, 'Create success')
          queryClient.invalidateQueries([QUERY_KEYS.TOPIC_LIST])
        }
      } else {
        notify(NOTIFICATION_TYPE.ERROR, 'Invalid topic name')
      }
    } catch (error) {}
  }

  return (
    <div className="w-[80%] grid grid-cols-6 m-auto gap-x-[48px] gap-y-[32px] my-[48px]">
      <div className="col-span-4 h-[500px]  border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-slate-100 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div>
          <Slider>
            {card &&
              card?.data?.map((c: any, index: any, arr: any) => {
                return (
                  <div key={index} className="w-full h-[460px] relative">
                    {showDetail ? (
                      <div>
                        <div className="text-[120px] text-center mt-[80px]">{c.word}</div>
                        <div className="text-center text-[32px]">{c.phonetic}</div>
                      </div>
                    ) : (
                      <div>
                        {JSON.parse(c.meanings)?.map((wordDetail: any) => {
                          return (
                            <div className="flex flex-col gap-y-[12px]">
                              <div className="italic">{wordDetail?.partOfSpeech}</div>
                              <div>
                                <div className="font-semibold">Defination :</div>
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
      <div className="col-span-2 h-[500px]  border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-slate-100 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col  leading-normal">
        <div className="flex  w-full bg-white rounded-[24px] border-b-2 border-slate-600">
          <input
            placeholder="Enter topic name"
            className="w-full px-[24px] outline-none bg-transparent mx-auto block rounded-[4px]"
          />
          <div className="p-2 cursor-pointer">
            <SearchIcon width={24} height={24} color="#000" />
          </div>
        </div>
        <div className="h-[300px] overflow-y-scroll mt-[16px]">
          {deck &&
            deck?.data?.map((tpname: any) => {
              return (
                <div className="flex">
                  <div
                    className={`w-[80%] hover:bg-slate-100 hover:scale-105 cursor-pointer border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-slate-100 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col ${
                      tpname.topicName == tpName ? 'bg-sky-400' : ''
                    }`}
                    onClick={() => onSelect(tpname.topicName)}
                  >
                    {tpname?.topicName}
                  </div>
                  <div className="m-auto">
                    <button onClick={() => onDelete(tpname.id)}>
                      <BinIcon width={24} height={24} color={'red'} />
                    </button>
                  </div>
                </div>
              )
            })}
        </div>
        <div className="m-auto">
          <div className="flex w-full gap-[10px] items-center">
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
            className="mt-[16px] bg-gradient-to-r mx-auto block from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 px-[48px] py-[16px] rounded-full"
          >
            Create
          </button>

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
