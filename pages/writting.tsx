import Header from '@components/layouts/Header'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const WritingPage = dynamic(() => import('@components/screens/Writing').then((mod) => mod.WritingPage), {
  ssr: false,
})

const Footer = dynamic<any>(() => import('@components/layouts/Footer').then((mod) => mod.Footer), {
  ssr: false,
})

const Home: NextPage = () => {
  return (
    <div>
      <Header />
      <WritingPage />
      <Footer />
    </div>
  )
}

export default Home
