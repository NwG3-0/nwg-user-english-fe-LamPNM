import Header from '@components/layouts/Header'
import Footer from '@components/layouts/Footer'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const ReadingPage = dynamic<any>(() => import('@components/screens/Reading').then((mod) => mod.ReadingPage), {
  ssr: false,
})

const Home: NextPage = () => {
  return (
    <div>
      <Header />
      <ReadingPage />
      <Footer />
    </div>
  )
}

export default Home
