import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const Header = dynamic<any>(() => import('@components/layouts/Header').then((mod) => mod.Header), {
  ssr: false,
})

const ReadingPage = dynamic<any>(() => import('@components/screens/Reading').then((mod) => mod.ReadingPage), {
  ssr: false,
})

const Footer = dynamic<any>(() => import('@components/layouts/Footer').then((mod) => mod.Footer), {
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
