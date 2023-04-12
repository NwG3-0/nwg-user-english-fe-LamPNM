import dayjs from '@utils/dayjs'
import { PlayIcon, SearchIcon } from '@components/common/CustomIcon'
import {
  LearningVideoData,
  LearningVideoResponseData,
  NewsHighestViewsData,
  NewsHighestViewsDataResponse,
  NewsListData,
  NewsListDataResponse,
} from '@src/models/api'
import { useQuery } from '@tanstack/react-query'
import { getHighestNewsList, getLearningVideoList, getNewsList, getNewsListByType } from '@utils/api'
import { deleteWhiteSpace } from '@utils/index'
import { QUERY_KEYS } from '@utils/keys'
import debounce from 'lodash.debounce'
import Link from 'next/link'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { Pagination } from '@components/common/Pagination'
import { useRouter } from 'next/router'
import { NEWS_LIST, NewsList } from '@utils/common'

export const News = () => {
  const router = useRouter()
  const { query }: any = router

  const [limit] = useState<number>(9)
  const [page, setPage] = useState<number>(Number(query?.page ?? 1))
  const [startDate, setStartDate] = useState<number>(dayjs.utc().subtract(3, 'months').unix())
  const [endDate, setEndDate] = useState<number>(dayjs.utc().unix())

  const [keyword, setKeyword] = useState<string>(query?.keyword ?? '')
  const [types, setTypes] = useState<string>('')

  useLayoutEffect(() => {
    if (query?.type) {
      setTypes(query.type)
    }
  }, [query])

  const { data: news, isLoading: isNewsLoading } = useQuery(
    [QUERY_KEYS.NEWS_LIST, limit, page, keyword, types, startDate, endDate],
    async () => {
      try {
        const response = (await getNewsList({ limit, page, keyword, startDate, endDate })) as NewsListDataResponse

        return response
      } catch (error) {
        console.log(error)
      }
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      enabled: types === '',
    },
  )

  const { data: news_type, isLoading: isNewsTypeLoading } = useQuery(
    [QUERY_KEYS.NEWS_TYPES, limit, page, keyword, types],
    async () => {
      try {
        const response = (await getNewsListByType({ limit, page, keyword, type: types })) as NewsListDataResponse

        return response
      } catch (error) {
        console.log(error)
      }
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      enabled: types !== '',
    },
  )

  const { data: news_highest_views, isLoading: isNewsHighestLoading } = useQuery(
    [QUERY_KEYS.NEWS_HIGHEST],
    async () => {
      try {
        const response = (await getHighestNewsList({ limit: 3 })) as NewsHighestViewsDataResponse

        return response
      } catch (error) {
        console.log(error)
      }
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    },
  )

  const { data: learning_video, isLoading: isLearningVideoLoading } = useQuery(
    [QUERY_KEYS.LEARNING_VIDEO],
    async () => {
      try {
        const response = (await getLearningVideoList({ limit: 6, page: 1 })) as LearningVideoResponseData

        return response
      } catch (error) {
        console.log(error)
      }
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
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

  const onChangePage = (p: number) => {
    setPage(p)
    router.push({
      query: {
        page: p,
      },
    })
  }

  const onSelectTypes = (value: string) => {
    setTypes(value)
  }

  return (
    <div className="container xl:w-[1300px] mx-auto mt-[110px]">
      <div className="w-full flex gap-[20px]">
        <div className="flex-1">
          <div className="cursor-pointer flex">
            <div
              className={`px-[15px] py-[10px] ${types === '' && 'bg-[#808080] text-white'}`}
              onClick={() => onSelectTypes('')}
            >
              <p>All</p>
            </div>
            {NEWS_LIST.map((news: NewsList) => (
              <div
                key={news.id}
                className={`px-[15px] py-[10px] ${types === news.value && 'bg-[#808080] text-white'}`}
                onClick={() => onSelectTypes(news.value)}
              >
                <p>{news.name}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-[20px]">
            <div className="flex w-[300px] gap-[10px] rounded-lg py-[5px] px-[10px] border-[1px] border-[#808080] items-center">
              <input className="outline-none flex-1" placeholder="Search the news" onChange={onChangeKeyword} />
              <SearchIcon width={25} height={25} color="#808080" />
            </div>
          </div>
          <div className="w-full mt-[30px]">
            {news && isNewsLoading ? (
              <div>Loading</div>
            ) : (
              <div className="flex flex-col gap-[50px]">
                {news &&
                  news.data?.length > 0 &&
                  news.data.map((p: NewsListData, index: number) => {
                    if (index % 2 === 0) {
                      return (
                        <Link
                          href={`news/${p.id}`}
                          className="cursor-pointer flex overflow-hidden gap-[20px] group hover:text-[#808080]"
                          key={p.id}
                        >
                          <img className="w-[50%] h-[400px] object-cover" src={p.image} />
                          <div className="flex-1">
                            <div className="w-[100px] h-[10px] bg-black group-hover:bg-[#808080]" />
                            <div className="py-[4px] break-words text-[32px] font-[600]">{p.title}</div>
                            <div className="text-[10px] py-[10px] text-[#808080]">
                              {dayjs.utc(p.day * 1000).format('HH:mm:ss YYYY, MMMM DD')}
                            </div>
                            <div
                              className="mt-[8px] pb-[10px] text-[14px] h-[125px] overflow-y-hidden text-ellipsis"
                              dangerouslySetInnerHTML={{ __html: deleteWhiteSpace(p.content) }}
                            />
                          </div>
                        </Link>
                      )
                    } else {
                      return (
                        <Link
                          href={`news/${p.id}`}
                          className="cursor-pointer flex overflow-hidden gap-[20px] group hover:text-[#808080]"
                          key={p.id}
                        >
                          <div className="flex-1 flex flex-col items-end">
                            <div className="w-[100px] h-[10px] bg-black group-hover:bg-[#808080]" />
                            <div className="py-[4px] break-words text-[32px] font-[600]">{p.title}</div>
                            <div className="text-[10px] py-[10px] text-[#808080]">
                              {dayjs.utc(p.day * 1000).format('HH:mm:ss YYYY, MMMM DD')}
                            </div>
                            <div
                              className="mt-[8px] pb-[10px] text-[14px] h-[125px] overflow-y-hidden text-ellipsis text-right"
                              dangerouslySetInnerHTML={{ __html: deleteWhiteSpace(p.content) }}
                            />
                          </div>
                          <img className="w-[50%] h-[400px] object-cover" src={p.image} />
                        </Link>
                      )
                    }
                  })}
              </div>
            )}

            {news_type && isNewsTypeLoading ? (
              <div>Loading</div>
            ) : (
              <div className="flex flex-col gap-[50px]">
                {news_type &&
                  news_type.data?.length > 0 &&
                  news_type.data.map((p: NewsListData, index: number) => {
                    if (index % 2 === 0) {
                      return (
                        <Link
                          href={`news/${p.id}`}
                          className="cursor-pointer flex overflow-hidden gap-[20px] group hover:text-[#808080]"
                          key={p.id}
                        >
                          <img className="w-[50%] h-[400px] object-cover" src={p.image} />
                          <div className="flex-1">
                            <div className="w-[100px] h-[10px] bg-black group-hover:bg-blue-500" />
                            <div className="py-[4px] break-words text-[32px] font-[600]">{p.title}</div>
                            <div className="text-[10px] py-[10px] text-[#808080] group-hover:text-[#808080]">
                              {dayjs.utc(p.day * 1000).format('HH:mm:ss YYYY, MMMM DD')}
                            </div>
                            <div
                              className="mt-[8px] pb-[10px] text-[14px] h-[125px] overflow-y-hidden text-ellipsis"
                              dangerouslySetInnerHTML={{ __html: deleteWhiteSpace(p.content) }}
                            />
                          </div>
                        </Link>
                      )
                    } else {
                      return (
                        <Link
                          href={`news/${p.id}`}
                          className="cursor-pointer flex overflow-hidden gap-[20px]"
                          key={p.id}
                        >
                          <div className="flex-1 flex flex-col items-end group hover:text-blue-500">
                            <div className="w-[100px] h-[10px] bg-black group-hover:bg-blue-500" />
                            <div className="py-[4px] break-words text-[32px] font-[600]">{p.title}</div>
                            <div className="text-[10px] py-[10px] text-[#808080] group-hover:text-blue-500">
                              {dayjs.utc(p.day * 1000).format('HH:mm:ss YYYY, MMMM DD')}
                            </div>
                            <div
                              className="mt-[8px] pb-[10px] text-[14px] h-[125px] overflow-y-hidden text-ellipsis text-right"
                              dangerouslySetInnerHTML={{ __html: deleteWhiteSpace(p.content) }}
                            />
                          </div>
                          <img className="w-[50%] h-[400px] object-cover" src={p.image} />
                        </Link>
                      )
                    }
                  })}
              </div>
            )}

            <div className="my-[20px]">
              {news && (
                <Pagination
                  currentPage={news.pagination.startPage}
                  totalRecords={news.pagination.totalPages}
                  limit={limit}
                  onChangePage={onChangePage}
                />
              )}

              {news_type && (
                <Pagination
                  currentPage={news_type.pagination.startPage}
                  totalRecords={news_type.pagination.totalPages}
                  limit={limit}
                  onChangePage={onChangePage}
                />
              )}
            </div>
          </div>
        </div>
        <div className="w-[300px] py-[10px] px-[10px]">
          <p className="text-[26px] font-extrabold">The highest view news</p>
          <div className="flex flex-col gap-[20px] mt-[20px]">
            {news_highest_views &&
              news_highest_views.data.map((news: NewsHighestViewsData) => (
                <Link href={`news/${news.id}`} key={news.id} className="flex flex-col gap-[10px] group">
                  <div className="w-[100px] h-[10px] bg-black group-hover:bg-blue-500" />
                  <img src={news.image} className="w-[150px] object-cover" />
                  <div className="break-words">
                    <p className="text-[14px] font-semibold">{news.title}</p>
                    <p>
                      {news.view} {news.view > 1 ? 'views' : 'view'}
                    </p>
                    <p className="text-[12px]">{dayjs.utc(news.day * 1000).format('HH:mm:ss YYYY, MMMM DD')} UTC</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
      <div className="w-full flex gap-[20px]">
        <div className="flex-1 border-t-[0.5px] border-[#808080]">
          <p className="font-[600] mt-[5px] text-[24px]">Video</p>
          <div className="w-full grid grid-cols-3 gap-[20px] mt-[20px]">
            {learning_video &&
              learning_video.data.map((item: LearningVideoData) => (
                <div className="w-full cursor-pointer group" key={item.id}>
                  <div className="relative w-full h-fit">
                    <img src={item.image} alt={item.title} className="w-full object-cover" />
                    <div className="w-full h-full absolute top-0 left-0 bg-[#00000075] invisible group-hover:visible">
                      <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                        <PlayIcon width={45} height={45} color="#FFFFFF" />
                      </div>
                    </div>
                  </div>
                  <p className="mt-[10px]">{item.title}</p>
                </div>
              ))}
          </div>
        </div>
        <div className="w-[300px] py-[10px] px-[10px]">
          <p className="text-[26px] font-extrabold">The highest view news</p>
          <div className="flex flex-col gap-[20px] mt-[20px]">
            {news_highest_views &&
              news_highest_views.data.map((news: NewsHighestViewsData) => (
                <Link href={`news/${news.id}`} key={news.id} className="flex flex-col gap-[10px] group">
                  <div className="w-[100px] h-[10px] bg-black group-hover:bg-blue-500" />
                  <img src={news.image} className="w-[150px] object-cover" />
                  <div className="break-words">
                    <p className="text-[14px] font-semibold">{news.title}</p>
                    <p>
                      {news.view} {news.view > 1 ? 'views' : 'view'}
                    </p>
                    <p className="text-[12px]">{dayjs.utc(news.day * 1000).format('HH:mm:ss YYYY, MMMM DD')} UTC</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
