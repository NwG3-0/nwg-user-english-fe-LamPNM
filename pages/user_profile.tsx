import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { getServerSideProps } from '@components/common/checkauth'

const Header = dynamic<any>(() => import('@components/layouts/Header').then((mod) => mod.Header), {
  ssr: false,
})

const UserProfile = dynamic<any>(() => import('@components/screens/UserProfile/index').then((mod) => mod.UserProfile), {
  ssr: false,
})

const Footer = dynamic<any>(() => import('@components/layouts/Footer').then((mod) => mod.Footer), {
  ssr: false,
})

const UserProfilePage: NextPage = () => {
  return (
    <div>
      <Header />
      <UserProfile />
      <Footer />
    </div>
  )
}

export default UserProfilePage

export { getServerSideProps }
