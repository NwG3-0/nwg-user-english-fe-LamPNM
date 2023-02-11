import Header from '@components/layouts/Header'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const Post = dynamic<any>(() => import('@components/screens/Post').then((mod) => mod.Post), {
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
      <Post />
      <Footer />
    </div>
  )
}

export default PostPage
