import Footer from '@components/layouts/Footer'
import Header from '@components/layouts/Header'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const PostCreate = dynamic<any>(() => import('@components/screens/Post/PostCreate').then((mod) => mod.PostCreate), {
  ssr: false,
})

const PostCreatePage: NextPage = () => {
  return (
    <>
      <Header />
      <PostCreate />
      <Footer />
    </>
  )
}

export default PostCreatePage
