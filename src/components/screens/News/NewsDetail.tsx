import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { NewsDetailResponse } from '@src/models/api'
import { checkViewNews, getNewsDetail, addViewNews, updateViewNews } from '@utils/api'
import { QUERY_KEYS } from '@utils/keys'
import { useDataLoginInfoStore } from '@src/zustand'
import { NOTIFICATION_TYPE, notify } from '@utils/notify'
import { DataLoginInfo } from '@utils/zustand'

dayjs.extend(utc)

export const NewsDetail = () => {
  const router = useRouter()
  const [userInfo, accessToken] = useDataLoginInfoStore((state: DataLoginInfo) => [state.userInfo, state.accessToken])
  const { id } = router.query as { id: string }

  const { data: news_detail } = useQuery(
    [QUERY_KEYS.POST_DETAIL, id],
    async () => {
      try {
        const response = (await getNewsDetail({ news_id: id })) as NewsDetailResponse

        return response
      } catch (error) {
        console.log(error)
      }
    },
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
    },
  )

  const { data: checkViews } = useQuery(
    [QUERY_KEYS.CHECK_VIEW_NEWS, id, accessToken, userInfo],
    async () => {
      try {
        if (accessToken && userInfo) {
          const { success } = await checkViewNews({ newsId: id, userId: userInfo.id, accessToken })

          return success
        }
      } catch (error) {
        console.log(error)
      }
    },
    {
      enabled: !!id && !!accessToken && !!userInfo,
      refetchOnWindowFocus: false,
      refetchInterval: false,
    },
  )

  const onAddViewsNews = async () => {
    try {
      if (userInfo && accessToken) {
        await addViewNews({ newsId: id, userId: userInfo.id, accessToken })
        await updateViewNews({ newsId: id, accessToken })
      }
    } catch (error) {
      notify(NOTIFICATION_TYPE.ERROR, 'Something went wrong')
    }
  }

  useEffect(() => {
    if (typeof checkViews !== 'undefined' && !checkViews) {
      onAddViewsNews()
    }
  }, [checkViews])

  return (
    <div>
      <div className="relative w-full h-[800px] bg-[url('/images/Post/banner_post.png')] bg-cover overflow-hidden">
        <div className="absolute top-[50%] left-[50%] text-center -translate-x-[50%] -translate-y-[50%]">
          {/* <div>Welcome to our blog</div> */}
          <div className="text-white font-bold text-[32px]">
            Our IELTS blog is your one-stop destination for all things IELTS, from practice materials to success
            stories.
          </div>
        </div>
      </div>
      {news_detail && news_detail?.success && news_detail.data && (
        <div className="mt-[30px] w-[600px] mx-auto py-[50px]">
          <div className="text-[20px] font-bold text-center">{news_detail?.data?.Title}</div>
          <img src={news_detail?.data?.Image} className="w-full mt-[20px]" />
          <div className="text-right mt-[20px] text-[12px]">
            <p>{news_detail.data.View} Views</p>
            <p>
              {dayjs(news_detail.data.UpdatedAt * 1000)
                .utc()
                .format('HH:mm:ss YYYY, MMMM DD')}
            </p>
          </div>
          <div dangerouslySetInnerHTML={{ __html: news_detail.data.Content ?? '' }} className="mt-[10px] text-[18px]" />
        </div>
      )}
    </div>
  )
}
