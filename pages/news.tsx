import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const News = dynamic<any>(() => import('@components/screens/News').then((mod) => mod.News), {
  ssr: false,
})

const NewsPage: NextPage = () => {
  return <News />
}

export default NewsPage
