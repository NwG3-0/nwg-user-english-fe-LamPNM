import { useEffect, useRef, useState } from 'react'
import YouTube from 'react-youtube'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { SubTitleData, SubTitleDataResponse, VideoDataResponse } from '@src/models/api'
import { useDataLoginInfoStore } from '@src/zustand'
import { getLearningVideoDetail, getSubTitleDetail } from '@utils/api'
import { QUERY_KEYS } from '@utils/keys'
import { DataLoginInfo } from '@utils/zustand'
import { TranslateIcon } from '@components/common/CustomIcon'
import { CustomModal } from '@components/common/CustomModal'
import { TranslateModal } from '@components/widgets/TranslateModal'
import { InView } from 'react-intersection-observer'

interface WordTranslate {
  text: string
  translate: string
}

export const VideoDetail = () => {
  const router = useRouter()
  const { id } = router.query as { id: string }

  const playerRef = useRef<YouTube | null>(null)
  const [accessToken] = useDataLoginInfoStore((state: DataLoginInfo) => [state.accessToken])
  const [inView, setInView] = useState<boolean>(false)

  const [isOpenVideoModal, setIsOpenVideoModal] = useState<boolean>(false)

  const [wordTranslate, setWordTranslate] = useState<WordTranslate>({
    text: '',
    translate: '',
  })

  const [currentTime, setCurrentTime] = useState<number>(0)

  const { data: subtitle_video } = useQuery(
    [QUERY_KEYS.SUBTITLE_VIDEO_DETAIL, accessToken, id],
    async () => {
      if (accessToken) {
        try {
          const response = (await getSubTitleDetail({ learning_video_id: id, accessToken })) as SubTitleDataResponse

          if (response.success) {
            return response.data
          }
        } catch (error) {
          console.log(error)
        }
      }
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      enabled: !!accessToken && !!id,
    },
  )

  const { data: video_detail } = useQuery(
    [QUERY_KEYS.VIDEO_DETAIL, accessToken, id],
    async () => {
      if (accessToken) {
        try {
          const response = (await getLearningVideoDetail({ video_id: id, accessToken })) as VideoDataResponse

          if (response.success) {
            return response.data
          }
        } catch (error) {
          console.log(error)
        }
      }
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      enabled: !!accessToken && !!id,
    },
  )

  const handlePlayerReady = (event: { target: YouTube }) => {
    playerRef.current = event.target
  }

  const onChangeVideoDetail = (event: { target: YouTube; data: number }) => {
    if (event.data === YouTube.PlayerState.PLAYING) {
      setInterval(() => {
        setCurrentTime(playerRef.current?.getCurrentTime() || 0)
      }, 1000)
    }
  }

  useEffect(() => {
    if (!inView) {
      const element: HTMLElement | null = document.getElementById('text-translate')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [inView])

  return (
    <div className="mt-[100px]">
      {video_detail && subtitle_video && (
        <div className="flex h-fit flex-wrap w-fit md:w-[1200px] mx-auto mt-[50px]">
          <YouTube videoId={video_detail.Link} onReady={handlePlayerReady} onStateChange={onChangeVideoDetail} />
          <InView onChange={setInView}>
            {({ ref }) => (
              <div className="overflow-y-scroll h-[360px] w-full md:w-[calc(100%-640px)]">
                {subtitle_video?.map((sub: SubTitleData, index: number) => {
                  if (
                    index < subtitle_video.length - 1 &&
                    sub.start < currentTime &&
                    subtitle_video[index + 1].start > currentTime
                  ) {
                    return (
                      <div
                        id="text-translate"
                        key={sub.id}
                        ref={ref}
                        className="w-full px-[10px] py-[5px] border-b-[1px] border-[#808080] bg-[#808080] text-[#FFFFFF]"
                      >
                        <div className="w-fit flex items-center gap-[20px]">
                          <div className="w-[300px] break-words">
                            <p>{sub.text}</p>
                          </div>
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              setIsOpenVideoModal(true)
                              setWordTranslate({
                                text: sub.text,
                                translate: sub.translate,
                              })
                            }}
                          >
                            <TranslateIcon width={30} height={30} />
                          </div>
                          <div></div>
                        </div>
                      </div>
                    )
                  } else {
                    return (
                      <div
                        key={sub.id}
                        className="bg-red-100 w-full px-[10px] py-[5px] border-b-[1px] border-[#808080]"
                      >
                        <div className="w-fit flex items-center gap-[20px]">
                          <div className="w-[300px] break-words">
                            <p>{sub.text}</p>
                          </div>
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              setIsOpenVideoModal(true)
                              setWordTranslate({
                                text: sub.text,
                                translate: sub.translate,
                              })
                            }}
                          >
                            <TranslateIcon width={30} height={30} />
                          </div>
                          <div></div>
                        </div>
                      </div>
                    )
                  }
                })}
              </div>
            )}
          </InView>
        </div>
      )}
      <CustomModal
        classNameCustom="w-[500px]"
        isOpen={isOpenVideoModal}
        onRequestClose={() => setIsOpenVideoModal(false)}
      >
        <TranslateModal text={wordTranslate.text} translate={wordTranslate.translate} />
      </CustomModal>
    </div>
  )
}
