import { SearchIcon } from '@components/common/CustomIcon'
import { NewsHighestViewsData, NewsHighestViewsDataResponse, NewsListData, NewsListDataResponse } from '@src/models/api'
import { useQuery } from '@tanstack/react-query'
import { getHighestNewsList, getNewsList, getNewsListByType } from '@utils/api'
import { deleteWhiteSpace } from '@utils/index'
import { QUERY_KEYS } from '@utils/keys'
import dayjs from '@utils/dayjs'
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
  const [keyword, setKeyword] = useState<string>(query?.keyword ?? '')
  const [types, setTypes] = useState<string>('')

  useLayoutEffect(() => {
    if (query?.type) {
      setTypes(query.type)
    }
  }, [query])

  console.log(types.split(',').includes('sport'))

  const { data: news, isLoading: isNewsLoading } = useQuery(
    [QUERY_KEYS.NEWS_LIST, limit, page, keyword, types],
    async () => {
      try {
        const response = (await getNewsList({ limit, page, keyword })) as NewsListDataResponse

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
    router.push({
      query: {
        page: p,
      },
    })
  }

  const onSelectTypes = (e: { target: { checked: boolean; value: string } }) => {
    let arrayTypes: any = types.split(',').filter((type: string) => type !== '')
    let valTypes: string[] = []

    if (e.target.checked) {
      arrayTypes.push(e.target.value)
      valTypes = arrayTypes
    } else {
      valTypes = arrayTypes.filter((type: string) => type !== e.target.value)
    }

    setTypes(valTypes.join(','))
    router.replace({
      query: {
        page: page,
        type: valTypes.join(','),
      },
    })
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
        <div className="w-[400px] pt-[20px]">
          <p className="text-[24px] font-bold">News</p>
          <div className="flex gap-[10px] rounded-lg py-[5px] px-[10px] border-[1px] border-[#808080] items-center">
            <input className="outline-none flex-1" placeholder="Search blogs" onChange={onChangeKeyword} />
            <SearchIcon width={25} height={25} color="#808080" />
          </div>
          <div className="cursor-pointer rounded-lg py-[5px] px-[10px]">
            {NEWS_LIST.map((news: NewsList) => (
              <div key={news.id} className="flex gap-[10px] items-center">
                <input
                  checked={types.split(',').includes(news.value)}
                  type="checkbox"
                  name="type"
                  value={news.value}
                  onChange={onSelectTypes}
                />
                <label>{news.name}</label>
              </div>
            ))}
          </div>
          <p className="text-[26px] font-extrabold">The highest view news</p>
          <div className="flex flex-col gap-[10px] mt-[20px]">
            {news_highest_views &&
              news_highest_views.data.map((news: NewsHighestViewsData) => (
                <Link href={`news/${news.id}`} key={news.id} className="flex gap-[10px]">
                  <img src={news.image} className="w-[150px] object-cover" />
                  <div>
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
        <div className="w-full xl:w-[1200px]">
          {news && isNewsLoading ? (
            <div>Loading</div>
          ) : (
            <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-4">
              {news &&
                news.data?.length > 0 &&
                news.data.map((p: NewsListData) => (
                  <Link
                    href={`news/${p.id}`}
                    className="bg-slate-100 cursor-pointer rounded-md p-[10px] shadow-2xl"
                    key={p.id}
                  >
                    <img className="w-full h-[200px] object-cover" src={p.image}></img>
                    <div className="flex justify-between items-center py-[5px]  mx-auto">
                      <div className="text-left text-sm py-[4px] break-words">{p.title}</div>
                      <div className="text-[10px] text-[#808080] text-right">
                        {dayjs.utc(p.day * 1000).format('HH:mm:ss YYYY, MMMM DD')}
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

          {news_type && isNewsTypeLoading ? (
            <div>Loading</div>
          ) : (
            <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-4">
              {news_type &&
                news_type.data?.length > 0 &&
                news_type.data.map((p: NewsListData) => (
                  <Link
                    href={`news/${p.id}`}
                    className="bg-slate-100 cursor-pointer rounded-md p-[10px] shadow-2xl"
                    key={p.id}
                  >
                    <img className="w-full h-[200px] object-cover" src={p.image}></img>
                    <div className="flex justify-between items-center py-[5px]  mx-auto">
                      <div className="text-left text-sm py-[4px] break-words">{p.title}</div>
                      <div className="text-[10px] text-[#808080] text-right">
                        {dayjs.utc(p.day * 1000).format('HH:mm:ss YYYY, MMMM DD')}
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
  )
}
