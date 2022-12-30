import Footer from '@components/layouts/Footer'
import Header from '@components/layouts/Header'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const SpeakingPage = dynamic(() => import('@components/screens/Speaking').then((mod) => mod.SpeakingPage), {
  ssr: false,
})

const Home: NextPage = () => {
  return (
    <div>
      <Header />
      <SpeakingPage />
      <Footer />
    </div>
  )
}

export default Home
