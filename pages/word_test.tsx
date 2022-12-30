import Footer from '@components/layouts/Footer'
import Header from '@components/layouts/Header'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const WordTest = dynamic(() => import('@components/screens/Examination/WordTest').then((mod) => mod.WordTest), {
  ssr: false,
})

const PostPage: NextPage = () => {
  return (
    <div>
      <Header />
      <WordTest />
      <Footer />
    </div>
  )
}

export default PostPage
