import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const Header = dynamic<any>(() => import('@components/layouts/Header').then((mod) => mod.Header), {
  ssr: false,
})

const NewsDetail = dynamic<any>(() => import('@components/screens/News/NewsDetail').then((mod) => mod.NewsDetail), {
  ssr: false,
})

const MenuWeb = dynamic<any>(() => import('@components/layouts/MenuWeb').then((mod) => mod.MenuWeb), {
  ssr: false,
})

const Footer = dynamic<any>(() => import('@components/layouts/Footer').then((mod) => mod.Footer), {
  ssr: false,
})

const PostPage: NextPage = () => {
  return (
    <div>
      <Header />
      <MenuWeb />
      <NewsDetail />
      <Footer />
    </div>
  )
}

export default PostPage
