import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { Banner } from '@components/layouts/Banner'
import { requireAuthenticated } from '@components/HOCs/requiredAuthentication'

const Header = dynamic<any>(() => import('@components/layouts/Header').then((mod) => mod.Header), {
  ssr: false,
})

const Collection = dynamic<any>(() => import('@components/screens/Collection/index').then((mod) => mod.Collection), {
  ssr: false,
})

const Footer = dynamic<any>(() => import('@components/layouts/Footer').then((mod) => mod.Footer), {
  ssr: false,
})

const CollectionPage: NextPage = () => {
  return (
    <div>
      <Header />
      <Banner path="/images/background-home.webp" />
      <Collection />
      <Footer />
    </div>
  )
}

export default requireAuthenticated(CollectionPage)
