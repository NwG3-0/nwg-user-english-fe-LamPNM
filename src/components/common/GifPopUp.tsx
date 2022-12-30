import { GiphyData } from '@src/models/giphy'
import { useQuery } from '@tanstack/react-query'
import { TYPE_MESSAGE } from '@utils/common'
import { getGiphyGif, getGiphyGifTrend } from '@utils/giphy'
import { QUERY_KEYS } from '@utils/keys'
import debounce from 'lodash.debounce'
import { useCallback, useEffect, useState } from 'react'
import { InView } from 'react-intersection-observer'

interface Props {
  onSendGiphy: (url: string, type: TYPE_MESSAGE) => void
}

export const GifPopUp = ({ onSendGiphy }: Props) => {
  const [inView, setInView] = useState<boolean>(false)

  const [keyword, setKeyword] = useState<string>('')
  const [limit] = useState<number>(15)
  const [offset, setOffset] = useState<number>(0)
  const [gifData, setGifData] = useState<any>([])
  const [gifTrendData, setGifTrendData] = useState<any>([])

  const debounceKeyword = (keyword: string) => {
    setGifData([])
    setGifTrendData([])
    setOffset(0)
    setKeyword(keyword)
  }

  const debounceInput = useCallback(
    debounce((keyword) => debounceKeyword(keyword), 1000),
    [],
  )

  useEffect(() => {
    if (inView) {
      setOffset((prevOffset: number) => prevOffset + 1)
    }
  }, [inView])

  const onChangeKeyword = (e: { target: { value: string } }) => {
    debounceInput(e.target.value)
  }

  const { data: gif } = useQuery(
    [QUERY_KEYS.GIF_LIST, keyword, limit, offset],
    async () => {
      try {
        const response = await getGiphyGif({ keyword, limit, offset })

        return response
      } catch (error) {
        console.log(error)
      }
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      enabled: keyword !== '',
    },
  )

  const { data: gifTrend, isLoading: isGifTrendLoading } = useQuery(
    [QUERY_KEYS.GIF_TREND_LIST, keyword, limit, offset],
    async () => {
      try {
        const response = await getGiphyGifTrend({ limit, offset })

        return response
      } catch (error) {
        console.log(error)
      }
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      enabled: keyword === '',
    },
  )

  useEffect(() => {
    if (gif && gif?.data?.length > 0) {
      gif?.data?.map((g: any) => {
        setGifData((prev: any) => [...prev, g])
      })
    }
  }, [gif])

  useEffect(() => {
    if (gifTrend && gifTrend?.data?.length > 0) {
      gifTrend?.data?.map((g: any) => {
        setGifTrendData((prev: any) => [...prev, g])
      })
    }
  }, [gifTrend])

  return (
    <div className="w-[320px]">
      {gifData.length > 0 && (
        <InView onChange={setInView}>
          {({ ref }) => (
            <div className="flex w-full bg-[#000] flex-wrap h-[300px] overflow-y-scroll">
              {gifData?.map((g: GiphyData, index: number) => {
                if (gifData?.length === index + 1) {
                  return (
                    <div
                      ref={ref}
                      key={g?.id}
                      className="cursor-pointer"
                      onClick={() => onSendGiphy(g?.images?.fixed_width?.webp, TYPE_MESSAGE.GIF)}
                    >
                      <img src={g?.images?.fixed_width_small?.webp} alt={g?.title} />
                    </div>
                  )
                } else {
                  return (
                    <div key={g?.id} onClick={() => onSendGiphy(g?.images?.fixed_width?.webp, TYPE_MESSAGE.GIF)}>
                      <img src={g?.images?.fixed_width_small?.webp} alt={g?.title} />
                    </div>
                  )
                }
              })}
            </div>
          )}
        </InView>
      )}
      {gifTrendData.length > 0 && (
        <InView onChange={setInView}>
          {({ ref }) => (
            <div className="flex w-full bg-[#000] flex-wrap h-[300px] overflow-y-scroll">
              {gifTrendData?.map((g: GiphyData, index: number) => {
                if (gifTrendData?.length === index + 1) {
                  return (
                    <div
                      ref={ref}
                      key={g?.id}
                      className="cursor-pointer"
                      onClick={() => onSendGiphy(g?.images?.fixed_width?.webp, TYPE_MESSAGE.GIF)}
                    >
                      <img src={g?.images?.fixed_width_small?.webp} alt={g?.title} />
                    </div>
                  )
                } else {
                  return (
                    <div key={g?.id} onClick={() => onSendGiphy(g?.images?.fixed_width?.webp, TYPE_MESSAGE.GIF)}>
                      <img src={g?.images?.fixed_width_small?.webp} alt={g?.title} />
                    </div>
                  )
                }
              })}
              {isGifTrendLoading && <div className="mt-[5px] mx-auto w-fit">Loading</div>}
            </div>
          )}
        </InView>
      )}
      <div className="w-full">
        <input
          onChange={onChangeKeyword}
          placeholder="Search gif"
          className="text-black w-full block mx-auto border-[1px] border-[#808080] outline-none py-[5px] pl-[10px]"
        />
      </div>
    </div>
  )
}
