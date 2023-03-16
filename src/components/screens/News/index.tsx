import { SearchIcon } from '@components/common/CustomIcon'
import { useQuery } from '@tanstack/react-query'
import { getNewsList } from '@utils/api'
import { deleteWhiteSpace } from '@utils/index'
import { QUERY_KEYS } from '@utils/keys'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import debounce from 'lodash.debounce'
import Link from 'next/link'
import React, { useCallback, useState } from 'react'

dayjs.extend(utc)

export const News = () => {
  const [limit] = useState<number>(5)
  const [page] = useState<number>(1)
  const [keyword, setKeyword] = useState<string>('')

  const { data: news, isLoading: isPostLoading } = useQuery(
    [QUERY_KEYS.NEWS_LIST, limit, page, keyword],
    async () => {
      try {
        const response = await getNewsList({ limit, page, keyword })

        return response
      } catch (error) {
        console.log(error)
      }
    },
    {
      refetchInterval: false,
    },
  )

  const onChangeKeyword = (e: { target: { value: string } }) => {
    debounceInput(e.target.value)
  }

  const debounceInput = useCallback(
    debounce((keyword) => debounceKeyword(keyword), 1000),
    [],
  )

  const debounceKeyword = (keyword: string) => {
    setKeyword(keyword)
  }

  return (
    <div>
      <div className="relative w-full h-[800px] bg-[url('/images/Post/banner_post.png')] bg-cover overflow-hidden">
        <div className="absolute top-[50%] left-[50%] text-center -translate-x-[50%] -translate-y-[50%]">
          <div className="text-white font-bold text-[32px]">
            Our IELTS blog is your one-stop destination for all things IELTS, from practice materials to success
            stories.
          </div>
        </div>
      </div>
      <div className="container xl:w-[calc(100%-200px)] flex justify-between mx-auto py-[50px] gap-[50px]">
        <div className="w-full xl:w-[1200px]">
          <div className="w-full flex justify-between items-center mx-auto pt-[20px] pb-[20px]">
            <div className="text-[24px] font-bold">News</div>
            <div className="flex gap-[10px] rounded-lg py-[5px] px-[10px] border-[1px] border-[#808080] items-center">
              <input className="outline-none" placeholder="Search blogs" onChange={onChangeKeyword} />
              <SearchIcon width={25} height={25} color="#808080" />
            </div>
          </div>
          {isPostLoading ? (
            <div>Loading</div>
          ) : (
            <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-4">
              {news &&
                news?.data?.length > 0 &&
                news?.data.map((p: { id: string; image: string; title: string; content: string; day: number }) => (
                  <Link href={`news/${p.id}`} className="bg-slate-100 cursor-pointer rounded-md p-[10px]">
                    <img className="w-full h-[300px] object-cover" src={p.image}></img>
                    <div className="flex justify-between items-center py-[5px]  mx-auto">
                      <div className="text-left text-sm py-[4px] break-words">{p.title}</div>
                      <div className="text-[10px] text-[#808080] text-right">
                        {dayjs(p.day).utc().format('HH:mm:ss YYYY, MMMM DD')}
                      </div>
                    </div>
                    <div
                      className="mt-[8px] pb-[10px] text-[12px] h-[120px] overflow-y-hidden text-ellipsis"
                      dangerouslySetInnerHTML={{ __html: deleteWhiteSpace(p.content) }}
                    />
                  </Link>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
