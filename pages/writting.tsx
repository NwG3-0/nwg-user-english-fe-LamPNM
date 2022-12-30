import Footer from '@components/layouts/Footer'
import Header from '@components/layouts/Header'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const WrittingPage = dynamic(() => import('@components/screens/Writting').then((mod) => mod.WrittingPage), {
  ssr: false,
})

const Home: NextPage = () => {
  return (
    <div>
      <Header />
      <WrittingPage />
      <Footer />
    </div>
  )
}

export default Home
