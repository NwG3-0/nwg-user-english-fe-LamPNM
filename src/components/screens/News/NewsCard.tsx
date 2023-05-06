import dayjs from '@utils/dayjs'

import Link from 'next/link'

import { deleteWhiteSpace } from '@utils/index'
import { NewsListData } from '@src/models/api.interface'

interface Props {
  key?: string
  news: NewsListData
  position: 'left' | 'right'
}

export const NewsCard = ({ news, position, key }: Props) => {
  return (
    <Link
      href={`news/${news.id}`}
      className={`cursor-pointer flex overflow-hidden gap-[20px] group hover:text-[#808080] max-lg:flex-col flex-wrap ${
        position === 'right' && 'flex-row-reverse'
      }`}
      key={key}
    >
      <img className="flex-1 lg:w-[50%] h-[400px] object-cover" src={news.image} alt={news.title} />
      <div className={`flex-1 ${position === 'right' && 'flex flex-col lg:items-end lg:text-right'}`}>
        <div className="w-[100px] h-[10px] bg-black group-hover:bg-[#808080]" />
        <div className="py-[4px] break-words text-[32px] font-[600]">{news.title}</div>
        <div className="text-[10px] py-[10px] text-[#808080]">
          {dayjs.utc(news.day * 1000).format('HH:mm:ss YYYY, MMMM DD')}
        </div>
        <div
          className="mt-[8px] pb-[10px] text-[14px] h-[125px] overflow-y-hidden text-ellipsis"
          dangerouslySetInnerHTML={{ __html: deleteWhiteSpace(news.content) }}
        />
      </div>
    </Link>
  )
}
