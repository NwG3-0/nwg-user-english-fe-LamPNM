import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import React, { useCallback, useState } from 'react'
import Link from 'next/link'
import debounce from 'lodash.debounce'
import { useQuery } from '@tanstack/react-query'
import { SearchIcon } from '@components/common/CustomIcon'
import { EarliestPostResponse, EarliestPosts } from '@src/models/api.interface'
import { useDataLoginInfoStore } from '@src/zustand'
import { deleteWhiteSpace } from '@utils/index'
import { QUERY_KEYS } from '@utils/keys'
import { getEarliestPost, getPostList } from '@utils/api'
import { DataLoginInfo } from '@utils/zustand'

dayjs.extend(utc)

export const Post = () => {
  const [userInfo, accessToken] = useDataLoginInfoStore((state: DataLoginInfo) => [state.userInfo, state.accessToken])
  const [limit] = useState<number>(5)
  const [page] = useState<number>(1)
  const [keyword, setKeyword] = useState<string>('')

  const { data: post, isLoading: isPostLoading } = useQuery(
    [QUERY_KEYS.POST_LIST, limit, page, keyword],
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

  const { data: earliest_post } = useQuery(
    [QUERY_KEYS.EARLIEST_POST_LIST, userInfo, accessToken],
    async () => {
      if (userInfo && accessToken) {
        try {
          const response = (await getEarliestPost(userInfo?.id, accessToken)) as EarliestPostResponse

          return response
        } catch (error) {
          console.log(error)
        }
      }
    },
    {
      refetchInterval: false,
      enabled: !!accessToken && !!userInfo,
    },
  )

  const onChangeKeyword = (e: { target: { value: string } }) => {
    debounceInput(e.target.value)
  }

  const debounceInput = useCallback(
    debounce((keyword: string) => debounceKeyword(keyword), 1000),
    [],
  )

  const debounceKeyword = (keyword: string) => {
    setKeyword(keyword)
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
      <div className="container xl:w-[calc(100%-200px)] flex justify-between mx-auto py-[50px] gap-[50px]">
        <div className="w-full xl:w-[1200px]">
          <div className="w-full flex justify-between items-center mx-auto pt-[20px] pb-[20px]">
            <div className="text-[24px] font-bold">Blogs</div>
            <div className="flex gap-[10px] rounded-lg py-[5px] px-[10px] border-[1px] border-[#808080] items-center">
              <input className="outline-none" placeholder="Search blogs" onChange={onChangeKeyword} />
              <SearchIcon width={25} height={25} color="#808080" />
            </div>
          </div>
          {isPostLoading ? (
            <div>Loading</div>
          ) : (
            <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-4">
              {post &&
                post?.data?.length > 0 &&
                post?.data.map(
                  (p: { id: string; imageTitle: string; title: string; description: string; day: number }) => (
                    <Link href={`/post/${p.id}`} className="bg-slate-100 cursor-pointer rounded-md p-[10px]" key={p.id}>
                      <img className="w-full h-[300px] object-cover" src={p.imageTitle}></img>
                      <div className="flex justify-between items-center py-[5px] mx-auto">
                        <div className="text-left text-[10px] py-[4px] break-words">{p.title}</div>
                        <div className="text-[8px] text-[#808080] text-right">
                          {dayjs(p.day).utc().format('YYYY, MMMM DD')}
                        </div>
                      </div>
                      <div
                        className="mt-[8px] w-full pb-[10px] text-[12px] h-[90px] overflow-y-hidden text-ellipsis"
                        dangerouslySetInnerHTML={{ __html: deleteWhiteSpace(p.description) }}
                      />
                    </Link>
                  ),
                )}
            </div>
          )}
        </div>
        <div className="w-[400px] hidden xl:block">
          <div className="text-center py-[20px] font-bold text-[24px]">Latest Blogs</div>
          <div className="flex flex-col gap-[20px]">
            {earliest_post &&
              earliest_post?.data?.posts?.map((post: EarliestPosts) => (
                <div
                  className="flex gap-[20px] items-center p-[20px] bg-[#fafafa] rounded-xl shadow-2xl"
                  key={post._id}
                >
                  <img src={post.ImageTitle} className="object-cover w-[100px] h-[100px]" />
                  <div>
                    <div className="text-[18px] font-bold">{post.Title}</div>
                    <div>{post.Description}</div>
                    <div>{post.CreatedAt}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
