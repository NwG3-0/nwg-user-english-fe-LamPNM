import type { NextPage } from 'next'
import HomePage from '@components/screens/Home'
import { Header } from '@components/layouts/Header'
import { Banner } from '@components/layouts/Banner'
import { Footer } from '@components/layouts/Footer'

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <Banner path="/images/background-home.webp" />
      <HomePage />
      <Footer />
    </>
  )
}

export default Home
