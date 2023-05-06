import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { PostDetailResponse } from '@src/models/api.interface'
import { getPostDetail } from '@utils/api'
import { QUERY_KEYS } from '@utils/keys'

dayjs.extend(utc)

export const PostDetail = () => {
  const router = useRouter()
  const { id } = router.query as { id: string }

  const { data: post_detail } = useQuery(
    [QUERY_KEYS.POST_DETAIL, id],
    async () => {
      try {
        const response = (await getPostDetail({ post_id: id })) as PostDetailResponse

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
      {post_detail && post_detail?.success && post_detail.data && (
        <div className="mt-[30px] w-[600px] mx-auto py-[50px]">
          <div className="text-[20px] font-bold text-center">{post_detail?.data?.Title}</div>
          <img src={post_detail?.data?.ImageTitle} className="w-full mt-[20px]" />
          <div className="text-right mt-[20px] text-[12px]">
            {dayjs(post_detail.data.UpdatedAt).utc().format('HH:mm:ss YYYY, MMMM DD')}
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: post_detail.data.Description ?? '' }}
            className="mt-[10px] text-[18px]"
          />
        </div>
      )}
    </div>
  )
}
