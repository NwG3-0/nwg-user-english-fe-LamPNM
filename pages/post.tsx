import Header from '@components/layouts/Header'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const Post = dynamic<any>(() => import('@components/screens/Post').then((mod) => mod.Post), {
  ssr: false,
})

const PostPage: NextPage = () => {
  return (
    <div>
      <Header />
      <Post />
    </div>
  )
}

export default PostPage
