import { useQuery } from '@tanstack/react-query'
import { getPostList } from '@utils/api'
import { QUERY_KEYS } from '@utils/keys'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import React, { useEffect, useState } from 'react'

dayjs.extend(utc)

export const Post = () => {
  const [limit] = useState<number>(5)
  const [page] = useState<number>(1)
  const [keyword] = useState<string>('')

  const { data: post } = useQuery(
    [QUERY_KEYS.POST_LIST],
    async () => {
      try {
        const response = await getPostList({ limit, page, keyword })

        return response
      } catch (error) {
        console.log(error)
      }
    },
    {
      refetchInterval: false,
    },
  )

  const onChangeText = (value: any) => {
    console.log(value.target.value)
  }

  useEffect(() => {
    setTimeout(() => {
      const input = document.querySelectorAll('.input-text')

      console.log(input)
    }, 2000)
  }, [post])

  const convertText = (string: string) => {
    return string?.replaceAll('concak', `<input className="input-text" />`)
  }

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
      <div>Blogs</div>
      <div className="w-[calc(100%-150px)] flex justify-between mx-auto py-[50px]">
        <div className="grid w-[100%] xl:w-[1200px] grid-cols-1 md:grid-cols-3 gap-4">
          {post?.data.map((p: { imageTitle: string; title: string; description: string; day: number }) => (
            <div className="bg-slate-100 cursor-pointer">
              <img className="w-full h-[300px] object-cover" src={p.imageTitle}></img>
              <div className="flex justify-between items-center py-[10px] px-[10px]">
                <div className="text-center text-lg py-[4px] ">{p.title}</div>
                <div className="text-[12px] text-[#808080]">{dayjs(p.day).utc().format('HH:mm:ss YYYY, MMMM DD')}</div>
              </div>
              <div className="mt-[8px]" dangerouslySetInnerHTML={{ __html: p.description }}></div>
            </div>
          ))}
        </div>
        <div className="w-[300px]">
          <div>Best Blogs</div>
          <div className="mt-[8px]" dangerouslySetInnerHTML={{ __html: convertText(post?.data[0]?.description) }}></div>
        </div>
      </div>
    </div>
  )
}
