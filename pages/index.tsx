import Header from '@components/layouts/Header'
import HomePage from '@components/screens/Home'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const MenuWeb = dynamic<any>(() => import('@components/layouts/MenuWeb').then((mod) => mod.MenuWeb), {
  ssr: false,
})

const Footer = dynamic<any>(() => import('@components/layouts/Footer').then((mod) => mod.Footer), {
  ssr: false,
})

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <MenuWeb />
      <HomePage />
      <Footer />
    </>
  )
}

export default Home
