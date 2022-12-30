import Footer from '@components/layouts/Footer'
import Header from '@components/layouts/Header'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const ListeningPage = dynamic<any>(() => import('@components/screens/Listening').then((mod) => mod.ListeningPage), {
  ssr: false,
})

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <ListeningPage />
      <Footer />
    </>
  )
}

export default Home
