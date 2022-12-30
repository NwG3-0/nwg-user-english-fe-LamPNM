import Footer from '@components/layouts/Footer'
import Header from '@components/layouts/Header'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const Collection = dynamic(() => import('@components/screens/Collection/index').then((mod) => mod.Collection), {
  ssr: false,
})
const PostPage: NextPage = () => {
  return (
    <div>
      <Header />
      <Collection />
      <Footer />
    </div>
  )
}

export default PostPage
