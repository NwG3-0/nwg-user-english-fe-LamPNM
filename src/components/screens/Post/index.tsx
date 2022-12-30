import { useQuery } from '@tanstack/react-query'
import { getPostList } from '@utils/api'
import { QUERY_KEYS } from '@utils/keys'
import React, { useState } from 'react'

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

  return (
    <div className="container m-auto grid grid-cols-2 gap-4">
      {post?.data.map((p: any) => (
        <div className="bg-slate-100 py-[16px] md:col-span-1 col-span-2">
          <div className="text-center text-lg py-[4px] ">{p.title}</div>
          <img className="w-full " src={p.imageTitle}></img>
          <div className="mt-[8px]" dangerouslySetInnerHTML={{ __html: p.description }}></div>
        </div>
      ))}
    </div>
  )
}
